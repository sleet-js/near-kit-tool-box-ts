// =================================================
// pumpopoly_world_elite_move_fun_json
//
// Call: `elite_move` on the pumpopoly world contract. Attaches
// `"100 Tgas"`. The arg shape (`contract_id: "1"`) is the current
// contract expectation; revisit if the contract adds typed args.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import { pumpopoly_world_methods_const } from "../../lib/methods/methods_pumpopoly_world";
// =================================================
export async function pumpopoly_world_elite_move_fun_json(
  near: Near,
  pumpopoly_world_contract_id: string,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    pumpopoly_world_contract_id,
    pumpopoly_world_methods_const.elite_move,
    { contract_id: "1" },
    { gas: "100 Tgas" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
