// =================================================
// chess_game_get_account_fun_json
//
// View: `get_account`. Returns the registration, rating, points and
// stats of one chess account.
//
// The response holds `near_amount`, `is_agent`, `points`,
// `pending_points`, `elo`, `wins`, `win_streak`, `max_win_streak`,
// `bets_placed`, `bets_won`, `wagers_played`, `wager_wins` and
// `challenges_sent`.
import type { Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
import {
  CHESS_GAME_ACCOUNT_TYPE_Z_CONST,
  type CHESS_GAME_ACCOUNT_TYPE,
} from "../../types/chess_game_types";
// =================================================
export async function chess_game_get_account_fun_json(
  near: Near,
  chess_game_contract_id: string,
  account_id: chess_game_args["account_id"],
): Promise<CHESS_GAME_ACCOUNT_TYPE> {
  const result = await near.view(
    chess_game_contract_id,
    chess_game_methods_const.get_account,
    { account_id },
  );
  return CHESS_GAME_ACCOUNT_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
