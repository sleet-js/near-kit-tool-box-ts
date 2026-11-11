// =================================================
// chess_game_storage_deposit_fun_json
//
// Call: `storage_deposit`. Registers an account on the chess
// contract, or tops up the storage balance of one that is already
// registered.
//
// `account_id` is optional and registers ANOTHER account — omit it to
// register the caller. `registration_only` is optional and defaults to
// `false`.
//
// The deposit is the storage cost, at least 0.05 NEAR
// (`"50000000000000000000000"` yoctoNEAR). A new account starts with
// an elo rating of 1000, no points, and every stat at zero.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
// =================================================

// The minimum deposit the chess contract requires to register an
// account, in yoctoNEAR (0.05 NEAR).
//
// The exact minimum is readable with the `storage_balance_bounds` view.
export const CHESS_GAME_STORAGE_DEPOSIT_MIN_YOCTONEAR =
  50000000000000000000000n;

// =================================================
export async function chess_game_storage_deposit_fun_json(
  near: Near,
  chess_game_contract_id: string,
  account_id?: string,
  registration_only?: boolean,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.storage_deposit,
    {
      account_id: account_id ?? null,
      registration_only: registration_only ?? null,
    },
    {
      gas: "30 Tgas",
      attachedDeposit: CHESS_GAME_STORAGE_DEPOSIT_MIN_YOCTONEAR,
    },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
