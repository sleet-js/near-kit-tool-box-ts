// =================================================
// chess_game_resign_fun_json
//
// Call: `resign`. Gives up a chess game.
//
// The opponent wins. A resignation can happen on any turn.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
// =================================================
export async function chess_game_resign_fun_json(
  near: Near,
  chess_game_contract_id: string,
  game_id: chess_game_args["game_id"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.resign,
    { game_id },
    { gas: "300 Tgas" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
