// =================================================
// View: lists DCL v2 pools.
//
// usage:
//   bun run bin/rhea_dclv2/rhea_list_pools.ts [--from-index 0] [--limit 10] [--contract-id <id>]
// =================================================
import { optionalNumber, parseArgs } from "../_shared/args.js";
import {
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
  rhea_dclv2_contractid,
} from "../_shared/env.js";
import { rhea_dclv2_list_pools_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const args = parseArgs();
const fromIndex = optionalNumber(args, "from-index", 0);
const limit = optionalNumber(args, "limit", 10);
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_dclv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
logResult(
  `list_pools ${fromIndex}..${fromIndex + limit} @ ${contractId}`,
  await rhea_dclv2_list_pools_fun_json(
    near_kit_env,
    contractId,
    fromIndex,
    limit,
  ),
);
// =================================================
// copyright 2026 by sleet.near
