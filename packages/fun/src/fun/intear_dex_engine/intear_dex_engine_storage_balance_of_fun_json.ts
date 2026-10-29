// =================================================
// intear_dex_engine_storage_balance_of_fun_json
//
// View: the engine's `storage_balance_of`. Returns the NEAR storage
// deposit an account has with the engine, or `null` when the account
// has no storage registered.
//
// `total` is the deposited amount and `available` is the part of it
// not used by the account's entries.
// =================================================
import type { Near } from "near-kit";
import { intear_dex_engine_methods_const } from "../../lib/methods/methods_intear_dex_engine";
import {
  INTEAR_DEX_STORAGE_BALANCE_TYPE_Z_CONST,
  type INTEAR_DEX_STORAGE_BALANCE_TYPE,
} from "../../types/intear_dex_engine_types";
// =================================================
export async function intear_dex_engine_storage_balance_of_fun_json(
  near: Near,
  engine_contract_id: string,
  account_id: string,
): Promise<INTEAR_DEX_STORAGE_BALANCE_TYPE | null> {
  const result = await near.view(
    engine_contract_id,
    intear_dex_engine_methods_const.storage_balance_of,
    { account_id },
  );
  if (result === null || result === undefined) return null;
  return INTEAR_DEX_STORAGE_BALANCE_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
