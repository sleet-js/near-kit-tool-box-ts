// =================================================
// bin/rhea_ammv2/rhea_get_pools.ts
//
// View: reads a paginated list of pool descriptors.
//
// usage:
//   bun run bin/rhea_ammv2/rhea_get_pools.ts [--from-index <n>] [--limit <n>] [--contract-id <id>]
// =================================================
import { optional_number, parse_args } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  rhea_ammv2_contractid,
  resolve_contract_id,
} from "../_shared/env.js";
import { rhea_ammv2_get_pools_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const args = parse_args();
const from_index = optional_number(args, "from-index", 0);
const limit = optional_number(args, "limit", 10);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_ammv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `get_pools ${from_index}..${from_index + limit} @ ${contract_id}`,
  await rhea_ammv2_get_pools_fun_json(
    near_kit_env,
    contract_id,
    from_index,
    limit,
  ),
);
// =================================================
// copyright 2026 by sleet.near
