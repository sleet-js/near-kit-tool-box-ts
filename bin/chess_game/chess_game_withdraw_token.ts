// =================================================
// bin/chess_game/chess_game_withdraw_token.ts
//
// Call: withdraws the tokens the chess contract holds for the signer.
//
// usage:
//   bun run bin/chess_game/chess_game_withdraw_token.ts \
//     --token-id <id> [--contract-id <id>]
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
import { chess_game_withdraw_token_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_withdraw_token.ts --token-id <id> [--contract-id <id>]";
const args = parse_args();
require_signer(usage);
const token_id = require_string(args, "token-id", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `withdraw_token ${token_id} @ ${contract_id}`,
  await chess_game_withdraw_token_fun_json(near_kit_env, contract_id, token_id),
);
// =================================================
// copyright 2026 by sleet.near
