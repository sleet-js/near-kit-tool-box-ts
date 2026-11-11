// =================================================
// chess_game_storage_balance_of_fun_json
//
// View: `storage_balance_of`. Returns the NEP-145 storage balance of
// one account on the chess contract.
//
// All amounts are yoctoNEAR decimal strings.
import type { Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
import {
  STORAGE_BALANCE_OF_RESPONSE_TYPE_Z_CONST,
  type STORAGE_BALANCE_OF_RESPONSE_TYPE,
} from "../../types/storage_balance_of_response_type";
// =================================================
export async function chess_game_storage_balance_of_fun_json(
  near: Near,
  chess_game_contract_id: string,
  account_id: chess_game_args["account_id"],
): Promise<STORAGE_BALANCE_OF_RESPONSE_TYPE> {
  const result = await near.view(
    chess_game_contract_id,
    chess_game_methods_const.storage_balance_of,
    { account_id },
  );
  return STORAGE_BALANCE_OF_RESPONSE_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
