// =================================================
// sputnik_dao_get_proposal_fun_json
//
// View: the DAO's `get_proposal`. Returns one proposal by its id.
//
// The arg is `id` — the contract panics with
// `missing field 'id'` when it is called with `proposal_id`.
//
// So this helper answers `null` for a proposal that is not there, and
// throws for every other error. A broken DAO and a DAO with no such
// proposal stay distinguishable.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
import type { SPUTNIK_DAO_PROPOSAL_TYPE } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_get_proposal_fun_json(
  near: Near,
  daoContractId: string,
  id: sputnik_dao_args["id"],
): Promise<SPUTNIK_DAO_PROPOSAL_TYPE | null> {
  try {
    const result = await near.view(
      daoContractId,
      sputnik_dao_methods_const.get_proposal,
      { id },
    );
    return (result as SPUTNIK_DAO_PROPOSAL_TYPE | undefined) ?? null;
  } catch (error) {
    if (sputnik_dao_no_proposal_fun(error)) return null;
    throw error;
  }
}

// =================================================
/**
 * True when an error is the contract's "no such proposal" panic.
 */
export function sputnik_dao_no_proposal_fun(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes("ERR_NO_PROPOSAL");
}
// =================================================
// copyright 2026 by sleet.near
