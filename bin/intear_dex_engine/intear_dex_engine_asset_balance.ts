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
import { parse_args, require_string } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import {
  intear_dex_engine_asset_balance_of_fun_json,
  intear_dex_account_or_dex_id,
  type INTEAR_DEX_ASSET_ID_STRING,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_engine/intear_dex_engine_asset_balance.ts --asset-id <id> (--account-id <id> | --dex-id <deployer/id>) [--contract-id <id>]";
const args = parse_args();
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
const asset_id = require_string(
  args,
  "asset-id",
  usage,
) as INTEAR_DEX_ASSET_ID_STRING;

const account_id =
  typeof args["account-id"] === "string" ? args["account-id"] : null;
const dex_id = typeof args["dex-id"] === "string" ? args["dex-id"] : null;
if (account_id === null && dex_id === null) {
  require_string(args, "account-id", usage);
}
const of = intear_dex_account_or_dex_id((account_id ?? dex_id) as string);
// =================================================
log_result(
  `asset balance of ${asset_id} @ ${contract_id}`,
  await intear_dex_engine_asset_balance_of_fun_json(
    near_kit_env,
    contract_id,
    of,
    asset_id,
  ),
);
// =================================================
// copyright 2026 by sleet.near
