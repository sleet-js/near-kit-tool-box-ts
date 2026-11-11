// =================================================
// chess_game_storage_balance_bounds_fun_json
//
// View: `storage_balance_bounds`. Returns the NEP-145 storage balance
// bounds of the chess contract.
//
// The `min` is the exact deposit a caller must attach to
// `storage_deposit` to register an account.
import type { Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import {
  CHESS_GAME_STORAGE_BOUNDS_TYPE_Z_CONST,
  type CHESS_GAME_STORAGE_BOUNDS_TYPE,
} from "../../types/chess_game_types";
// =================================================
export async function chess_game_storage_balance_bounds_fun_json(
  near: Near,
  chess_game_contract_id: string,
): Promise<CHESS_GAME_STORAGE_BOUNDS_TYPE> {
  const result = await near.view(
    chess_game_contract_id,
    chess_game_methods_const.storage_balance_bounds,
    {},
  );
  return CHESS_GAME_STORAGE_BOUNDS_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
