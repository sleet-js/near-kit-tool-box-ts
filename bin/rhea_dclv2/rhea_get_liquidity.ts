// =================================================
// View: reads one DCL v2 LP position.
//
// usage:
//   bun run bin/rhea_dclv2/rhea_get_liquidity.ts --lpt-id <id> [--contract-id <id>]
// =================================================
import { parseArgs, requireString } from "../_shared/args.js";
import {
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
  rhea_dclv2_contractid,
} from "../_shared/env.js";
import { rhea_dclv2_get_liquidity_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_dclv2/rhea_get_liquidity.ts --lpt-id <id> [--contract-id <id>]";
const args = parseArgs();
const lptId = requireString(args, "lpt-id", usage);
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_dclv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
logResult(
  `get_liquidity ${lptId} @ ${contractId}`,
  await rhea_dclv2_get_liquidity_fun_json(near_kit_env, contractId, lptId),
);
// =================================================
// copyright 2026 by sleet.near
