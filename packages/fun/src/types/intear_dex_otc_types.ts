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
//   returned, with zero leftover bytes in every response:
//     - `storage_balance_of` for 4 accounts. One account holds a
//       storage deposit, the other three have no storage registered
//       and answer `None`.
//     - `get_authorized_key` for 3 accounts. All three answer
//       `None` — no account had authorized a key at capture time, so
//       the `Some` (a public key) arm is NOT observed live.
//     - `get_balance` for 3 account/asset pairs. All answer `None`,
//       so the `Some` (a balance) arm is NOT observed live.
//     - `is_nonce_used` for 3 nonces. All answer `false`.
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

// The NEAR storage deposit an account has with the otc dex.
//
// VERIFIED: `total` is the deposited amount and `used` is the part of
// it the account's entries take up. Both are yocto-NEAR amounts
// carried as decimal strings, because a u128 does not fit a JS
// number.
export interface INTEAR_DEX_OTC_STORAGE_BALANCE_TYPE {
  total: string;
  used: string;
}

// ---------- authorized key ----------

// The public key an account authorized to sign its own trade intents.
// `null` when the account has not authorized any key.
//
// VERIFIED: the `null` arm was observed live (3 accounts, all
// unauthorized). The `Some` arm carries a NEAR public key string like
// `ed25519:<base58>`; it was not observed live.
export type INTEAR_DEX_OTC_AUTHORIZED_KEY_TYPE = string | null;

// ---------- balances ----------

// The otc dex's internal balance of one asset for one account.
// `null` when the account has no balance entry for that asset.
//
// VERIFIED: the `null` arm was observed live (3 account/asset pairs,
// all empty). The `Some` arm is a decimal string, because the balance
// is a u128; it was not observed live.
export type INTEAR_DEX_OTC_BALANCE_TYPE = string | null;
// =================================================
// copyright 2026 by sleet.near
