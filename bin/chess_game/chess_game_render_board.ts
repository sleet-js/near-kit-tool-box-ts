// =================================================
// bin/chess_game/chess_game_render_board.ts
//
// View: reads the board of a chess game, rendered as one string.
//
// usage:
//   bun run bin/chess_game/chess_game_render_board.ts \
//     --game-id '[113689871,"within4d45.near","marior.near"]' [--contract-id <id>]
// =================================================
import { parse_args } from "../_shared/args.js";
import {
  chess_game_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import { require_game_id } from "./_shared.js";
import { chess_game_render_board_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  'bun run bin/chess_game/chess_game_render_board.ts --game-id \'[height,"white.near","black.near"]\' [--contract-id <id>]';
const args = parse_args();
const game_id = require_game_id(args, usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
// =================================================
const board = await chess_game_render_board_fun_json(
  near_kit_env,
  contract_id,
  game_id,
);
console.log(`--- render_board ${JSON.stringify(game_id)} @ ${contract_id} ---`);
console.log(board);
// =================================================
// copyright 2026 by sleet.near
