// =================================================
// bin/rhea_ammv2/rhea_get_number_of_pools.ts
//
// View: reads the total number of pools registered on the AMM.
//
// usage:
//   bun run bin/rhea_ammv2/rhea_get_number_of_pools.ts [--contract-id <id>]
// =================================================
import { parse_args } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  rhea_ammv2_contractid,
  resolve_contract_id,
} from "../_shared/env.js";
import { rhea_ammv2_get_number_of_pools_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const args = parse_args();
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_ammv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `get_number_of_pools @ ${contract_id} (${NEAR_KIT_NETWORK})`,
  await rhea_ammv2_get_number_of_pools_fun_json(near_kit_env, contract_id),
);
// =================================================
// copyright 2026 by sleet.near
