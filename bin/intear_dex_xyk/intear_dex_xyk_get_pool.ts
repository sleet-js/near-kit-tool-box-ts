// =================================================
// bin/intear_dex_xyk/intear_dex_xyk_get_pool.ts
//
// View: reads one pool of the INTEAR DEX xyk sub-dex.
//
// usage:
//   bun run bin/intear_dex_xyk/intear_dex_xyk_get_pool.ts --pool-id <id> [--dex-id <deployer/id>] [--contract-id <id>]
// =================================================
import { parse_args, require_number } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  intear_dex_xyk_dex_id,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import { intear_dex_xyk_get_pool_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_xyk/intear_dex_xyk_get_pool.ts --pool-id <id> [--dex-id <deployer/id>] [--contract-id <id>]";
const args = parse_args();
const pool_id = require_number(args, "pool-id", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
const dex_id = resolve_contract_id(
  typeof args["dex-id"] === "string" ? args["dex-id"] : undefined,
  intear_dex_xyk_dex_id(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `xyk pool ${pool_id} @ ${dex_id}`,
  await intear_dex_xyk_get_pool_fun_json(
    near_kit_env,
    contract_id,
    dex_id,
    pool_id,
  ),
);
// =================================================
// copyright 2026 by sleet.near
