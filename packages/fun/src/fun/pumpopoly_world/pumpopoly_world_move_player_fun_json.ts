// =================================================
// pumpopoly_world_move_player_fun_json
//
// Call: `move_player` on the pumpopoly world contract. No args;
// attaches `"60 Tgas"`.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { pumpopoly_world_methods_const } from "../../lib/methods/methods_pumpopoly_world";
// =================================================
export async function pumpopoly_world_move_player_fun_json(
  near: Near,
  pumpopoly_world_contract_id: string,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    pumpopoly_world_contract_id,
    pumpopoly_world_methods_const.move_player,
    {},
    { gas: "60 Tgas" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
