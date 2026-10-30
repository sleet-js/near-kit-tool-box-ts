// =================================================
// sputnik_dao_register_delegation_fun_json
//
// Call: the DAO's `register_delegation`. Registers an account for
// delegated voting weight.
//
// Only the DAO's configured staking contract may call this method.
// The attached deposit must exactly equal the storage cost for 16
// bytes.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import type { AMOUNT_INPUT } from "../../types/amount_input_type";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
// =================================================
export async function sputnik_dao_register_delegation_fun_json(
  near: Near,
  dao_contract_id: string,
  account_id: sputnik_dao_args["account_id"],
  attachedDeposit: AMOUNT_INPUT,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    dao_contract_id,
    sputnik_dao_methods_const.register_delegation,
    { account_id },
    { attachedDeposit, gas: "30 Tgas" },
  );
}
// =================================================
// copyright 2026 by sleet.near
