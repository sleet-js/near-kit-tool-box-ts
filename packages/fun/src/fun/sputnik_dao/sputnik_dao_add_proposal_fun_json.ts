// =================================================
// sputnik_dao_add_proposal_fun_json
//
// Call: the DAO's `add_proposal`. Adds one proposal to the DAO.
//
// The attached deposit must equal the DAO's current `proposal_bond`;
// the contract rejects both a smaller and a larger deposit. The
// proposal payload is JSON and its `kind` is one of the contract's
// externally tagged proposal kinds.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import type { AMOUNT_INPUT } from "../../types/amount_input_type";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
// =================================================
export async function sputnik_dao_add_proposal_fun_json(
  near: Near,
  dao_contract_id: string,
  description: sputnik_dao_args["description"],
  kind: sputnik_dao_args["kind"],
  attachedDeposit: AMOUNT_INPUT,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    dao_contract_id,
    sputnik_dao_methods_const.add_proposal,
    { proposal: { description, kind } },
    { attachedDeposit, gas: "30 Tgas" },
  );
}
// =================================================
// copyright 2026 by sleet.near
