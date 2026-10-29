// =================================================
// sputnik_dao_factory_get_owner_fun_json
//
// View: the FACTORY's `get_owner`. Returns the account that owns the
// factory.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
import { SPUTNIK_DAO_ID_STRING_Z_CONST } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_factory_get_owner_fun_json(
  near: Near,
  factory_contract_id: string,
): Promise<string> {
  const result = await near.view(
    factory_contract_id,
    sputnik_dao_factory_methods_const.get_owner,
    {},
  );
  return SPUTNIK_DAO_ID_STRING_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
