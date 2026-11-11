// =================================================
// chess_game_get_elo_ratings_fun_json
//
// View: `get_elo_ratings`. Returns the elo leaderboard of the chess
// contract, as account id and rating pairs.
//
// Both `skip` and `limit` are optional on the contract — omit them to
// read the whole leaderboard.
import type { Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
import {
  CHESS_GAME_ELO_RATING_TYPE_Z_CONST,
  type CHESS_GAME_ELO_RATING_TYPE,
} from "../../types/chess_game_types";
// =================================================
export async function chess_game_get_elo_ratings_fun_json(
  near: Near,
  chess_game_contract_id: string,
  skip?: chess_game_args["skip"],
  limit?: chess_game_args["limit"],
): Promise<CHESS_GAME_ELO_RATING_TYPE[]> {
  const result = await near.view(
    chess_game_contract_id,
    chess_game_methods_const.get_elo_ratings,
    { skip: skip ?? null, limit: limit ?? null },
  );
  return CHESS_GAME_ELO_RATING_TYPE_Z_CONST.array().parse(result);
}
// =================================================
// copyright 2026 by sleet.near
