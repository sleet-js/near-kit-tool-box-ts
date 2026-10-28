// =================================================
// sputnik_dao_factory_get_number_daos_fun_json
//
// View: the FACTORY's `get_number_daos`. Returns how many DAOs the
// factory has deployed.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_factory_get_number_daos_fun_json(
  near: Near,
  factoryContractId: string,
): Promise<number> {
  const result = await near.view(
    factoryContractId,
    sputnik_dao_factory_methods_const.get_number_daos,
    {},
  );
  return result as number;
}
// =================================================
// copyright 2026 by sleet.near
