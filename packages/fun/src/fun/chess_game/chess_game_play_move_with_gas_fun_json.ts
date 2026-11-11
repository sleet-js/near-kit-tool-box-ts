// =================================================
// chess_game_play_move_with_gas_fun_json
//
// Calls `play_move` with the gas chosen for the given opponent.
//
// `difficulty` is undefined for a game against a human, which needs
// 150 Tgas. Against the ai it is the ai difficulty — 50 Tgas for
// `Easy`, 150 for `Medium`, 250 for `Hard` and 400 for `VeryHard`.
import type { Near } from "near-kit";
import type { chess_game_args } from "../../lib/args/chess_game_args";
import type { CHESS_GAME_DIFFICULTY_TYPE } from "../../types/chess_game_types";
import { chess_game_play_move_fun_json } from "./chess_game_play_move_fun_json";
import {
  CHESS_GAME_DIFFICULTY_GAS_TGAS,
  CHESS_GAME_HUMAN_GAME_GAS_TGAS,
} from "./chess_game_create_ai_game_fun_json";
// =================================================
export async function chess_game_play_move_with_gas_fun_json(
  near: Near,
  chess_game_contract_id: string,
  game_id: chess_game_args["game_id"],
  mv: chess_game_args["mv"],
  difficulty?: CHESS_GAME_DIFFICULTY_TYPE,
) {
  const gas_tgas =
    difficulty === undefined
      ? CHESS_GAME_HUMAN_GAME_GAS_TGAS
      : CHESS_GAME_DIFFICULTY_GAS_TGAS[difficulty];
  return chess_game_play_move_fun_json(
    near,
    chess_game_contract_id,
    game_id,
    mv,
    gas_tgas,
  );
}
// =================================================
// copyright 2026 by sleet.near
