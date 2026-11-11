// =================================================
// chess_game_render_board_fun_json
//
// View: `render_board`. Returns the board of a chess game as one
// formatted string — the same board as `get_board`, but rendered with
// unicode pieces and chessboard squares.
import type { Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
// =================================================
export async function chess_game_render_board_fun_json(
  near: Near,
  chess_game_contract_id: string,
  game_id: chess_game_args["game_id"],
): Promise<string> {
  const result = await near.view(
    chess_game_contract_id,
    chess_game_methods_const.render_board,
    { game_id },
  );
  return result as string;
}
// =================================================
// copyright 2026 by sleet.near
