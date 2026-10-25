// =================================================
// intear_dex_xyk_args
//
// Parameter type map for every INTEAR DEX `xyk` sub-dex view/call
// function exported from this package. Each method gets its own slice
// of the args it actually consumes.
// =================================================
import type { INTEAR_DEX_ASSET_ID_STRING } from "../../types/intear_dex_engine_types";

// =================================================
export interface intear_dex_xyk_args {
  // get_pool
  pool_id: number;
  // get_pools
  start_index: number;
  limit: number;
  // get_pool_shares
  pool_ids: number[];
  account_id: string;
  // get_pending_fees
  asset_ids: INTEAR_DEX_ASSET_ID_STRING[];
  // get_community_owned_fees
  community_account_id: string;
}
// =================================================
// copyright 2026 by sleet.near
