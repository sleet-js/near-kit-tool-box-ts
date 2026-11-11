// =================================================
// bin/chess_game/chess_game_get_game_ids.ts
//
// View: reads the active games of one chess account.
//
// usage:
//   bun run bin/chess_game/chess_game_get_game_ids.ts \
//     --account-id <id> [--contract-id <id>]
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import {
  chess_game_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import { chess_game_get_game_ids_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_get_game_ids.ts --account-id <id> [--contract-id <id>]";
const args = parse_args();
const account_id = require_string(args, "account-id", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `get_game_ids ${account_id} @ ${contract_id}`,
  await chess_game_get_game_ids_fun_json(near_kit_env, contract_id, account_id),
);
// =================================================
// copyright 2026 by sleet.near
