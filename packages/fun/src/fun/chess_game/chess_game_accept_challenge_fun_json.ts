// =================================================
// chess_game_accept_challenge_fun_json
//
// Call: `accept_challenge`. Accepts a chess challenge, which starts the
// game.
//
// The challenge id is the two accounts joined with `-vs-`. Use
// `chess_game_challenge_id` to build it.
//
// To accept a WAGERED challenge, use an `ft_transfer_call` on the
// token contract instead.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
// =================================================
export async function chess_game_accept_challenge_fun_json(
  near: Near,
  chess_game_contract_id: string,
  challenge_id: chess_game_args["challenge_id"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.accept_challenge,
    { challenge_id },
    { gas: "30 Tgas" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
