// =================================================
// chess_game_get_elo_ratings_by_ids_fun_json
//
// View: `get_elo_ratings_by_ids`. Returns the elo rating of specific
// chess accounts, as account id and rating pairs, in the order of
// `account_ids`.
import type { Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
import {
  CHESS_GAME_ELO_RATING_TYPE_Z_CONST,
  type CHESS_GAME_ELO_RATING_TYPE,
} from "../../types/chess_game_types";
// =================================================
export async function chess_game_get_elo_ratings_by_ids_fun_json(
  near: Near,
  chess_game_contract_id: string,
  account_ids: chess_game_args["account_ids"],
): Promise<CHESS_GAME_ELO_RATING_TYPE[]> {
  const result = await near.view(
    chess_game_contract_id,
    chess_game_methods_const.get_elo_ratings_by_ids,
    { account_ids },
  );
  return CHESS_GAME_ELO_RATING_TYPE_Z_CONST.array().parse(result);
}
// =================================================
// copyright 2026 by sleet.near
