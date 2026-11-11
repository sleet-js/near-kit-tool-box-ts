// =================================================
// chess_game_cancel_matchmaking_fun_json
//
// Call: `cancel_matchmaking`. Leaves the chess matchmaking queue.
//
// A wager deposited with the queue entry is refunded to the caller.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
// =================================================
export async function chess_game_cancel_matchmaking_fun_json(
  near: Near,
  chess_game_contract_id: string,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.cancel_matchmaking,
    {},
    { gas: "10 Tgas" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
