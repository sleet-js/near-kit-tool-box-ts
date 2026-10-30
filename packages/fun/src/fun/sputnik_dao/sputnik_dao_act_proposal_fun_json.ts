// =================================================
// sputnik_dao_act_proposal_fun_json
//
// Call: the DAO's `act_proposal`. Votes on, finalizes, removes, or
// moves one proposal.
//
// The contract checks that the `proposal` argument is exactly the
// proposal kind stored for `id`, so callers must pass the kind they
// read from `get_proposal`. `memo` is optional and only logged.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
// =================================================
export async function sputnik_dao_act_proposal_fun_json(
  near: Near,
  dao_contract_id: string,
  id: sputnik_dao_args["id"],
  action: sputnik_dao_args["action"],
  proposal: sputnik_dao_args["proposal"],
  memo: sputnik_dao_args["memo"] = null,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    dao_contract_id,
    sputnik_dao_methods_const.act_proposal,
    { id, action, proposal, memo },
    { attachedDeposit: 0n, gas: "30 Tgas" },
  );
}
// =================================================
// copyright 2026 by sleet.near
