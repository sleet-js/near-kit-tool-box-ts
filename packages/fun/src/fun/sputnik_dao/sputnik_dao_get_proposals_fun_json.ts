// =================================================
// sputnik_dao_get_proposals_fun_json
//
// View: the DAO's `get_proposals`. Returns a page of proposals,
// starting at `from_index`, at most `limit` of them.
//
// The list is paginated: paging through every proposal means
// repeating the call with `from_index` moving on by `limit`.
//
// The current contract version answers an empty list with `[]`, which
// is the ordinary case. Some rpc endpoints answer it with a wasm
// failure that carries no result field at all, and a caller that reads
// only the result sees "no proposals" as a failure.
//
// This helper reads both shapes as "no proposals" and throws for
// every other error, so a DAO with no proposals is never mistaken for
// a broken contract.
//
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
import type { SPUTNIK_DAO_PROPOSAL_TYPE } from "../../types/sputnik_dao_types";
// =================================================

// =================================================
/**
 * True when an error means "the contract answered with no result",
 * which is how some rpc endpoints report an empty list.
 */
function is_no_result_fun(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("no result") ||
    message.includes("returned no value")
  );
}

// =================================================
export async function sputnik_dao_get_proposals_fun_json(
  near: Near,
  daoContractId: string,
  from_index: sputnik_dao_args["from_index"],
  limit: sputnik_dao_args["limit"],
): Promise<SPUTNIK_DAO_PROPOSAL_TYPE[]> {
  let result: unknown;
  try {
    result = await near.view(
      daoContractId,
      sputnik_dao_methods_const.get_proposals,
      { from_index, limit },
    );
  } catch (error) {
    if (is_no_result_fun(error)) return [];
    throw error;
  }
  if (result === undefined) return [];
  return result as SPUTNIK_DAO_PROPOSAL_TYPE[];
}
// =================================================
// copyright 2026 by sleet.near
