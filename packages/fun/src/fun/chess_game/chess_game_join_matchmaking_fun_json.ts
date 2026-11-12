// =================================================
// chess_game_join_matchmaking_fun_json
//
// Call: `join_matchmaking`. Joins the chess matchmaking queue.
//
// `min_elo` and `max_elo` are the rating range of the opponent to
// match and are required. They are FLOATS on the contract, not
// integers. The caller must be registered, and must not already be in
// a challenge or in the queue. The queue holds 500 entries.
//
// A queue entry expires after ONE HOUR, and the expired entries are
// purged lazily — when the queue is next walked.
//
// The elo test is MUTUAL: the joiner's band and the queued player's
// band must both accept the other player, so a band is an agreement
// between two players rather than a search range.
//
// The call attaches NO deposit — the queue entry costs the contract
// nothing to store.
//
// To join the queue WITH A WAGER, use an `ft_transfer_call` on the
// token contract instead. That path is the one that carries a token
// deposit, and the wager is refunded when the entry is matched or
// cancelled.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
// =================================================
export async function chess_game_join_matchmaking_fun_json(
  near: Near,
  chess_game_contract_id: string,
  min_elo: chess_game_args["min_elo"],
  max_elo: chess_game_args["max_elo"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.join_matchmaking,
    { min_elo, max_elo },
    { gas: "30 Tgas" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
