// =================================================
// bin/chess_game/chess_game_contract_info.ts
//
// View: reads the owner, the treasury fee and the token whitelist of
// the chess contract, in one go.
//
// usage:
//   bun run bin/chess_game/chess_game_contract_info.ts [--contract-id <id>]
// =================================================
import { parse_args } from "../_shared/args.js";
import {
  chess_game_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import {
  chess_game_get_fees_fun_json,
  chess_game_get_owner_fun_json,
  chess_game_get_token_whitelist_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_contract_info.ts [--contract-id <id>]";
const args = parse_args();
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(`contract info @ ${contract_id}`, {
  owner: await chess_game_get_owner_fun_json(near_kit_env, contract_id),
  fees_bps: await chess_game_get_fees_fun_json(near_kit_env, contract_id),
  token_whitelist: await chess_game_get_token_whitelist_fun_json(
    near_kit_env,
    contract_id,
  ),
});
// =================================================
// copyright 2026 by sleet.near
