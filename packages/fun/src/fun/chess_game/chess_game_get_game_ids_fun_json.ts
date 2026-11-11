// =================================================
// chess_game_get_game_ids_fun_json
//
// View: `get_game_ids`. Returns the active games of one chess account,
// as game ids — `[block_height, white, black|null]`.
import type { Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
import {
  CHESS_GAME_ID_TYPE_Z_CONST,
  type CHESS_GAME_ID_TYPE,
} from "../../types/chess_game_types";
// =================================================
export async function chess_game_get_game_ids_fun_json(
  near: Near,
  chess_game_contract_id: string,
  account_id: chess_game_args["account_id"],
): Promise<CHESS_GAME_ID_TYPE[]> {
  const result = await near.view(
    chess_game_contract_id,
    chess_game_methods_const.get_game_ids,
    { account_id },
  );
  return CHESS_GAME_ID_TYPE_Z_CONST.array().parse(result);
}
// =================================================
// copyright 2026 by sleet.near
