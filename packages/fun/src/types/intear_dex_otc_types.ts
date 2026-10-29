// =================================================
// Typed shapes returned by the INTEAR DEX `otc` sub-dex views.
//
// PROVENANCE
//   contract : `dex.intear.near` (mainnet) — the INTEAR DEX engine,
//              sub-dex `otc`
//   methods  : `storage_balance_of`, `get_authorized_key`,
//              `get_balance`, `is_nonce_used`
//              (all read through the engine's `dex_view`)
//   dex id   : `slimedragon.near/otc`
//   verified : 2026-10-29, against the live mainnet responses
//
// VERIFIED against live mainnet data (2026-10-29)
//   Every shape below was decoded from the real bytes the contract
//   returned, with zero leftover bytes in every response.
//
// BORS-DECODED, NOT JSON.
// The otc dex's views are read through the engine's `dex_view`, which
// carries **borsh** payloads. These types therefore describe the
// values AFTER the borsh decoder has run, not the JSON the RPC
// returned. A JSON schema (Zod) is the WRONG tool for these — the
// wire form is a borsh byte string and never a JSON document — so
// these stay plain types and the helpers keep decoding.
//
// THE SCHEMA IS THE TYPE.
// Every type below is read straight off the borsh schema with
// `b.infer`. There is no hand-written interface that could drift away
// from the wire format — the schema and the type are the same thing.
//
// The otc dex is an over-the-counter desk: two (or more) parties
// sign trade intents, and a `match` call settles them against the
// dex's internal balances.
// =================================================
import type {
  INTEAR_DEX_OTC_STORAGE_BALANCE_TYPE,
  INTEAR_DEX_OTC_AUTHORIZED_KEY_TYPE,
  INTEAR_DEX_OTC_BALANCE_TYPE,
} from "../lib/borsh/intear_dex_otc_decode";

// ---------- storage balance ----------

// The NEAR storage deposit an account has with the otc dex.
//
// VERIFIED: `total` is the deposited amount and `used` is the part of
// it the account's entries take up. Both are u128, so they are
// `bigint`s.
export type { INTEAR_DEX_OTC_STORAGE_BALANCE_TYPE };

// ---------- authorized key ----------

// The public key an account authorized to sign its own trade intents.
// `null` when the account has not authorized any key.
//
// VERIFIED: the `null` arm was observed live (3 accounts, all
// unauthorized). The `Some` arm carries the raw borsh bytes of a
// near-crypto `PublicKey`; it was not observed live.
export type { INTEAR_DEX_OTC_AUTHORIZED_KEY_TYPE };

// ---------- balances ----------

// The otc dex's internal balance of one asset for one account.
// `null` when the account has no balance entry for that asset.
//
// VERIFIED: the `null` arm was observed live (3 account/asset pairs,
// all empty). The `Some` arm is a u128, so it is a `bigint`; it was
// not observed live.
export type { INTEAR_DEX_OTC_BALANCE_TYPE };
// =================================================
// copyright 2026 by sleet.near
