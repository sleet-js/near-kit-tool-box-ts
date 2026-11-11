// =================================================
// chess_game_storage_withdraw_fun_json
//
// Call: `storage_withdraw`. NOT IMPLEMENTED on this contract — the
// call always fails with `OperationNotSupported`.
//
// The contract's `internal_storage_withdraw` returns
// `ContractError::OperationNotSupported` for every call, so no storage
// balance can ever be withdrawn this way. The helper is kept because
// the method exists on the contract and the call type, gas and
// deposit are correct — but it will not succeed.
//
// `amount` is optional and is a yoctoNEAR decimal string.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
// =================================================
export async function chess_game_storage_withdraw_fun_json(
  near: Near,
  chess_game_contract_id: string,
  amount?: chess_game_args["amount"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.storage_withdraw,
    { amount: amount ?? null },
    { gas: "30 Tgas", attachedDeposit: "1 yocto" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
