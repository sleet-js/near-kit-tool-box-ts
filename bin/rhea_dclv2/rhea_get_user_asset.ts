// =================================================
// View: reads one account's internal DCL v2 token balance.
//
// usage:
//   bun run bin/rhea_dclv2/rhea_get_user_asset.ts --account-id <id> --token-id <id> [--contract-id <id>]
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
  rhea_dclv2_contractid,
} from "../_shared/env.js";
import { rhea_dclv2_get_user_asset_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_dclv2/rhea_get_user_asset.ts --account-id <id> --token-id <id> [--contract-id <id>]";
const args = parse_args();
const account_id = require_string(args, "account-id", usage);
const token_id = require_string(args, "token-id", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_dclv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `get_user_asset ${account_id} ${token_id} @ ${contract_id}`,
  await rhea_dclv2_get_user_asset_fun_json(
    near_kit_env,
    contract_id,
    account_id,
    token_id,
  ),
);
// =================================================
// copyright 2026 by sleet.near
