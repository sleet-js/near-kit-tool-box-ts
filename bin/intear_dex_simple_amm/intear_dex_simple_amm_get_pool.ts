// =================================================
// bin/intear_dex_simple_amm/intear_dex_simple_amm_get_pool.ts
//
// View: reads one pool of the INTEAR DEX simple-amm sub-dex.
//
// usage:
//   bun run bin/intear_dex_simple_amm/intear_dex_simple_amm_get_pool.ts \
//     --pool-id <id> --dex-id <deployer/id> [--contract-id <id>]
// =================================================
import { parseArgs, requireNumber, requireString } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
} from "../_shared/env.js";
import { intear_dex_simple_amm_get_pool_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_simple_amm/intear_dex_simple_amm_get_pool.ts --pool-id <id> --dex-id <deployer/id> [--contract-id <id>]";
const args = parseArgs();
const poolId = requireNumber(args, "pool-id", usage);
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
// The simple-amm dex is not deployed on mainnet — pass its dex id
// explicitly.
const dexId = requireString(args, "dex-id", usage);
// =================================================
logResult(
  `simple-amm pool ${poolId} @ ${dexId}`,
  await intear_dex_simple_amm_get_pool_fun_json(
    near_kit_env,
    contractId,
    dexId,
    poolId,
  ),
);
// =================================================
// copyright 2026 by sleet.near
