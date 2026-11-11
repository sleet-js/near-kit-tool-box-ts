// =================================================
// chess_game_get_token_whitelist_fun_json
//
// View: `get_token_whitelist`. Returns the token contracts the chess
// contract accepts for wagers and bets.
import type { Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import { ACCOUNT_ID_STRING_Z_CONST } from "../../types/scalar_type";
// =================================================
export async function chess_game_get_token_whitelist_fun_json(
  near: Near,
  chess_game_contract_id: string,
): Promise<string[]> {
  const result = await near.view(
    chess_game_contract_id,
    chess_game_methods_const.get_token_whitelist,
    {},
  );
  return ACCOUNT_ID_STRING_Z_CONST.array().parse(result);
}
// =================================================
// copyright 2026 by sleet.near
