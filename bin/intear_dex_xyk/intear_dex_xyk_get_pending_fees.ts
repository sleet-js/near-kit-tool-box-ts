// =================================================
// bin/intear_dex_xyk/intear_dex_xyk_get_pending_fees.ts
//
// View: reads the fees an account has collected but not withdrawn yet
// in the INTEAR DEX xyk sub-dex.
//
// Pass the asset ids as a comma separated list, in the INTEAR DEX
// asset id form (`near`, `nep141:<contract_id>`, ...).
//
// usage:
//   bun run bin/intear_dex_xyk/intear_dex_xyk_get_pending_fees.ts \
//     --account-id <id> --asset-ids <id,id,...> [--dex-id <deployer/id>] [--contract-id <id>]
// =================================================
import { parseArgs, requireList, requireString } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  intear_dex_xyk_dex_id,
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
} from "../_shared/env.js";
import {
  intear_dex_xyk_get_pending_fees_fun_json,
  type INTEAR_DEX_ASSET_ID_STRING,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_xyk/intear_dex_xyk_get_pending_fees.ts --account-id <id> --asset-ids <id,id,...> [--dex-id <deployer/id>] [--contract-id <id>]";
const args = parseArgs();
const accountId = requireString(args, "account-id", usage);
const assetIds = requireList(
  args,
  "asset-ids",
  usage,
) as INTEAR_DEX_ASSET_ID_STRING[];
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
const dexId = resolveContractId(
  typeof args["dex-id"] === "string" ? args["dex-id"] : undefined,
  intear_dex_xyk_dex_id(NEAR_KIT_NETWORK),
);
// =================================================
logResult(
  `xyk pending fees of ${accountId} @ ${dexId}`,
  await intear_dex_xyk_get_pending_fees_fun_json(
    near_kit_env,
    contractId,
    dexId,
    accountId,
    assetIds,
  ),
);
// =================================================
// copyright 2026 by sleet.near
