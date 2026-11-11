// =================================================
// chess_game_create_ai_game_fun_json
//
// Call: `create_ai_game`. Starts a game against the on-chain chess ai,
// as white.
//
// The caller must be registered. The gas scales with the difficulty —
// 50 Tgas for `Easy`, 150 for `Medium`, 250 for `Hard` and 400 for
// `VeryHard`.
//
// The ai does NOT think during this call — it thinks on its reply to
// the first `play_move`. The gas here covers the game setup.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { chess_game_methods_const } from "../../lib/methods/methods_chess_game";
import type {
  CHESS_GAME_DIFFICULTY_TYPE,
  CHESS_GAME_ID_TYPE,
} from "../../types/chess_game_types";
// =================================================

// The gas the contract needs for a call against each ai difficulty.
//
// `create_ai_game` and `play_move` both scale with the difficulty:
// 50 Tgas for `Easy`, 150 for `Medium`, 250 for `Hard` and 400 for
// `VeryHard`.
export const CHESS_GAME_DIFFICULTY_GAS_TGAS = {
  Easy: 50,
  Medium: 150,
  Hard: 250,
  VeryHard: 400,
} as const satisfies Record<CHESS_GAME_DIFFICULTY_TYPE, number>;

// The gas a game against a HUMAN opponent needs — the same figure the
// contract uses for a `Medium` ai game.
export const CHESS_GAME_HUMAN_GAME_GAS_TGAS = 150;

// =================================================
export async function chess_game_create_ai_game_fun_json(
  near: Near,
  chess_game_contract_id: string,
  difficulty: CHESS_GAME_DIFFICULTY_TYPE,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    chess_game_contract_id,
    chess_game_methods_const.create_ai_game,
    { difficulty },
    { gas: `${CHESS_GAME_DIFFICULTY_GAS_TGAS[difficulty]} Tgas` },
  );
  return result;
}

// =================================================
// The `GameId` a `create_ai_game` call returned.
//
// The outcome of a chess transaction carries the return value of the
// method in its logs — the game id for `create_ai_game`, and the
// outcome and the board for `play_move`.
export type CHESS_GAME_CREATE_OUTCOME_TYPE = CHESS_GAME_ID_TYPE;
// =================================================
// copyright 2026 by sleet.near
