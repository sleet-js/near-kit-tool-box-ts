// =================================================
// ft_transfer_call_fun_json
//
// Call (NEP-141): `ft_transfer_call`. Transfers `amount` of the
// contract's token to `receiver_id` and invokes `receiver_id`'s
// `ft_on_transfer` with `msg`. Attaches the NEP-145 storage minimum
// and `"50 Tgas"` (the receiver callback needs additional gas).
import type { FinalExecutionOutcome, Near } from "near-kit";
import { ft_methods_const } from "../../lib/methods/methods_ft";
import type { ft_args } from "../../lib/args/ft_args";
// =================================================
export async function ft_transfer_call_fun_json(
  near: Near,
  ft_contract_id: string,
  receiver_id: ft_args["receiver_id"],
  msg: ft_args["msg"],
  amount: ft_args["amount"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    ft_contract_id,
    ft_methods_const.ft_transfer_call,
    { msg, amount, receiver_id },
    { attachedDeposit: "0.000000000000000000000001 NEAR", gas: "50 Tgas" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
