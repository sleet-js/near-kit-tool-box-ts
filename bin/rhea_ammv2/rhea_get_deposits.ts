// =================================================
// bin/rhea_ammv2/rhea_get_deposits.ts
//
// View: reads the per-token deposited balances of an account on the AMM.
//
// usage:
//   bun run bin/rhea_ammv2/rhea_get_deposits.ts --account-id <id> [--contract-id <id>]
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  rhea_ammv2_contractid,
  resolve_contract_id,
} from "../_shared/env.js";
import { rhea_ammv2_get_deposits_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_ammv2/rhea_get_deposits.ts --account-id <id> [--contract-id <id>]";
const args = parse_args();
const account_id = require_string(args, "account-id", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_ammv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `get_deposits ${account_id} @ ${contract_id}`,
  await rhea_ammv2_get_deposits_fun_json(near_kit_env, contract_id, account_id),
);
// =================================================
// copyright 2026 by sleet.near
