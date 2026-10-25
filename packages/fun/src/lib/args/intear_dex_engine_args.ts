// =================================================
// intear_dex_engine_args
//
// Parameter type map for every INTEAR DEX engine view/call function
// exported from this package. Each method gets its own slice of the
// args it actually consumes.
// =================================================
import type { INTEAR_DEX_ASSET_ID_STRING } from "../../types/intear_dex_engine_types";

// =================================================
export interface intear_dex_engine_args {
  // asset_balance_of / total_in_custody / are_assets_registered
  asset_id: INTEAR_DEX_ASSET_ID_STRING;
  asset_ids: INTEAR_DEX_ASSET_ID_STRING[];
  // the account or dex the balance belongs to
  account_or_dex_id: string;
  // registered_assets_of
  from_index: number;
  limit: number;
  // dex_view
  dex_id: string;
  method: string;
  args: string;
  // storage_balance_of
  account_id: string;
  // dex_code / dex_storage_balance_of
  dex_id_string: string;
}
// =================================================
// copyright 2026 by sleet.near
