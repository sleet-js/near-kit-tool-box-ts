// =================================================
// sputnik_dao_get_factory_info_fun_json
//
// View: the DAO's `get_factory_info`. Returns the factory that
// deployed the DAO and whether the DAO follows the factory's default
// code.
//
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { SPUTNIK_DAO_FACTORY_INFO_TYPE } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_get_factory_info_fun_json(
  near: Near,
  daoContractId: string,
): Promise<SPUTNIK_DAO_FACTORY_INFO_TYPE> {
  const result = await near.view(
    daoContractId,
    sputnik_dao_methods_const.get_factory_info,
    {},
  );
  return result as SPUTNIK_DAO_FACTORY_INFO_TYPE;
}
// =================================================
// copyright 2026 by sleet.near
