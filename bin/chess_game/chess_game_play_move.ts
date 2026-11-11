// =================================================
// bin/chess_game/chess_game_play_move.ts
//
// Call: plays a move in a chess game.
//
// `mv` is COORDINATE NOTATION, not san — "e2e4", "e2 e4", "e2 to e4",
// "O-O", "O-O-O", "e7 to e8 Q".
//
// The gas depends on the opponent: 50 Tgas against the `Easy` ai, 150
// against the `Medium` ai or a human game, 250 against `Hard` and 400
// against `VeryHard`. Pass `--difficulty` to pick it automatically, or
// `--gas-tgas` to set it by hand.
//
// usage:
//   bun run bin/chess_game/chess_game_play_move.ts \
//     --game-id '[113689871,"within4d45.near","marior.near"]' \
//     --mv "e2e4" [--difficulty <Easy|Medium|Hard|VeryHard>] [--gas-tgas <n>] \
//     [--contract-id <id>]
// =================================================
import {
  parse_args,
  optional_number,
  require_string,
} from "../_shared/args.js";
import {
  chess_game_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  require_signer,
  resolve_contract_id,
} from "../_shared/env.js";
import { require_game_id } from "./_shared.js";
import {
  chess_game_play_move_fun_json,
  CHESS_GAME_DIFFICULTY_GAS_TGAS,
  CHESS_GAME_DIFFICULTY_Z_CONST,
  CHESS_GAME_HUMAN_GAME_GAS_TGAS,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  'bun run bin/chess_game/chess_game_play_move.ts --game-id \'[height,"white.near","black.near"]\' --mv <move> [--difficulty <d>] [--gas-tgas <n>] [--contract-id <id>]';
const args = parse_args();
require_signer(usage);
const game_id = require_game_id(args, usage);
const mv = require_string(args, "mv", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);

const difficulty =
  args["difficulty"] === undefined
    ? undefined
    : CHESS_GAME_DIFFICULTY_Z_CONST.parse(
        require_string(args, "difficulty", usage),
      );
const gas_tgas =
  args["gas-tgas"] === undefined
    ? difficulty === undefined
      ? CHESS_GAME_HUMAN_GAME_GAS_TGAS
      : CHESS_GAME_DIFFICULTY_GAS_TGAS[difficulty]
    : optional_number(args, "gas-tgas", CHESS_GAME_HUMAN_GAME_GAS_TGAS);
// =================================================
log_result(
  `play_move ${mv} @ ${contract_id}`,
  await chess_game_play_move_fun_json(
    near_kit_env,
    contract_id,
    game_id,
    mv,
    gas_tgas,
  ),
);
// =================================================
// copyright 2026 by sleet.near
