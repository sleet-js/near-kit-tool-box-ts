// =================================================
// sputnik_dao_get_staking_contract_fun_json
//
// View: the DAO's `get_staking_contract`. Returns the staking
// contract the DAO uses, or an empty string when it has none.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_get_staking_contract_fun_json(
  near: Near,
  daoContractId: string,
): Promise<string> {
  const result = await near.view(
    daoContractId,
    sputnik_dao_methods_const.get_staking_contract,
    {},
  );
  return result as string;
}
// =================================================
// copyright 2026 by sleet.near
