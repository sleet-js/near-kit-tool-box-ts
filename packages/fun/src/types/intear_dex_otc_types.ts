// =================================================
// Typed shapes returned by the INTEAR DEX `otc` sub-dex views.
//
// The otc dex is an over-the-counter desk: two (or more) parties
// sign trade intents, and a `match` call settles them against the
// dex's internal balances.
//
// Its views are read through the engine's `dex_view`, which carries
// **borsh** payloads.
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
