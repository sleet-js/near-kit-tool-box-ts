// =================================================
// sputnik_dao_bounty_claim_fun_json
//
// Call: the DAO's `bounty_claim`. Claims one bounty for the caller.
//
// The attached deposit must equal the DAO's current `bounty_bond`, and
// `deadline` must not exceed the bounty's `max_deadline`.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import type { AMOUNT_INPUT } from "../../types/amount_input_type";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
// =================================================
export async function sputnik_dao_bounty_claim_fun_json(
  near: Near,
  dao_contract_id: string,
  id: sputnik_dao_args["id"],
  deadline: sputnik_dao_args["deadline"],
  attachedDeposit: AMOUNT_INPUT,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    dao_contract_id,
    sputnik_dao_methods_const.bounty_claim,
    { id, deadline },
    { attachedDeposit, gas: "30 Tgas" },
  );
}
// =================================================
// copyright 2026 by sleet.near
