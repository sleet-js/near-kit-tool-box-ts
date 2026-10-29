// =================================================
// bin/rhea_ammv2/rhea_get_return.ts
//
// View: quotes the output amount for swapping `amount_in` of `token_in`
// into `token_out` on a pool.
//
// usage:
//   bun run bin/rhea_ammv2/rhea_get_return.ts --pool-id <id> --token-in <id>
//     --amount-in <raw> --token-out <id> [--contract-id <id>]
// =================================================
import { parse_args, require_number, require_string } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  rhea_ammv2_contractid,
  resolve_contract_id,
} from "../_shared/env.js";
import { rhea_ammv2_get_return_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_ammv2/rhea_get_return.ts --pool-id <id> --token-in <id> --amount-in <raw> --token-out <id> [--contract-id <id>]";
const args = parse_args();
const pool_id = require_number(args, "pool-id", usage);
const token_in = require_string(args, "token-in", usage);
const amount_in = require_string(args, "amount-in", usage);
const token_out = require_string(args, "token-out", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_ammv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `get_return pool ${pool_id} @ ${contract_id}`,
  await rhea_ammv2_get_return_fun_json(
    near_kit_env,
    contract_id,
    pool_id,
    token_in,
    amount_in,
    token_out,
  ),
);
// =================================================
// copyright 2026 by sleet.near
