// =================================================
// wrap_near_withdraw_fun_json
//
// Call: `near_withdraw` on the wrap.near contract. Unwraps `amount`
// of wNEAR (decimal string in the token's smallest unit) back into
// NEAR. Attaches the `"1 yocto"` security deposit wrap.near requires.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { wrap_near_methods_const } from "../../lib/methods/methods_wrap_near";
// =================================================
export async function wrap_near_withdraw_fun_json(
  near: Near,
  wrap_contract_id: string,
  amount: string,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    wrap_contract_id,
    wrap_near_methods_const.near_withdraw,
    { amount },
    { attachedDeposit: "1 yocto" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
