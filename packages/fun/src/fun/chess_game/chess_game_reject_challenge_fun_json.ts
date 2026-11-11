// =================================================
// chess_game_reject_challenge_fun_json
//
// Call: `reject_challenge`. Declines a chess challenge.
//
// The challenge id is the two accounts joined with `-vs-`. Use
// `chess_game_challenge_id` to build it.
//
// `is_challenger` is true for the sender of the challenge and false
// for the receiver. Either party may reject. A wagered challenge
// refunds the tokens to the challenger.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
// =================================================
export async function chess_game_reject_challenge_fun_json(
  near: Near,
  chess_game_contract_id: string,
  challenge_id: chess_game_args["challenge_id"],
  is_challenger: chess_game_args["is_challenger"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.reject_challenge,
    { challenge_id, is_challenger },
    { gas: "30 Tgas" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
