// =================================================
// intear_dex_otc_decode
//
// Borsh schemas for the INTEAR DEX `otc` sub-dex view responses.
//
// These are [`@zorsh/zorsh`](https://www.npmjs.com/package/@zorsh/zorsh)
// schemas, so the schema *is* the type: `b.infer` reads the decoded
// shape straight off the schema, and there is no second, hand-written
// TypeScript interface that can drift away from it.
//
// Amounts are u128 and are carried as `bigint`.
//
// VERIFIED against live mainnet data (2026-10-29)
//   The shapes below were decoded from the real bytes the contract
//   returned, with zero leftover bytes in every response.
// =================================================
import { b } from "@zorsh/zorsh";

// =================================================
// The NEAR storage deposit an account has with the otc dex.
//
// VERIFIED: `total` is the deposited amount and `used` is the part of
// it the account's entries take up. Both are u128.
export const intear_dex_otc_storage_balance_schema = b.struct({
  total: b.u128(),
  used: b.u128(),
});

// =================================================
// The public key an account authorized to sign its own trade intents.
//
// near-sdk's borsh serializer writes a `PublicKey` as a **String**
// whose content is the borsh bytes of `near_crypto::PublicKey`: a
// one byte tag (`0` ed25519, `1` secp256k1, `2` ml-dsa-65) followed
// by the raw key bytes.
//
// The schema keeps the raw bytes; `intear_dex_public_key_to_string`
// turns them into the `ed25519:<base58>` form the engine's JSON API
// uses.
export const intear_dex_public_key_schema = b.bytes();

// =================================================
// The otc dex's internal balance of one asset for one account.
// `null` when the account has no balance entry for that asset.
//
// VERIFIED: the `null` arm was observed live (3 account/asset pairs,
// all empty). The `Some` arm is a u128; it was not observed live.
export const intear_dex_otc_balance_schema = b.option(b.u128());

// =================================================
export type INTEAR_DEX_OTC_STORAGE_BALANCE_TYPE = b.infer<
  typeof intear_dex_otc_storage_balance_schema
>;
export type INTEAR_DEX_OTC_AUTHORIZED_KEY_TYPE = Uint8Array | null;
export type INTEAR_DEX_OTC_BALANCE_TYPE = bigint | null;
// =================================================
// copyright 2026 by sleet.near
