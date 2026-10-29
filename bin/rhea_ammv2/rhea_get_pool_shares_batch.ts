// =================================================
// View: reads an account's LP shares in several AMM pools at once.
//
// usage:
//   bun run bin/rhea_ammv2/rhea_get_pool_shares_batch.ts \
//     --pool-ids <id,id,id> --account-id <id> [--contract-id <id>]
//
// The batch is bounded by the rpc's view gas, not by the contract. A
// batch of about 5000 pool ids answers on mainnet today; a larger one
// fails with a wasm `GasLimitExceeded`. Split a large list into
// batches if it runs out of gas.
// =================================================
import { parseArgs, requireString } from "../_shared/args.js";
import {
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
  rhea_ammv2_contractid,
} from "../_shared/env.js";
import { rhea_ammv2_get_pool_shares_batch_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_ammv2/rhea_get_pool_shares_batch.ts --pool-ids <id,id,id> --account-id <id> [--contract-id <id>]";
const args = parseArgs();
const accountId = requireString(args, "account-id", usage);
const poolIds = requireString(args, "pool-ids", usage)
  .split(",")
  .map((part) => part.trim())
  .filter((part) => part.length > 0)
  .map((part) => {
    const parsed = Number(part);
    if (!Number.isInteger(parsed)) {
      throw new Error(
        `--pool-ids must be a comma-separated list of integers, got "${part}"`,
      );
    }
    return parsed;
  });
if (poolIds.length === 0) {
  throw new Error("--pool-ids must hold at least one pool id");
}
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_ammv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
logResult(
  `get_pool_shares_batch [${poolIds.join(",")}] ${accountId} @ ${contractId}`,
  await rhea_ammv2_get_pool_shares_batch_fun_json(
    near_kit_env,
    contractId,
    poolIds,
    accountId,
  ),
);
// =================================================
// copyright 2026 by sleet.near
