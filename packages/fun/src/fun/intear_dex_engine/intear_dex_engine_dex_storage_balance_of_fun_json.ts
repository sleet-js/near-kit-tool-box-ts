// =================================================
// intear_dex_engine_dex_storage_balance_of_fun_json
//
// View: the engine's `dex_storage_balance_of`. Returns the NEAR
// storage deposit a sub-dex has with the engine, or `null` when the
// dex has no storage registered.
//
// `dex_id` is the `<deployer>/<id>` string form of the sub-dex id.
// =================================================
import type { Near } from "near-kit";
import { intear_dex_engine_methods_const } from "../../lib/methods/methods_intear_dex_engine";
import {
  INTEAR_DEX_STORAGE_BALANCE_TYPE_Z_CONST,
  type INTEAR_DEX_STORAGE_BALANCE_TYPE,
} from "../../types/intear_dex_engine_types";
// =================================================
export async function intear_dex_engine_dex_storage_balance_of_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
): Promise<INTEAR_DEX_STORAGE_BALANCE_TYPE | null> {
  const result = await near.view(
    engine_contract_id,
    intear_dex_engine_methods_const.dex_storage_balance_of,
    { dex_id },
  );
  if (result === null || result === undefined) return null;
  return INTEAR_DEX_STORAGE_BALANCE_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
