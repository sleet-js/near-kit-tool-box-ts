// =================================================
// bin/intear_dex_otc/intear_dex_otc_storage_balance_of.ts
//
// View: reads the NEAR storage deposit an account has with the
// INTEAR DEX otc sub-dex.
//
// usage:
//   bun run bin/intear_dex_otc/intear_dex_otc_storage_balance_of.ts \
//     --account-id <id> --dex-id <deployer/id> [--contract-id <id>]
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import { intear_dex_otc_storage_balance_of_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_otc/intear_dex_otc_storage_balance_of.ts --account-id <id> --dex-id <deployer/id> [--contract-id <id>]";
const args = parse_args();
const account_id = require_string(args, "account-id", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
// The otc dex is not deployed on mainnet — pass its dex id explicitly.
const dex_id = require_string(args, "dex-id", usage);
// =================================================
log_result(
  `otc storage balance of ${account_id} @ ${dex_id}`,
  await intear_dex_otc_storage_balance_of_fun_json(
    near_kit_env,
    contract_id,
    dex_id,
    account_id,
  ),
);
// =================================================
// copyright 2026 by sleet.near
