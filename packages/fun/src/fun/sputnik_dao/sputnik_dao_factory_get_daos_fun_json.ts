// =================================================
// sputnik_dao_factory_get_daos_fun_json
//
// View: the FACTORY's `get_daos`. Returns a page of DAOs, starting at
// `from_index`, at most `limit` of them.
//
// The list is paginated: paging through every DAO means repeating the
// call with `from_index` moving on by `limit`.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
import { SPUTNIK_DAO_ACCOUNT_ID_LIST_Z_CONST } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_factory_get_daos_fun_json(
  near: Near,
  factory_contract_id: string,
  from_index: sputnik_dao_args["from_index"],
  limit: sputnik_dao_args["limit"],
): Promise<string[]> {
  const result = await near.view(
    factory_contract_id,
    sputnik_dao_factory_methods_const.get_daos,
    { from_index, limit },
  );
  return SPUTNIK_DAO_ACCOUNT_ID_LIST_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
