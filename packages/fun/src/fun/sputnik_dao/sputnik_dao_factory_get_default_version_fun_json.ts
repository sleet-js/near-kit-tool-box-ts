// =================================================
// sputnik_dao_factory_get_default_version_fun_json
//
// View: the FACTORY's `get_default_version`. Returns the version the
// factory deploys new DAOs with, as a `[major, minor]` pair.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
import { SPUTNIK_DAO_VERSION_PAIR_Z_CONST } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_factory_get_default_version_fun_json(
  near: Near,
  factory_contract_id: string,
): Promise<[number, number]> {
  const result = await near.view(
    factory_contract_id,
    sputnik_dao_factory_methods_const.get_default_version,
    {},
  );
  return SPUTNIK_DAO_VERSION_PAIR_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
