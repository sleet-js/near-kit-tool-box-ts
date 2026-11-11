// =================================================
// chess_game_withdraw_token_fun_json
//
// Call: `withdraw_token`. Withdraws the tokens the chess contract holds
// for the caller.
//
// The balance is a cancelled bet, a refund or a payout. Read it with
// the `get_token_amount` view.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
// =================================================
export async function chess_game_withdraw_token_fun_json(
  near: Near,
  chess_game_contract_id: string,
  token_id: chess_game_args["token_id"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.withdraw_token,
    { token_id },
    { gas: "30 Tgas", attachedDeposit: "1 yocto" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
