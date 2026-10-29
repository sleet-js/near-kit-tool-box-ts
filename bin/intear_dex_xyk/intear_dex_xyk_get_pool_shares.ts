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
import { parse_args, require_list, require_string } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  intear_dex_xyk_dex_id,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import { intear_dex_xyk_get_pool_shares_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_xyk/intear_dex_xyk_get_pool_shares.ts --account-id <id> [--pool-ids <id,id,...>] [--dex-id <deployer/id>] [--contract-id <id>]";
const args = parse_args();
const account_id = require_string(args, "account-id", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
const dex_id = resolve_contract_id(
  typeof args["dex-id"] === "string" ? args["dex-id"] : undefined,
  intear_dex_xyk_dex_id(NEAR_KIT_NETWORK),
);
// `--pool-ids` is optional; without it the first pool is read.
const pool_ids = (
  typeof args["pool-ids"] === "string"
    ? require_list(args, "pool-ids", usage)
    : ["0"]
).map((value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`--pool-ids must hold pool ids (got "${value}")`);
  }
  return parsed;
});
// =================================================
log_result(
  `xyk pool shares of ${account_id} @ ${dex_id}`,
  await intear_dex_xyk_get_pool_shares_fun_json(
    near_kit_env,
    contract_id,
    dex_id,
    pool_ids,
    account_id,
  ),
);
// =================================================
// copyright 2026 by sleet.near
