// =================================================
// intear_dex_engine_storage_balance_bounds_fun_json
//
// View: the engine's `storage_balance_bounds`. Returns the minimum
// and maximum NEAR storage deposit the engine accepts for a user.
//
// `max` is `null` when the engine does not cap the deposit.
// =================================================
import type { Near } from "near-kit";
import { intear_dex_engine_methods_const } from "../../lib/methods/methods_intear_dex_engine";
import {
  INTEAR_DEX_STORAGE_BALANCE_BOUNDS_TYPE_Z_CONST,
  type INTEAR_DEX_STORAGE_BALANCE_BOUNDS_TYPE,
} from "../../types/intear_dex_engine_types";
// =================================================
export async function intear_dex_engine_storage_balance_bounds_fun_json(
  near: Near,
  engine_contract_id: string,
): Promise<INTEAR_DEX_STORAGE_BALANCE_BOUNDS_TYPE> {
  const result = await near.view(
    engine_contract_id,
    intear_dex_engine_methods_const.storage_balance_bounds,
    {},
  );
  return INTEAR_DEX_STORAGE_BALANCE_BOUNDS_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
