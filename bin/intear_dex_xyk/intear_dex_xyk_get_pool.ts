// =================================================
// bin/intear_dex_xyk/intear_dex_xyk_get_pool.ts
//
// View: reads one pool of the INTEAR DEX xyk sub-dex.
//
// usage:
//   bun run bin/intear_dex_xyk/intear_dex_xyk_get_pool.ts --pool-id <id> [--dex-id <deployer/id>] [--contract-id <id>]
// =================================================
import { parseArgs, requireNumber } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  intear_dex_xyk_dex_id,
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
} from "../_shared/env.js";
import { intear_dex_xyk_get_pool_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_xyk/intear_dex_xyk_get_pool.ts --pool-id <id> [--dex-id <deployer/id>] [--contract-id <id>]";
const args = parseArgs();
const poolId = requireNumber(args, "pool-id", usage);
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
const dexId = resolveContractId(
  typeof args["dex-id"] === "string" ? args["dex-id"] : undefined,
  intear_dex_xyk_dex_id(NEAR_KIT_NETWORK),
);
// =================================================
logResult(
  `xyk pool ${poolId} @ ${dexId}`,
  await intear_dex_xyk_get_pool_fun_json(
    near_kit_env,
    contractId,
    dexId,
    poolId,
  ),
);
// =================================================
// copyright 2026 by sleet.near
