// =================================================
// View: lists an account's DCL v2 LP positions.
//
// usage:
//   bun run bin/rhea_dclv2/rhea_list_liquidities.ts --account-id <id> [--from-index 0] [--limit 100] [--contract-id <id>]
// =================================================
import { optionalNumber, parseArgs, requireString } from "../_shared/args.js";
import {
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
  rhea_dclv2_contractid,
} from "../_shared/env.js";
import { rhea_dclv2_list_liquidities_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_dclv2/rhea_list_liquidities.ts --account-id <id> [--from-index 0] [--limit 100] [--contract-id <id>]";
const args = parseArgs();
const accountId = requireString(args, "account-id", usage);
const fromIndex = optionalNumber(args, "from-index", 0);
const limit = optionalNumber(args, "limit", 100);
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_dclv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
logResult(
  `list_liquidities ${accountId} @ ${contractId}`,
  await rhea_dclv2_list_liquidities_fun_json(
    near_kit_env,
    contractId,
    accountId,
    fromIndex,
    limit,
  ),
);
// =================================================
// copyright 2026 by sleet.near
