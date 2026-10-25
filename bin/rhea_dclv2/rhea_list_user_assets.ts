// =================================================
// View: lists all internal DCL v2 token balances for an account.
//
// usage:
//   bun run bin/rhea_dclv2/rhea_list_user_assets.ts --account-id <id> [--contract-id <id>]
// =================================================
import { parseArgs, requireString } from "../_shared/args.js";
import {
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
  rhea_dclv2_contractid,
} from "../_shared/env.js";
import { rhea_dclv2_list_user_assets_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_dclv2/rhea_list_user_assets.ts --account-id <id> [--contract-id <id>]";
const args = parseArgs();
const accountId = requireString(args, "account-id", usage);
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_dclv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
logResult(
  `list_user_assets ${accountId} @ ${contractId}`,
  await rhea_dclv2_list_user_assets_fun_json(
    near_kit_env,
    contractId,
    accountId,
  ),
);
// =================================================
// copyright 2026 by sleet.near
