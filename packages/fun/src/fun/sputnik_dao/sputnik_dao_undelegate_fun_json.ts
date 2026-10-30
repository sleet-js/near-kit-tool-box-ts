// =================================================
// sputnik_dao_undelegate_fun_json
//
// Call: the DAO's `undelegate`. Removes delegated voting weight from an
// account.
//
// Only the DAO's configured staking contract may call this method.
// Users call the staking contract, which forwards to the DAO.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
// =================================================
export async function sputnik_dao_undelegate_fun_json(
  near: Near,
  dao_contract_id: string,
  account_id: sputnik_dao_args["account_id"],
  amount: sputnik_dao_args["amount"],
): Promise<FinalExecutionOutcome> {
  return await near.call(
    dao_contract_id,
    sputnik_dao_methods_const.undelegate,
    { account_id, amount },
    { attachedDeposit: 0n, gas: "30 Tgas" },
  );
}
// =================================================
// copyright 2026 by sleet.near
