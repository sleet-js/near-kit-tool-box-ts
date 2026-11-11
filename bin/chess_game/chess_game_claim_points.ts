// =================================================
// bin/chess_game/chess_game_claim_points.ts
//
// Call: claims the pending ppp points of the signer.
//
// usage:
//   bun run bin/chess_game/chess_game_claim_points.ts [--contract-id <id>]
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
import { chess_game_claim_points_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_claim_points.ts [--contract-id <id>]";
const args = parse_args();
require_signer(usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `claim_points @ ${contract_id}`,
  await chess_game_claim_points_fun_json(near_kit_env, contract_id),
);
// =================================================
// copyright 2026 by sleet.near
