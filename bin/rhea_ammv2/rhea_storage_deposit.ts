// =================================================
// bin/rhea_ammv2/rhea_storage_deposit.ts
//
// Call: pays the storage deposit to register the signer's storage on
// the AMM contract.
//
// usage:
//   bun run bin/rhea_ammv2/rhea_storage_deposit.ts --deposit "0.00125 NEAR" [--contract-id <id>]
// =================================================
import { parse_args, require_amount } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  rhea_ammv2_contractid,
  require_signer,
  resolve_contract_id,
} from "../_shared/env.js";
import { rhea_ammv2_storage_deposit_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  'bun run bin/rhea_ammv2/rhea_storage_deposit.ts --deposit "0.00125 NEAR" [--contract-id <id>]';
const args = parse_args();
const deposit = require_amount(args, "deposit", usage);
require_signer(usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_ammv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `storage_deposit @ ${contract_id}`,
  await rhea_ammv2_storage_deposit_fun_json(near_kit_env, contract_id, deposit),
);
// =================================================
// copyright 2026 by sleet.near
