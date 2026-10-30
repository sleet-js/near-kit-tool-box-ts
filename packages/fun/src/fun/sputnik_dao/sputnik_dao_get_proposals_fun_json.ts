// =================================================
// sputnik_dao_get_proposals_fun_json
//
// View: the DAO's `get_proposals`. Returns a page of proposals,
// starting at `from_index`, at most `limit` of them.
//
// The list is paginated: paging through every proposal means
// repeating the call with `from_index` moving on by `limit`.
//
// The current contract answers an empty page with `[]`. An RPC failure
// is not an empty page: method-not-found, execution failures, and
// malformed responses all throw so they stay distinguishable from a
// DAO that simply has no proposals.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
import {
  SPUTNIK_DAO_PROPOSALS_TYPE_Z_CONST,
  type SPUTNIK_DAO_PROPOSAL_TYPE,
} from "../../types/sputnik_dao_types";
// =================================================

// =================================================
export async function sputnik_dao_get_proposals_fun_json(
  near: Near,
  dao_contract_id: string,
  from_index: sputnik_dao_args["from_index"],
  limit: sputnik_dao_args["limit"],
): Promise<SPUTNIK_DAO_PROPOSAL_TYPE[]> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.get_proposals,
    { from_index, limit },
  );
  return SPUTNIK_DAO_PROPOSALS_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
