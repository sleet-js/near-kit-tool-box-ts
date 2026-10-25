// =================================================
// View: reads DCL v2 contract metadata.
//
// usage:
//   bun run bin/rhea_dclv2/rhea_get_metadata.ts [--contract-id <id>]
// =================================================
import { parseArgs } from "../_shared/args.js";
import {
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
  rhea_dclv2_contractid,
} from "../_shared/env.js";
import { rhea_dclv2_get_metadata_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const args = parseArgs();
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_dclv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
logResult(
  `get_metadata @ ${contractId}`,
  await rhea_dclv2_get_metadata_fun_json(near_kit_env, contractId),
);
// =================================================
// copyright 2026 by sleet.near
