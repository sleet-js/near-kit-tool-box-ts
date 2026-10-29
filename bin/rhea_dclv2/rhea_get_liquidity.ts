// =================================================
// View: reads one DCL v2 LP position.
//
// usage:
//   bun run bin/rhea_dclv2/rhea_get_liquidity.ts --lpt-id <id> [--contract-id <id>]
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
  rhea_dclv2_contractid,
} from "../_shared/env.js";
import { rhea_dclv2_get_liquidity_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_dclv2/rhea_get_liquidity.ts --lpt-id <id> [--contract-id <id>]";
const args = parse_args();
const lpt_id = require_string(args, "lpt-id", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_dclv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `get_liquidity ${lpt_id} @ ${contract_id}`,
  await rhea_dclv2_get_liquidity_fun_json(near_kit_env, contract_id, lpt_id),
);
// =================================================
// copyright 2026 by sleet.near
