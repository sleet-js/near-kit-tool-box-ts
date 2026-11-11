// =================================================
// bin/chess_game/chess_game_create_ai_game.ts
//
// Call: starts a game against the on-chain chess ai, as white.
//
// The gas scales with the difficulty — 50 Tgas for `Easy`, 150 for
// `Medium`, 250 for `Hard` and 400 for `VeryHard`.
//
// usage:
//   bun run bin/chess_game/chess_game_create_ai_game.ts \
//     --difficulty <Easy|Medium|Hard|VeryHard> [--contract-id <id>]
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import {
  chess_game_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  require_signer,
  resolve_contract_id,
} from "../_shared/env.js";
import {
  chess_game_create_ai_game_fun_json,
  CHESS_GAME_DIFFICULTY_Z_CONST,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_create_ai_game.ts --difficulty <Easy|Medium|Hard|VeryHard> [--contract-id <id>]";
const args = parse_args();
require_signer(usage);
const difficulty = CHESS_GAME_DIFFICULTY_Z_CONST.parse(
  require_string(args, "difficulty", usage),
);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `create_ai_game ${difficulty} @ ${contract_id}`,
  await chess_game_create_ai_game_fun_json(
    near_kit_env,
    contract_id,
    difficulty,
  ),
);
// =================================================
// copyright 2026 by sleet.near
