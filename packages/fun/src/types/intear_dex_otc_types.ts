// =================================================
// Typed shapes returned by the INTEAR DEX `otc` sub-dex views.
//
// PROVENANCE
//   contract : `dex.intear.near` (mainnet) — the INTEAR DEX engine,
//              sub-dex `otc`
//   methods  : `storage_balance_of`, `get_authorized_key`,
//              `get_balance`, `is_nonce_used`
//              (all read through the engine's `dex_view`)
//   verified : 2026-10-28, against the live mainnet responses
//
// BORS-DECODED, NOT JSON.
// The otc dex's views are read through the engine's `dex_view`, which
// carries **borsh** payloads. These types therefore describe the
// values AFTER the borsh decoder has run, not the JSON the RPC
// returned. A JSON schema (Zod) is the WRONG tool for these — the
// wire form is a borsh byte string and never a JSON document — so
// these stay plain types and the helpers keep decoding.
//
// The otc dex is an over-the-counter desk: two (or more) parties
// sign trade intents, and a `match` call settles them against the
// dex's internal balances.
// =================================================

// ---------- storage balance ----------

export interface INTEAR_DEX_OTC_STORAGE_BALANCE_TYPE {
  total: string;
  used: string;
}

// ---------- authorized key ----------

// The public key an account authorized to sign its own trade intents.
// `null` when the account has not authorized any key.
export type INTEAR_DEX_OTC_AUTHORIZED_KEY_TYPE = string | null;

// ---------- balances ----------

// The otc dex's internal balance of one asset for one account.
// `null` when the account has no balance entry for that asset.
export type INTEAR_DEX_OTC_BALANCE_TYPE = string | null;
// =================================================
// copyright 2026 by sleet.near
