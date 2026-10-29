// =================================================
// intear_dex_borsh
//
// Minimal borsh (de)serializer used by the INTEAR DEX helpers.
//
// The INTEAR DEX engine runs each sub-dex as WASM inside the engine
// contract. The engine's `dex_view` view takes the sub-dex call
// arguments as **borsh** bytes (base64 encoded in the JSON envelope)
// and returns the sub-dex's borsh-encoded response the same way.
//
// Everything here is deliberately dependency-free — it only needs to
// cover the types the INTEAR DEX actually uses:
//   - u8 / u32 / u64 / u128
//   - String
//   - Vec<T>
//   - Option<T>
//   - enum variants with a u8 discriminant
//   - near-crypto PublicKey (1 tag byte + raw key bytes)
//
// Amounts are u128 and are carried as decimal strings on the public
// API, matching the rest of this package (and the NEAR JSON
// convention of using strings for 128-bit integers).
// =================================================

// ---------- writers ----------

export class borsh_writer {
  private chunks: Uint8Array[] = [];

  u8(value: number): this {
    const buf = new Uint8Array(1);
    buf[0] = value & 0xff;
    this.chunks.push(buf);
    return this;
  }

  u32(value: number): this {
    const buf = new Uint8Array(4);
    new DataView(buf.buffer).setUint32(0, value >>> 0, true);
    this.chunks.push(buf);
    return this;
  }

  u64(value: bigint | number): this {
    const buf = new Uint8Array(8);
    new DataView(buf.buffer).setBigUint64(0, BigInt(value), true);
    this.chunks.push(buf);
    return this;
  }

  u128(value: bigint | number | string): this {
    const buf = new Uint8Array(16);
    const view = new DataView(buf.buffer);
    const big = BigInt(value);
    view.setBigUint64(0, big & 0xffffffffffffffffn, true);
    view.setBigUint64(8, big >> 64n, true);
    this.chunks.push(buf);
    return this;
  }

  bytes(value: Uint8Array): this {
    this.u32(value.length);
    this.chunks_push(value);
    return this;
  }

  // Appends raw bytes without a length prefix.
  chunks_push(value: Uint8Array): this {
    this.chunks.push(value);
    return this;
  }

  string(value: string): this {
    return this.bytes(new TextEncoder().encode(value));
  }

  option<T>(
    value: T | null | undefined,
    write: (writer: borsh_writer, value: T) => void,
  ): this {
    if (value === null || value === undefined) return this.u8(0);
    this.u8(1);
    write(this, value);
    return this;
  }

  vec<T>(
    values: readonly T[],
    write: (writer: borsh_writer, value: T) => void,
  ): this {
    this.u32(values.length);
    for (const value of values) write(this, value);
    return this;
  }

  to_bytes(): Uint8Array {
    let total = 0;
    for (const chunk of this.chunks) total += chunk.length;
    const out = new Uint8Array(total);
    let offset = 0;
    for (const chunk of this.chunks) {
      out.set(chunk, offset);
      offset += chunk.length;
    }
    return out;
  }
}

// ---------- readers ----------

export class borsh_reader {
  private offset = 0;

  constructor(private readonly data: Uint8Array) {}

  private take(length: number): Uint8Array {
    if (this.offset + length > this.data.length) {
      throw new Error(
        `borsh: unexpected end of input (need ${length} bytes at offset ${this.offset}, have ${this.data.length - this.offset})`,
      );
    }
    const slice = this.data.subarray(this.offset, this.offset + length);
    this.offset += length;
    return slice;
  }

  get remaining(): number {
    return this.data.length - this.offset;
  }

  u8(): number {
    return this.take(1)[0] as number;
  }

  u32(): number {
    return new DataView(this.take(4).slice().buffer).getUint32(0, true);
  }

  u64(): bigint {
    return new DataView(this.take(8).slice().buffer).getBigUint64(0, true);
  }

  u128(): bigint {
    const view = new DataView(this.take(16).slice().buffer);
    const lo = view.getBigUint64(0, true);
    const hi = view.getBigUint64(8, true);
    return (hi << 64n) | lo;
  }

  bytes(): Uint8Array {
    return this.take(this.u32());
  }

  string(): string {
    return new TextDecoder().decode(this.bytes());
  }

  option<T>(read: (reader: borsh_reader) => T): T | null {
    const tag = this.u8();
    if (tag === 0) return null;
    if (tag !== 1) throw new Error(`borsh: invalid option tag ${tag}`);
    return read(this);
  }

  vec<T>(read: (reader: borsh_reader) => T): T[] {
    const length = this.u32();
    const out: T[] = [];
    for (let index = 0; index < length; index++) out.push(read(this));
    return out;
  }

  // Reads a near-crypto `PublicKey`.
  // near-sdk's borsh serializer writes a `PublicKey` as a **String**
  // whose content is the borsh bytes of `near_crypto::PublicKey`:
  // a one byte tag (`0` ed25519, `1` secp256k1, `2` ml-dsa-65)
  // followed by the raw key bytes.
  public_key(): string {
    const raw = this.bytes();
    if (raw.length === 0) throw new Error("borsh: empty public key");
    const tag = raw[0] as number;
    const key = raw.subarray(1);
    if (tag === 0 && key.length === 32) return `ed25519:${base58_encode(key)}`;
    if (tag === 1 && key.length === 64)
      return `secp256k1:${base58_encode(key)}`;
    if (tag === 2) return `mldsa65:${base58_encode(key)}`;
    throw new Error(
      `borsh: unknown public key tag ${tag} (${key.length} key bytes)`,
    );
  }
}

// ---------- base58 (NEAR public key format) ----------

const BASE58_ALPHABET =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export function base58_encode(bytes: Uint8Array): string {
  if (bytes.length === 0) return "";
  let leading_zeros = 0;
  while (leading_zeros < bytes.length && bytes[leading_zeros] === 0)
    leading_zeros++;
  let value = 0n;
  for (const byte of bytes) value = (value << 8n) | BigInt(byte);
  let out = "";
  while (value > 0n) {
    const rest = value % 58n;
    value /= 58n;
    out = BASE58_ALPHABET[Number(rest)] + out;
  }
  return "1".repeat(leading_zeros) + out;
}

// ---------- base64 (the engine's `dex_view` envelope) ----------

export function bytes_to_base64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  if (typeof btoa === "function") return btoa(binary);
  // Node runtimes without a global `btoa`.
  const global_buffer = (
    globalThis as {
      Buffer?: {
        from(
          data: string,
          encoding: string,
        ): { toString(encoding: string): string };
      };
    }
  ).Buffer;
  if (global_buffer)
    return global_buffer.from(binary, "binary").toString("base64");
  throw new Error("intear dex: no base64 encoder available in this runtime");
}

export function base64_to_bytes(value: string): Uint8Array {
  if (typeof atob === "function") {
    const binary = atob(value);
    const out = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index++)
      out[index] = binary.charCodeAt(index);
    return out;
  }
  const global_buffer = (
    globalThis as {
      Buffer?: { from(data: string, encoding: string): Uint8Array };
    }
  ).Buffer;
  if (global_buffer) return new Uint8Array(global_buffer.from(value, "base64"));
  throw new Error("intear dex: no base64 decoder available in this runtime");
}
// =================================================
// copyright 2026 by sleet.near
