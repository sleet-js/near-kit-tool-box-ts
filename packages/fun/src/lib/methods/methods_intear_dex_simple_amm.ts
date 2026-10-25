// =================================================
// methods_intear_dex_simple_amm
//
// Method name constants for the INTEAR DEX `simple-amm` sub-dex.
//
// The simple-amm dex runs inside the INTEAR DEX engine. Its methods
// are not called on the engine account directly — they are reached
// through the engine's `dex_view` (read-only) and `dex_call` (state
// changing) methods, with borsh-encoded arguments.
// =================================================
export const intear_dex_simple_amm_methods_const = {
  // ---- views ----
  get_pool: "get_pool",
  // ---- calls ----
  swap: "swap",
  create_pool: "create_pool",
  add_liquidity: "add_liquidity",
  remove_liquidity: "remove_liquidity",
  new: "new",
} as const;
// =================================================
// copyright 2026 by sleet.near
