// =================================================
// sputnik_dao_factory_get_dao_list_fun_json
//
// View: the FACTORY's `get_dao_list`. Returns every DAO's account id.
//
// The list is the whole list — there is no paging. Use
// `get_daos` when the list is long and a page will do.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
import { SPUTNIK_DAO_ACCOUNT_ID_LIST_Z_CONST } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_factory_get_dao_list_fun_json(
  near: Near,
  factory_contract_id: string,
): Promise<string[]> {
  const result = await near.view(
    factory_contract_id,
    sputnik_dao_factory_methods_const.get_dao_list,
    {},
  );
  return SPUTNIK_DAO_ACCOUNT_ID_LIST_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
