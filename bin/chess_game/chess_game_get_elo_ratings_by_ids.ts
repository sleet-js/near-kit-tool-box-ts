// =================================================
// bin/chess_game/chess_game_get_elo_ratings_by_ids.ts
//
// View: reads the elo rating of specific chess accounts.
//
// usage:
//   bun run bin/chess_game/chess_game_get_elo_ratings_by_ids.ts \
//     --account-ids <id,id> [--contract-id <id>]
// =================================================
import { parse_args, require_list } from "../_shared/args.js";
import {
  chess_game_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import { chess_game_get_elo_ratings_by_ids_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_get_elo_ratings_by_ids.ts --account-ids <id,id> [--contract-id <id>]";
const args = parse_args();
const account_ids = require_list(args, "account-ids", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `get_elo_ratings_by_ids @ ${contract_id}`,
  await chess_game_get_elo_ratings_by_ids_fun_json(
    near_kit_env,
    contract_id,
    account_ids,
  ),
);
// =================================================
// copyright 2026 by sleet.near
