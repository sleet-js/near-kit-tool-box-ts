// =================================================
// ft_transfer_fun_json
//
// Call (NEP-145): `ft_transfer`. Transfers `amount` of the contract's
// token to `receiver_id`. Attaches the storage-stake minimum
// (`"0.000000000000000000000001 NEAR"`, the NEP-145 minimum) and
// returns the `FinalExecutionOutcome`.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { ft_methods_const } from "../../lib/methods/methods_ft";
import type { ft_args } from "../../lib/args/ft_args";
// =================================================
export async function ft_transfer_fun_json(
  near: Near,
  ft_contract_id: string,
  receiver_id: ft_args["receiver_id"],
  amount: ft_args["amount"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    ft_contract_id,
    ft_methods_const.ft_transfer,
    { amount, receiver_id },
    { attachedDeposit: "0.000000000000000000000001 NEAR" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
