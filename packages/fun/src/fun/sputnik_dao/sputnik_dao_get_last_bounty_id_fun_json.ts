// =================================================
// sputnik_dao_get_last_bounty_id_fun_json
//
// View: the DAO's `get_last_bounty_id`. Returns the id the DAO's
// NEXT bounty will carry.
//
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_get_last_bounty_id_fun_json(
  near: Near,
  daoContractId: string,
): Promise<string> {
  const result = await near.view(
    daoContractId,
    sputnik_dao_methods_const.get_last_bounty_id,
    {},
  );
  return result as string;
}
// =================================================
// copyright 2026 by sleet.near
