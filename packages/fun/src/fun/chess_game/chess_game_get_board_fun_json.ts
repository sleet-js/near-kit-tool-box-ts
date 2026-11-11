// =================================================
// chess_game_get_board_fun_json
//
// View: `get_board`. Returns the board of a chess game as eight
// strings, one per rank. Row 0 is rank 8, row 7 is rank 1.
//
// The pieces are `KQRBNP` for white and `kqrbnp` for black, a space
// for an empty square.
import type { Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
// =================================================
export async function chess_game_get_board_fun_json(
  near: Near,
  chess_game_contract_id: string,
  game_id: chess_game_args["game_id"],
): Promise<string[]> {
  const result = await near.view(
    chess_game_contract_id,
    chess_game_methods_const.get_board,
    { game_id },
  );
  return result as string[];
}
// =================================================
// copyright 2026 by sleet.near
