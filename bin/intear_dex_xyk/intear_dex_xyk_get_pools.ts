// =================================================
// bin/intear_dex_xyk/intear_dex_xyk_get_pools.ts
//
// View: reads a page of pools of the INTEAR DEX xyk sub-dex.
//
// usage:
//   bun run bin/intear_dex_xyk/intear_dex_xyk_get_pools.ts [--start-index <n>] [--limit <n>] [--dex-id <deployer/id>] [--contract-id <id>]
// =================================================
import { optional_number, parse_args } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  intear_dex_xyk_dex_id,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import { intear_dex_xyk_get_pools_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const args = parse_args();
const start_index = optional_number(args, "start-index", 0);
const limit = optional_number(args, "limit", 10);
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
  `xyk pools ${start_index}..${start_index + limit} @ ${dex_id}`,
  await intear_dex_xyk_get_pools_fun_json(
    near_kit_env,
    contract_id,
    dex_id,
    start_index,
    limit,
  ),
);
// =================================================
// copyright 2026 by sleet.near
