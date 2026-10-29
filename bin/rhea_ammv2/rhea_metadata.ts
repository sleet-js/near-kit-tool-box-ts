// =================================================
// View: reads AMM contract metadata.
//
// usage:
//   bun run bin/rhea_ammv2/rhea_metadata.ts [--contract-id <id>]
// =================================================
import { parse_args } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
  rhea_ammv2_contractid,
} from "../_shared/env.js";
import { rhea_ammv2_metadata_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const args = parse_args();
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_ammv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `metadata @ ${contract_id}`,
  await rhea_ammv2_metadata_fun_json(near_kit_env, contract_id),
);
// =================================================
// copyright 2026 by sleet.near
