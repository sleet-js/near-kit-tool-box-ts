// =================================================
// sputnik_dao_delegation_total_supply_fun_json
//
// View: the DAO's `delegation_total_supply`. Returns the total
// delegated voting power the DAO has, as a string.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_delegation_total_supply_fun_json(
  near: Near,
  dao_contract_id: string,
): Promise<string> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.delegation_total_supply,
    {},
  );
  return result as string;
}
// =================================================
// copyright 2026 by sleet.near
