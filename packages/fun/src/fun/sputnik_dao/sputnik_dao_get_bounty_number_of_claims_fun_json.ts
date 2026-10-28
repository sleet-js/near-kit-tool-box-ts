// =================================================
// sputnik_dao_get_bounty_number_of_claims_fun_json
//
// View: the DAO's `get_bounty_number_of_claims`. Returns how many
// times a bounty has been claimed.
//
// The arg is `id` — the contract panics with `missing field 'id'`
// when it is called with `bounty_id`.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
// =================================================
export async function sputnik_dao_get_bounty_number_of_claims_fun_json(
  near: Near,
  daoContractId: string,
  id: sputnik_dao_args["id"],
): Promise<number> {
  const result = await near.view(
    daoContractId,
    sputnik_dao_methods_const.get_bounty_number_of_claims,
    { id },
  );
  return result as number;
}
// =================================================
// copyright 2026 by sleet.near
