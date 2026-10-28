// =================================================
// sputnik_dao_factory_get_default_version_fun_json
//
// View: the FACTORY's `get_default_version`. Returns the version the
// factory deploys new DAOs with, as a `[major, minor]` pair.
//
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_factory_get_default_version_fun_json(
  near: Near,
  factoryContractId: string,
): Promise<[number, number]> {
  const result = await near.view(
    factoryContractId,
    sputnik_dao_factory_methods_const.get_default_version,
    {},
  );
  return result as [number, number];
}
// =================================================
// copyright 2026 by sleet.near
