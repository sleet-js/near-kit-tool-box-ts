// =================================================
// chess_game_get_accounts_fun_json
//
// View: `get_accounts`. Returns the registered chess account ids,
// paginated.
//
// Both `skip` and `limit` are optional on the contract — omit them to
// read the whole list.
import type { Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
import { ACCOUNT_ID_STRING_Z_CONST } from "../../types/scalar_type";
// =================================================
export async function chess_game_get_accounts_fun_json(
  near: Near,
  chess_game_contract_id: string,
  skip?: chess_game_args["skip"],
  limit?: chess_game_args["limit"],
): Promise<string[]> {
  const result = await near.view(
    chess_game_contract_id,
    chess_game_methods_const.get_accounts,
    { skip: skip ?? null, limit: limit ?? null },
  );
  return ACCOUNT_ID_STRING_Z_CONST.array().parse(result);
}
// =================================================
// copyright 2026 by sleet.near
