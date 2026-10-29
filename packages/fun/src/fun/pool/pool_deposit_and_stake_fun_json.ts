// =================================================
// pool_deposit_and_stake_fun_json
//
// Call: `deposit_and_stake`. Attaches `attachedDeposit` (NEAR) to
// deposit the user's balance into the staking pool and stake it in
// the same transaction.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { pool_methods_const } from "../../lib/methods/methods_pool";
import type { AMOUNT_INPUT } from "../../types/amount_input_type";
// =================================================
export async function pool_deposit_and_stake_fun_json(
  near: Near,
  pool_contract_id: string,
  attached_deposit: AMOUNT_INPUT,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    pool_contract_id,
    pool_methods_const.deposit_and_stake,
    {},
    { attachedDeposit: attached_deposit },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
