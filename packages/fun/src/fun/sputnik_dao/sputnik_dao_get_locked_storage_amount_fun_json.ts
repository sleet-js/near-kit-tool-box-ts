// =================================================
// sputnik_dao_get_locked_storage_amount_fun_json
//
// View: the DAO's `get_locked_storage_amount`. Returns the NEAR the
// DAO holds for storage, in yoctoNEAR, as a string.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import { SPUTNIK_DAO_AMOUNT_STRING_Z_CONST } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_get_locked_storage_amount_fun_json(
  near: Near,
  dao_contract_id: string,
): Promise<string> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.get_locked_storage_amount,
    {},
  );
  return SPUTNIK_DAO_AMOUNT_STRING_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
