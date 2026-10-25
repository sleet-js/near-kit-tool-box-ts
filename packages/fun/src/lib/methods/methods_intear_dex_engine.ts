// =================================================
// methods_intear_dex_engine
//
// Method name constants for the INTEAR DEX engine contract
// (`dex.intear.near`).
//
// The engine is the host of every sub-dex. Its own views are JSON;
// the sub-dex views are reached through `dex_view`, which takes
// borsh-encoded sub-dex arguments.
// =================================================
export const intear_dex_engine_methods_const = {
  // ---- engine state ----
  is_paused: "is_paused",
  get_trusted_code_deployer: "get_trusted_code_deployer",
  contract_source_metadata: "contract_source_metadata",
  untracked_near: "untracked_near",
  total_storage_balances: "total_storage_balances",
  storage_balance_bounds: "storage_balance_bounds",
  storage_balance_of: "storage_balance_of",
  dex_storage_balance_bounds: "dex_storage_balance_bounds",
  dex_storage_balance_of: "dex_storage_balance_of",
  dex_code: "dex_code",
  dex_view: "dex_view",
  // ---- balances ----
  asset_balance_of: "asset_balance_of",
  registered_assets_of: "registered_assets_of",
  are_assets_registered: "are_assets_registered",
  total_in_custody: "total_in_custody",
  // ---- calls ----
  new: "new",
  pause: "pause",
  unpause: "unpause",
  set_trusted_code_deployer: "set_trusted_code_deployer",
  deploy_dex_code: "deploy_dex_code",
  swap_simple: "swap_simple",
  simulate_swap_simple: "simulate_swap_simple",
  dex_call: "dex_call",
  transfer_asset: "transfer_asset",
  register_assets: "register_assets",
  withdraw: "withdraw",
  execute_operations: "execute_operations",
  storage_deposit: "storage_deposit",
  storage_withdraw: "storage_withdraw",
  storage_unregister: "storage_unregister",
  dex_storage_deposit: "dex_storage_deposit",
  dex_storage_withdraw: "dex_storage_withdraw",
  deposit_near: "deposit_near",
  ft_on_transfer: "ft_on_transfer",
  mt_on_transfer: "mt_on_transfer",
  nft_on_transfer: "nft_on_transfer",
  rescue: "rescue",
  after_rescue_balance_nep141_nep245_query:
    "after_rescue_balance_nep141_nep245_query",
  after_rescue_nep171_query: "after_rescue_nep171_query",
  after_withdraw: "after_withdraw",
} as const;
// =================================================
// copyright 2026 by sleet.near
