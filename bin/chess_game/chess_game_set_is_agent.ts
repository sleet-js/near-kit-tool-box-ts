// =================================================
// bin/chess_game/chess_game_set_is_agent.ts
//
// Call: marks the signer as an automated agent.
//
// usage:
//   bun run bin/chess_game/chess_game_set_is_agent.ts [--is-agent] [--contract-id <id>]
// =================================================
import { parse_args } from "../_shared/args.js";
import {
  chess_game_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  require_signer,
  resolve_contract_id,
} from "../_shared/env.js";
import { chess_game_set_is_agent_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_set_is_agent.ts [--is-agent] [--contract-id <id>]";
const args = parse_args();
require_signer(usage);
const is_agent = args["is-agent"] === true;
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `set_is_agent ${is_agent} @ ${contract_id}`,
  await chess_game_set_is_agent_fun_json(near_kit_env, contract_id, is_agent),
);
// =================================================
// copyright 2026 by sleet.near
