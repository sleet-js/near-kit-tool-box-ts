// =================================================
// chess_game_play_move_fun_json
//
// Call: `play_move`. Plays a move in a chess game.
//
// `mv` is COORDINATE NOTATION, not san. `"Nf3"` and `"Qxe4"` fail.
// The accepted forms are `"e2e4"`, `"e2 e4"`, `"e2 to e4"`, `"O-O"`,
// `"O-O-O"` and a promotion like `"e7 to e8 queen"` — a promotion
// spells the piece out in full. The columns are a–h and the rows are
// 1–8, counted from white's side.
//
// The gas depends on the opponent: 50 Tgas against the `Easy` ai, 150
// against the `Medium` ai or a human game, 250 against `Hard` and 400
// against `VeryHard`. Use `chess_game_play_move_with_gas_fun_json` when
// the opponent is not known up front.
//
// Against the ai, the ai replies inside the same transaction.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type { chess_game_args } from "../../lib/args/chess_game_args";
// =================================================
export async function chess_game_play_move_fun_json(
  near: Near,
  chess_game_contract_id: string,
  game_id: chess_game_args["game_id"],
  mv: chess_game_args["mv"],
  gas_tgas: number,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.play_move,
    { game_id, mv },
    { gas: `${gas_tgas} Tgas` },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
