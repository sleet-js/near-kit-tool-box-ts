// =================================================
// bin/chess_game/chess_game_join_matchmaking.ts
//
// Call: joins the chess matchmaking queue.
//
// `min_elo` and `max_elo` are the rating range of the opponent to
// match. The call takes NO deposit.
//
// usage:
//   bun run bin/chess_game/chess_game_join_matchmaking.ts \
//     --min-elo <n> --max-elo <n> [--contract-id <id>]
// =================================================
import { parse_args, require_number } from "../_shared/args.js";
import {
  chess_game_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  require_signer,
  resolve_contract_id,
} from "../_shared/env.js";
import { chess_game_join_matchmaking_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_join_matchmaking.ts --min-elo <n> --max-elo <n> [--contract-id <id>]";
const args = parse_args();
require_signer(usage);
const min_elo = require_number(args, "min-elo", usage);
const max_elo = require_number(args, "max-elo", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `join_matchmaking [${min_elo}, ${max_elo}] @ ${contract_id}`,
  await chess_game_join_matchmaking_fun_json(
    near_kit_env,
    contract_id,
    min_elo,
    max_elo,
  ),
);
// =================================================
// copyright 2026 by sleet.near
