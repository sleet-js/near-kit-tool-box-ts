// =================================================
// bin/chess_game/chess_game_get_accounts.ts
//
// View: reads the registered chess account ids, paginated.
//
// usage:
//   bun run bin/chess_game/chess_game_get_accounts.ts \
//     [--skip <n>] [--limit <n>] [--contract-id <id>]
// =================================================
import { parse_args, optional_number } from "../_shared/args.js";
import {
  chess_game_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import { chess_game_get_accounts_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_get_accounts.ts [--skip <n>] [--limit <n>] [--contract-id <id>]";
const args = parse_args();
const skip =
  args["skip"] === undefined ? undefined : optional_number(args, "skip", 0);
const limit =
  args["limit"] === undefined ? undefined : optional_number(args, "limit", 100);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `get_accounts @ ${contract_id}`,
  await chess_game_get_accounts_fun_json(
    near_kit_env,
    contract_id,
    skip,
    limit,
  ),
);
// =================================================
// copyright 2026 by sleet.near
