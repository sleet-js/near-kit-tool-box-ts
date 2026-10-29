// =================================================
// sputnik_dao_get_factory_info_fun_json
//
// View: the DAO's `get_factory_info`. Returns the factory that
// deployed the DAO and whether the DAO follows the factory's default
// code.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import {
  SPUTNIK_DAO_FACTORY_INFO_TYPE_Z_CONST,
  type SPUTNIK_DAO_FACTORY_INFO_TYPE,
} from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_get_factory_info_fun_json(
  near: Near,
  dao_contract_id: string,
): Promise<SPUTNIK_DAO_FACTORY_INFO_TYPE> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.get_factory_info,
    {},
  );
  return SPUTNIK_DAO_FACTORY_INFO_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
