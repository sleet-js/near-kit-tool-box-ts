// =================================================
// bin/pumpopoly_world/pumpopoly_world_move_player.ts
//
// Call: moves the signer one step on the pumpopoly world map.
//
// usage:
//   bun run bin/pumpopoly_world/pumpopoly_world_move_player.ts [--contract-id <id>]
// =================================================
import { parse_args } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  pumpopoly_world_contractid,
  require_signer,
  resolve_contract_id,
} from "../_shared/env.js";
import { pumpopoly_world_move_player_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/pumpopoly_world/pumpopoly_world_move_player.ts [--contract-id <id>]";
const args = parse_args();
require_signer(usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  pumpopoly_world_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `move_player @ ${contract_id} (${NEAR_KIT_NETWORK})`,
  await pumpopoly_world_move_player_fun_json(near_kit_env, contract_id),
);
// =================================================
// copyright 2026 by sleet.near
