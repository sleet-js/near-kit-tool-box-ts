// =================================================
// sputnik_dao_get_last_bounty_id_fun_json
//
// View: the DAO's `get_last_bounty_id`. Returns the id the DAO's
// NEXT bounty will carry.
//
// The contract answers with a bare JSON number.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import { SPUTNIK_DAO_COUNT_NUMBER_Z_CONST } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_get_last_bounty_id_fun_json(
  near: Near,
  dao_contract_id: string,
): Promise<number> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.get_last_bounty_id,
    {},
  );
  return SPUTNIK_DAO_COUNT_NUMBER_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
