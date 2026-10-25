// =================================================
// View: reads an account's AMM registration information.
//
// usage:
//   bun run bin/rhea_ammv2/rhea_get_account_basic_info.ts --account-id <id> [--contract-id <id>]
// =================================================
import { parseArgs, requireString } from "../_shared/args.js";
import {
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
  rhea_ammv2_contractid,
} from "../_shared/env.js";
import { rhea_ammv2_get_account_basic_info_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_ammv2/rhea_get_account_basic_info.ts --account-id <id> [--contract-id <id>]";
const args = parseArgs();
const accountId = requireString(args, "account-id", usage);
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_ammv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
logResult(
  `get_account_basic_info ${accountId} @ ${contractId}`,
  await rhea_ammv2_get_account_basic_info_fun_json(
    near_kit_env,
    contractId,
    accountId,
  ),
);
// =================================================
// copyright 2026 by sleet.near
