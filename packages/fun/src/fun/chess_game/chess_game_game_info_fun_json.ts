// =================================================
// chess_game_game_info_fun_json
//
// View: `game_info`. Returns the players, whose turn it is, and
// whether the game carries bets.
//
// `white` and `black` are tagged — a human account id or an ai
// difficulty. `turn_color` is `"White"` or `"Black"`.
import type { Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
import {
  CHESS_GAME_INFO_TYPE_Z_CONST,
  type CHESS_GAME_INFO_TYPE,
} from "../../types/chess_game_types";
// =================================================
export async function chess_game_game_info_fun_json(
  near: Near,
  chess_game_contract_id: string,
  game_id: chess_game_args["game_id"],
): Promise<CHESS_GAME_INFO_TYPE> {
  const result = await near.view(
    chess_game_contract_id,
    chess_game_methods_const.game_info,
    { game_id },
  );
  return CHESS_GAME_INFO_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
