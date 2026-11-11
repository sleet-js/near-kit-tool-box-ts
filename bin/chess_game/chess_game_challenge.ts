// =================================================
// bin/chess_game/chess_game_challenge.ts
//
// Call: challenges another account to a chess game.
//
// usage:
//   bun run bin/chess_game/chess_game_challenge.ts \
//     --challenged-id <id> [--contract-id <id>]
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
import { chess_game_challenge_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_challenge.ts --challenged-id <id> [--contract-id <id>]";
const args = parse_args();
require_signer(usage);
const challenged_id = require_string(args, "challenged-id", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `challenge ${challenged_id} @ ${contract_id}`,
  await chess_game_challenge_fun_json(near_kit_env, contract_id, challenged_id),
);
// =================================================
// copyright 2026 by sleet.near
