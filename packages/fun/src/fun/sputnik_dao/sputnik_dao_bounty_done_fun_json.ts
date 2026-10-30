// =================================================
// sputnik_dao_bounty_done_fun_json
//
// Call: the DAO's `bounty_done`. Marks the caller's bounty claim as
// complete and creates a `BountyDone` proposal for its payout.
//
// The attached deposit must equal the DAO's current `proposal_bond`.
// `account_id` is optional and identifies the claim owner; the caller
// must be that owner while the claim is still active.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import type { AMOUNT_INPUT } from "../../types/amount_input_type";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
// =================================================
export async function sputnik_dao_bounty_done_fun_json(
  near: Near,
  dao_contract_id: string,
  id: sputnik_dao_args["id"],
  description: sputnik_dao_args["description"],
  accountId: sputnik_dao_args["account_id_optional"] = null,
  attachedDeposit: AMOUNT_INPUT,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    dao_contract_id,
    sputnik_dao_methods_const.bounty_done,
    { id, account_id: accountId, description },
    { attachedDeposit, gas: "30 Tgas" },
  );
}
// =================================================
// copyright 2026 by sleet.near
