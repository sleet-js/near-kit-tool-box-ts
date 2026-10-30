// =================================================
// base64
//
// The shared base64 helpers the contract envelopes use.
//
// These used to live in `intear_dex_borsh.ts`, which tied them to one
// contract family. They are used by more than that now, so they have
// their own file and every contract's envelope can reach them.
//
// `bytes_to_base64` encodes bytes as standard base64. `base64_to_bytes`
// decodes them back. Both work in the browser and in Node runtimes
// without a global `btoa` / `atob`.
// =================================================

// =================================================
// Encodes bytes as standard base64.
// params:
//   bytes: the bytes to encode
// returns the base64 string
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
  throw new Error("base64: no base64 encoder available in this runtime");
}

// =================================================
// Decodes a standard base64 string back into bytes.
// params:
//   value: the base64 string
// returns the decoded bytes
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
      Buffer?: {
        from(data: string, encoding: string): Uint8Array;
      };
    }
  ).Buffer;
  if (global_buffer) return new Uint8Array(global_buffer.from(value, "base64"));
  throw new Error("base64: no base64 decoder available in this runtime");
}

// =================================================
// Encodes a JSON value as base64, the way a contract's `Base64VecU8`
// argument expects it.
//
// The contract stores the bytes as-is, so this is only the right
// encoder when the target method takes JSON arguments.
// params:
//   value: the value to encode
// returns the base64 string
export function json_to_base64(value: unknown): string {
  return bytes_to_base64(new TextEncoder().encode(JSON.stringify(value)));
}
// =================================================
// copyright 2026 by sleet.near
