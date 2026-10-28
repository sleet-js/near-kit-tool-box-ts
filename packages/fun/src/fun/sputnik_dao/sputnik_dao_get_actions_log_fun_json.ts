// =================================================
// sputnik_dao_get_actions_log_fun_json
//
// View: the DAO's `get_actions_log`. Returns every action the DAO
// has recorded — who did what, to which proposal, and in which block.
//
// The actions are things like `AddProposal`, `VoteApprove` and
// `ActProposal`.
//
// --- WHY --- a proposal is not a transaction. the contract stores the
// proposal's record and this trail of actions, but it does not store
// the transaction hashes, so the log is the way back to what happened
// on a proposal that is no longer in the list.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { SPUTNIK_DAO_ACTION_LOG_TYPE } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_get_actions_log_fun_json(
  near: Near,
  daoContractId: string,
): Promise<SPUTNIK_DAO_ACTION_LOG_TYPE[]> {
  const result = await near.view(
    daoContractId,
    sputnik_dao_methods_const.get_actions_log,
    {},
  );
  return result as SPUTNIK_DAO_ACTION_LOG_TYPE[];
}
// =================================================
// copyright 2026 by sleet.near
