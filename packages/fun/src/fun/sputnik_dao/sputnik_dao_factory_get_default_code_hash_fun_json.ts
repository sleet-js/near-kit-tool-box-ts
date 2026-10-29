// =================================================
// sputnik_dao_factory_get_default_code_hash_fun_json
//
// View: the FACTORY's `get_default_code_hash`. Returns the code hash
// the factory deploys new DAOs with.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_factory_get_default_code_hash_fun_json(
  near: Near,
  factory_contract_id: string,
): Promise<string> {
  const result = await near.view(
    factory_contract_id,
    sputnik_dao_factory_methods_const.get_default_code_hash,
    {},
  );
  return result as string;
}
// =================================================
// copyright 2026 by sleet.near
