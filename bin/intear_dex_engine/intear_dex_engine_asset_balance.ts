// =================================================
// bin/intear_dex_engine/intear_dex_engine_asset_balance.ts
//
// View: reads one asset's inner balance of an account or a dex inside
// the INTEAR DEX engine.
//
// Pass `--account-id` for a user, or `--dex-id` for a sub-dex
// (`<deployer>/<id>`). Pass exactly one of them.
//
// The asset id is the INTEAR DEX form: `near`, `nep141:<contract_id>`,
// `nep245:<contract_id>:<token_id>` or `nep171:<contract_id>:<token_id>`.
//
// usage:
//   bun run bin/intear_dex_engine/intear_dex_engine_asset_balance.ts \
//     --asset-id <id> (--account-id <id> | --dex-id <deployer/id>) [--contract-id <id>]
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
  intear_dex_engine_asset_balance_of_fun_json,
  intearDexAccountOrDexId,
  type INTEAR_DEX_ASSET_ID_STRING,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_engine/intear_dex_engine_asset_balance.ts --asset-id <id> (--account-id <id> | --dex-id <deployer/id>) [--contract-id <id>]";
const args = parseArgs();
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
const assetId = requireString(
  args,
  "asset-id",
  usage,
) as INTEAR_DEX_ASSET_ID_STRING;

const accountId =
  typeof args["account-id"] === "string" ? args["account-id"] : null;
const dexId = typeof args["dex-id"] === "string" ? args["dex-id"] : null;
if (accountId === null && dexId === null) {
  requireString(args, "account-id", usage);
}
const of = intearDexAccountOrDexId((accountId ?? dexId) as string);
// =================================================
logResult(
  `asset balance of ${assetId} @ ${contractId}`,
  await intear_dex_engine_asset_balance_of_fun_json(
    near_kit_env,
    contractId,
    of,
    assetId,
  ),
);
// =================================================
// copyright 2026 by sleet.near
