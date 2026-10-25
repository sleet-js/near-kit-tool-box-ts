// =================================================
// bin/intear_dex_xyk/intear_dex_xyk_get_pool_shares.ts
//
// View: reads the LP shares an account holds in the INTEAR DEX xyk
// sub-dex's pools.
//
// Pass the pool ids as a comma separated list.
//
// usage:
//   bun run bin/intear_dex_xyk/intear_dex_xyk_get_pool_shares.ts \
//     --account-id <id> [--pool-ids <id,id,...>] [--dex-id <deployer/id>] [--contract-id <id>]
// =================================================
import { parseArgs, requireList, requireString } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  intear_dex_xyk_dex_id,
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
} from "../_shared/env.js";
import { intear_dex_xyk_get_pool_shares_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_xyk/intear_dex_xyk_get_pool_shares.ts --account-id <id> [--pool-ids <id,id,...>] [--dex-id <deployer/id>] [--contract-id <id>]";
const args = parseArgs();
const accountId = requireString(args, "account-id", usage);
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
const dexId = resolveContractId(
  typeof args["dex-id"] === "string" ? args["dex-id"] : undefined,
  intear_dex_xyk_dex_id(NEAR_KIT_NETWORK),
);
// `--pool-ids` is optional; without it the first pool is read.
const poolIds = (
  typeof args["pool-ids"] === "string"
    ? requireList(args, "pool-ids", usage)
    : ["0"]
).map((value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`--pool-ids must hold pool ids (got "${value}")`);
  }
  return parsed;
});
// =================================================
logResult(
  `xyk pool shares of ${accountId} @ ${dexId}`,
  await intear_dex_xyk_get_pool_shares_fun_json(
    near_kit_env,
    contractId,
    dexId,
    poolIds,
    accountId,
  ),
);
// =================================================
// copyright 2026 by sleet.near
