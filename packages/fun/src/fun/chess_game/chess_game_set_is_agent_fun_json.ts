// =================================================
// chess_game_set_is_agent_fun_json
//
// Call: `set_is_agent`. Marks the caller as an automated agent.
//
// The flag is public and visible to anyone through `get_account`. It
// does not change how the contract behaves.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
// =================================================
export async function chess_game_set_is_agent_fun_json(
  near: Near,
  chess_game_contract_id: string,
  is_agent: chess_game_args["is_agent"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.set_is_agent,
    { is_agent },
    { gas: "10 Tgas", attachedDeposit: "1 yocto" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
