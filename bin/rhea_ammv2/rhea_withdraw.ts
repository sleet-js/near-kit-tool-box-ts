// =================================================
// bin/rhea_ammv2/rhea_withdraw.ts
//
// Call: withdraws `amount` of `token-id` from the signer's deposited
// balance on the AMM.
//
// usage:
//   bun run bin/rhea_ammv2/rhea_withdraw.ts --amount <raw> --token-id <id> [--contract-id <id>]
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  rhea_ammv2_contractid,
  require_signer,
  resolve_contract_id,
} from "../_shared/env.js";
import { rhea_ammv2_withdraw_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_ammv2/rhea_withdraw.ts --amount <raw> --token-id <id> [--contract-id <id>]";
const args = parse_args();
const amount = require_string(args, "amount", usage);
const token_id = require_string(args, "token-id", usage);
require_signer(usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_ammv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `withdraw ${amount} ${token_id} @ ${contract_id}`,
  await rhea_ammv2_withdraw_fun_json(
    near_kit_env,
    contract_id,
    amount,
    token_id,
  ),
);
// =================================================
// copyright 2026 by sleet.near
