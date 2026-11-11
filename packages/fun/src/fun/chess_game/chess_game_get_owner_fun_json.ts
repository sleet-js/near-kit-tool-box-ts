// =================================================
// chess_game_get_owner_fun_json
//
// View: `get_owner`. Returns the owner account id of the chess
// contract.
import type { Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import { ACCOUNT_ID_STRING_Z_CONST } from "../../types/scalar_type";
// =================================================
export async function chess_game_get_owner_fun_json(
  near: Near,
  chess_game_contract_id: string,
): Promise<string> {
  const result = await near.view(
    chess_game_contract_id,
    chess_game_methods_const.get_owner,
    {},
  );
  return ACCOUNT_ID_STRING_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
