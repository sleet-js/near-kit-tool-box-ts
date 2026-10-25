// =================================================
// methods_intear_dex_xyk
//
// Method name constants for the INTEAR DEX `xyk` sub-dex.
//
// The xyk dex runs inside the INTEAR DEX engine. Its methods are not
// called on the engine account directly — they are reached through
// the engine's `dex_view` (read-only) and `dex_call` (state changing)
// methods, with borsh-encoded arguments.
// =================================================
export const intear_dex_xyk_methods_const = {
  // ---- views ----
  get_pool: "get_pool",
  get_pools: "get_pools",
  get_pool_count: "get_pool_count",
  get_pool_shares: "get_pool_shares",
  get_pending_fees: "get_pending_fees",
  get_fee_discount_signer: "get_fee_discount_signer",
  get_community_owned_fees: "get_community_owned_fees",
  pool_needs_upgrade: "pool_needs_upgrade",
  // ---- calls ----
  swap: "swap",
  create_pool: "create_pool",
  register_liquidity: "register_liquidity",
  add_liquidity: "add_liquidity",
  remove_liquidity: "remove_liquidity",
  edit_fees: "edit_fees",
  withdraw_fees: "withdraw_fees",
  upgrade_pool: "upgrade_pool",
  lock_pool: "lock_pool",
  register_fee_assets: "register_fee_assets",
  withdraw_community_fee: "withdraw_community_fee",
  set_fee_discount_signer: "set_fee_discount_signer",
  new: "new",
} as const;
// =================================================
// copyright 2026 by sleet.near
