// =================================================
// sputnik_dao_get_bounties_fun_json
//
// View: the DAO's `get_bounties`. Returns a page of bounties,
// starting at `from_index`, at most `limit` of them.
//
// The list is paginated: paging through every bounty means repeating
// the call with `from_index` moving on by `limit`.
//
// An empty token id means NEAR.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
import {
  SPUTNIK_DAO_BOUNTIES_TYPE_Z_CONST,
  type SPUTNIK_DAO_BOUNTY_TYPE,
} from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_get_bounties_fun_json(
  near: Near,
  dao_contract_id: string,
  from_index: sputnik_dao_args["from_index"],
  limit: sputnik_dao_args["limit"],
): Promise<SPUTNIK_DAO_BOUNTY_TYPE[]> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.get_bounties,
    { from_index, limit },
  );
  if (result === undefined) return [];
  return SPUTNIK_DAO_BOUNTIES_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
