// =================================================
// View: reads one internal token balance for an account.
//
// usage:
//   bun run bin/rhea_ammv2/rhea_get_deposit.ts --account-id <id> --token-id <id> [--contract-id <id>]
// =================================================
import { parseArgs, requireString } from "../_shared/args.js";
import {
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
  rhea_ammv2_contractid,
} from "../_shared/env.js";
import { rhea_ammv2_get_deposit_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_ammv2/rhea_get_deposit.ts --account-id <id> --token-id <id> [--contract-id <id>]";
const args = parseArgs();
const accountId = requireString(args, "account-id", usage);
const tokenId = requireString(args, "token-id", usage);
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_ammv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
logResult(
  `get_deposit ${accountId} ${tokenId} @ ${contractId}`,
  await rhea_ammv2_get_deposit_fun_json(
    near_kit_env,
    contractId,
    accountId,
    tokenId,
  ),
);
// =================================================
// copyright 2026 by sleet.near
