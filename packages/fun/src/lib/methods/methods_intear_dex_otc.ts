// =================================================
// methods_intear_dex_otc
//
// Method name constants for the INTEAR DEX `otc` sub-dex.
//
// The otc dex runs inside the INTEAR DEX engine. Its methods are not
// called on the engine account directly — they are reached through
// the engine's `dex_view` (read-only) and `dex_call` (state changing)
// methods, with borsh-encoded arguments.
// =================================================
export const intear_dex_otc_methods_const = {
  // ---- views ----
  get_balance: "get_balance",
  get_authorized_key: "get_authorized_key",
  is_nonce_used: "is_nonce_used",
  storage_balance_of: "storage_balance_of",
  // ---- calls ----
  match: "match",
  deposit_assets: "deposit_assets",
  withdraw_assets: "withdraw_assets",
  storage_deposit: "storage_deposit",
  set_authorized_key: "set_authorized_key",
} as const;
// =================================================
// copyright 2026 by sleet.near
