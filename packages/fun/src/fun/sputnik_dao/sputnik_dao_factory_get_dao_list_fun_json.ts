// =================================================
// sputnik_dao_factory_get_dao_list_fun_json
//
// View: the FACTORY's `get_dao_list`. Returns every DAO's account id.
//
// --- WHY --- the factory is `sputnik-dao.near` and the DAOs are
// `<name>.sputnik-dao.near`. Calling the factory as if it were a DAO
// fails with a misleading `MethodResolveError(MethodNotFound)` for
// every method, because none of the DAO methods exist there.
//
// The list is the whole list — there is no paging. Use
// `get_daos` when the list is long and a page will do.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_factory_get_dao_list_fun_json(
  near: Near,
  factoryContractId: string,
): Promise<string[]> {
  const result = await near.view(
    factoryContractId,
    sputnik_dao_factory_methods_const.get_dao_list,
    {},
  );
  return result as string[];
}
// =================================================
// copyright 2026 by sleet.near
