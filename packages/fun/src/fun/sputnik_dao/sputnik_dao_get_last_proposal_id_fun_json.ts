// =================================================
// sputnik_dao_get_last_proposal_id_fun_json
//
// View: the DAO's `get_last_proposal_id`. Returns the id the DAO's
// NEXT proposal will carry.
//
// The contract answers with a bare JSON number.
//
// The contract starts the counter at 0 and bumps it on every add, so
// a DAO whose proposals were all removed still reports a non-zero id.
// The number of proposals that exist is the length of `get_proposals`,
// not this.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import { SPUTNIK_DAO_COUNT_NUMBER_Z_CONST } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_get_last_proposal_id_fun_json(
  near: Near,
  dao_contract_id: string,
): Promise<number> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.get_last_proposal_id,
    {},
  );
  return SPUTNIK_DAO_COUNT_NUMBER_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
