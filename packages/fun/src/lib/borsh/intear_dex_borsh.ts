// =================================================
// intear_dex_borsh
//
// The borsh codec the INTEAR DEX sub-dex views use.
//
// The INTEAR DEX engine runs each sub-dex as WASM inside the engine
// contract. The engine's `dex_view` view takes the sub-dex call
// arguments as **borsh** bytes (base64 encoded in the JSON envelope)
// and returns the sub-dex's borsh-encoded response the same way.
//
// The codec itself is [`@zorsh/zorsh`](https://www.npmjs.com/package/@zorsh/zorsh)
// — the NEAR org's (`r-near`) TypeScript-first borsh library. It is
// pinned to an exact version: the library is young and its API may
// still move.
//
// What is left here is the small amount of INTEAR DEX specific glue:
//   - the base64 helpers for the engine's `dex_view` envelope
//   - the base58 encoder for the near-crypto public key form
//   - the `AssetId` schema, which lives with the asset id helpers
//
// Amounts are u128 and are carried as `bigint` on the public API.
// Zorsh uses `bigint` natively for u64/u128, so nothing is converted
// and no precision is lost.
//
// The reader takes any `Uint8Array`, and that includes a Node
// `Buffer`. A `Buffer` is a view into a shared pool, so a reader that
// looked at `view.buffer` would read the whole pool rather than the
// bytes the view covers. Zorsh's reader bounds itself by
// `byteOffset`/`byteLength`, so it stays correct for every input.
// =================================================

// ---------- base64 (the engine's `dex_view` envelope) ----------
// The base64 helpers moved to `lib/borsh/base64.ts` — the engine's
// envelope is not the only one that needs them.

export { base64_to_bytes, bytes_to_base64 } from "./base64";

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
// =================================================
// copyright 2026 by sleet.near
