// =================================================
// chess_game_claim_points_fun_json
//
// Call: `claim_points`. Claims the pending ppp points of the caller.
//
// Quest points earned in a wager or a bet flow are held as pending
// points and land in the balance after this call.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
// =================================================
export async function chess_game_claim_points_fun_json(
  near: Near,
  chess_game_contract_id: string,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.claim_points,
    {},
    { gas: "30 Tgas" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
