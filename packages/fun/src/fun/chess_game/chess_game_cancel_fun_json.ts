// =================================================
// chess_game_cancel_fun_json
//
// Call: `cancel`. Cancels a chess game that has gone stale.
//
// A player may cancel their own game after 3 days of inactivity, and
// only when it is not their turn. Anyone else may cancel a game after
// 14 days of inactivity. Wagers and bets are refunded on a
// cancellation.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
// =================================================
export async function chess_game_cancel_fun_json(
  near: Near,
  chess_game_contract_id: string,
  game_id: chess_game_args["game_id"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.cancel,
    { game_id },
    { gas: "300 Tgas" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
