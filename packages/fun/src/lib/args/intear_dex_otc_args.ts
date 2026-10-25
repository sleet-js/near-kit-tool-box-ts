// =================================================
// intear_dex_otc_args
//
// Parameter type map for every INTEAR DEX `otc` sub-dex view/call
// function exported from this package. Each method gets its own slice
// of the args it actually consumes.
// =================================================
import type { INTEAR_DEX_ASSET_ID_STRING } from "../../types/intear_dex_engine_types";

// =================================================
export interface intear_dex_otc_args {
  // get_balance
  account_id: string;
  asset_id: INTEAR_DEX_ASSET_ID_STRING;
  // is_nonce_used
  nonce: string;
  // storage_balance_of / get_authorized_key
  owner_account_id: string;
}
// =================================================
// copyright 2026 by sleet.near
