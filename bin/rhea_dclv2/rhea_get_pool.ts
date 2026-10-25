// =================================================
// View: reads one DCL v2 pool descriptor.
//
// usage:
//   bun run bin/rhea_dclv2/rhea_get_pool.ts --pool-id <token-x|token-y|fee> [--contract-id <id>]
// =================================================
import { parseArgs, requireString } from "../_shared/args.js";
import {
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
  rhea_dclv2_contractid,
} from "../_shared/env.js";
import { rhea_dclv2_get_pool_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_dclv2/rhea_get_pool.ts --pool-id <token-x|token-y|fee> [--contract-id <id>]";
const args = parseArgs();
const poolId = requireString(args, "pool-id", usage);
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_dclv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
logResult(
  `get_pool ${poolId} @ ${contractId}`,
  await rhea_dclv2_get_pool_fun_json(near_kit_env, contractId, poolId),
);
// =================================================
// copyright 2026 by sleet.near
