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
import { parse_args, require_string } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
  rhea_ammv2_contractid,
} from "../_shared/env.js";
import { rhea_ammv2_get_pool_shares_batch_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_ammv2/rhea_get_pool_shares_batch.ts --pool-ids <id,id,id> --account-id <id> [--contract-id <id>]";
const args = parse_args();
const account_id = require_string(args, "account-id", usage);
const pool_ids = require_string(args, "pool-ids", usage)
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
if (pool_ids.length === 0) {
  throw new Error("--pool-ids must hold at least one pool id");
}
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_ammv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `get_pool_shares_batch [${pool_ids.join(",")}] ${account_id} @ ${contract_id}`,
  await rhea_ammv2_get_pool_shares_batch_fun_json(
    near_kit_env,
    contract_id,
    pool_ids,
    account_id,
  ),
);
// =================================================
// copyright 2026 by sleet.near
