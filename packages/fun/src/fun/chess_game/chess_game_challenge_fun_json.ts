// =================================================
// chess_game_challenge_fun_json
//
// Call: `challenge`. Challenges another account to a chess game.
//
// The caller must be registered and cannot challenge themselves. An
// account may hold 25 open challenges.
//
// To challenge with a WAGER, use an `ft_transfer_call` on the token
// contract instead.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
// =================================================
export async function chess_game_challenge_fun_json(
  near: Near,
  chess_game_contract_id: string,
  challenged_id: chess_game_args["challenged_id"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.challenge,
    { challenged_id },
    { gas: "30 Tgas" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
