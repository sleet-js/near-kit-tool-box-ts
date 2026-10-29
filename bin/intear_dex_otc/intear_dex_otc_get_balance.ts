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
import { parse_args, require_string } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import {
  intear_dex_otc_get_balance_fun_json,
  type INTEAR_DEX_ASSET_ID_STRING,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_otc/intear_dex_otc_get_balance.ts --account-id <id> --asset-id <id> [--dex-id <deployer/id>] [--contract-id <id>]";
const args = parse_args();
const account_id = require_string(args, "account-id", usage);
const asset_id = require_string(
  args,
  "asset-id",
  usage,
) as INTEAR_DEX_ASSET_ID_STRING;
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
// The otc dex is not deployed on mainnet — pass its dex id explicitly.
const dex_id = require_string(args, "dex-id", usage);
// =================================================
log_result(
  `otc balance of ${asset_id} for ${account_id} @ ${dex_id}`,
  await intear_dex_otc_get_balance_fun_json(
    near_kit_env,
    contract_id,
    dex_id,
    account_id,
    asset_id,
  ),
);
// =================================================
// copyright 2026 by sleet.near
