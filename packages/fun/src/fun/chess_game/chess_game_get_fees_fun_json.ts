// =================================================
// chess_game_get_fees_fun_json
//
// View: `get_fees`. Returns the treasury fee of the chess contract,
// in basis points.
//
// The fee is taken from the losing side of a settled bet.
import type { Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
// =================================================
export async function chess_game_get_fees_fun_json(
  near: Near,
  chess_game_contract_id: string,
): Promise<number> {
  const result = await near.view(
    chess_game_contract_id,
    chess_game_methods_const.get_fees,
    {},
  );
  return result as number;
}
// =================================================
// copyright 2026 by sleet.near
