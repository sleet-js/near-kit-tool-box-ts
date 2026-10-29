// =================================================
// intear_dex_engine_total_storage_balances_fun_json
//
// View: the engine's `total_storage_balances`. Returns the NEAR
// storage the engine holds for users and for dexes.
//
// `users` and `dexes` each carry a `total` and an `available` part.
// The available part is what a new deposit can still use.
// =================================================
import type { Near } from "near-kit";
import { intear_dex_engine_methods_const } from "../../lib/methods/methods_intear_dex_engine";
import {
  INTEAR_DEX_TOTAL_STORAGE_BALANCES_TYPE_Z_CONST,
  type INTEAR_DEX_TOTAL_STORAGE_BALANCES_TYPE,
} from "../../types/intear_dex_engine_types";
// =================================================
export async function intear_dex_engine_total_storage_balances_fun_json(
  near: Near,
  engine_contract_id: string,
): Promise<INTEAR_DEX_TOTAL_STORAGE_BALANCES_TYPE> {
  const result = await near.view(
    engine_contract_id,
    intear_dex_engine_methods_const.total_storage_balances,
    {},
  );
  return INTEAR_DEX_TOTAL_STORAGE_BALANCES_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
