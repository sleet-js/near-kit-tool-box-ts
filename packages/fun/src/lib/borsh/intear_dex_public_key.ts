// =================================================
// intear_dex_public_key
//
// The near-crypto `PublicKey`, in the form the engine's JSON API
// uses.
//
// near-sdk's borsh serializer writes a `PublicKey` as a **String**
// whose content is the borsh bytes of `near_crypto::PublicKey`: a
// one byte tag followed by the raw key bytes.
//
//   tag 0 — ed25519,  32 key bytes → `ed25519:<base58>`
//   tag 1 — secp256k1, 64 key bytes → `secp256k1:<base58>`
//   tag 2 — ml-dsa-65        → `mldsa65:<base58>`
//
// The tag byte is part of the borsh payload, so it is kept here
// rather than in the schema: the schema holds the raw bytes and this
// module reads the tag out of them.
// =================================================
import { base58_encode } from "./intear_dex_borsh";

// =================================================
// Turns the raw borsh bytes of a near-crypto `PublicKey` into the
// `ed25519:<base58>` form the engine's JSON API uses.
//
// Throws when the bytes are not a public key this build understands.
export function intear_dex_public_key_to_string(raw: Uint8Array): string {
  if (raw.length === 0) throw new Error("borsh: empty public key");
  const tag = raw[0] as number;
  const key = raw.subarray(1);
  if (tag === 0 && key.length === 32) return `ed25519:${base58_encode(key)}`;
  if (tag === 1 && key.length === 64) return `secp256k1:${base58_encode(key)}`;
  if (tag === 2) return `mldsa65:${base58_encode(key)}`;
  throw new Error(
    `borsh: unknown public key tag ${tag} (${key.length} key bytes)`,
  );
}
// =================================================
// copyright 2026 by sleet.near
