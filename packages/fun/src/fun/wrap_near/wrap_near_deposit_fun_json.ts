// =================================================
// wrap_near_deposit_fun_json
//
// Call: `near_deposit` on the wrap.near contract. Wraps `amount`
// NEAR into wNEAR (NEP-141) at the supplied wrap_near contract id.
// `wrap_contractId` should be `wrap.testnet` or `wrap.near`.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { wrap_near_methods_const } from "../../lib/methods/methods_wrap_near";
import type { AMOUNT_INPUT } from "../../types/amount_input_type";
// =================================================
export async function wrap_near_deposit_fun_json(
  near: Near,
  wrap_contract_id: string,
  amount: AMOUNT_INPUT,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    wrap_contract_id,
    wrap_near_methods_const.near_deposit,
    {},
    { attachedDeposit: amount },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
