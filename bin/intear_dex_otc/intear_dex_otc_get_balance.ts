// =================================================
// bin/intear_dex_otc/intear_dex_otc_get_balance.ts
//
// View: reads the INTEAR DEX otc sub-dex's internal balance of one
// asset for one account.
//
// usage:
//   bun run bin/intear_dex_otc/intear_dex_otc_get_balance.ts \
//     --account-id <id> --asset-id <id> [--dex-id <deployer/id>] [--contract-id <id>]
// =================================================
import { parseArgs, requireString } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
} from "../_shared/env.js";
import {
  intear_dex_otc_get_balance_fun_json,
  type INTEAR_DEX_ASSET_ID_STRING,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_otc/intear_dex_otc_get_balance.ts --account-id <id> --asset-id <id> [--dex-id <deployer/id>] [--contract-id <id>]";
const args = parseArgs();
const accountId = requireString(args, "account-id", usage);
const assetId = requireString(
  args,
  "asset-id",
  usage,
) as INTEAR_DEX_ASSET_ID_STRING;
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
// The otc dex is not deployed on mainnet — pass its dex id explicitly.
const dexId = requireString(args, "dex-id", usage);
// =================================================
logResult(
  `otc balance of ${assetId} for ${accountId} @ ${dexId}`,
  await intear_dex_otc_get_balance_fun_json(
    near_kit_env,
    contractId,
    dexId,
    accountId,
    assetId,
  ),
);
// =================================================
// copyright 2026 by sleet.near
