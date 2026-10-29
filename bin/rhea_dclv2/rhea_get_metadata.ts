// =================================================
// View: reads DCL v2 contract metadata.
//
// usage:
//   bun run bin/rhea_dclv2/rhea_get_metadata.ts [--contract-id <id>]
// =================================================
import { parse_args } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
  rhea_dclv2_contractid,
} from "../_shared/env.js";
import { rhea_dclv2_get_metadata_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const args = parse_args();
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_dclv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `get_metadata @ ${contract_id}`,
  await rhea_dclv2_get_metadata_fun_json(near_kit_env, contract_id),
);
// =================================================
// copyright 2026 by sleet.near
