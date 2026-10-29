// =================================================
// bin/wrap_near/wrap_near_deposit.ts
//
// Call: wraps NEAR into wNEAR (NEP-141).
//
// usage:
//   bun run bin/wrap_near/wrap_near_deposit.ts --amount "2 NEAR" [--contract-id <id>]
// =================================================
import { parse_args, require_amount } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  require_signer,
  resolve_contract_id,
  wrap_near_contractid,
} from "../_shared/env.js";
import { wrap_near_deposit_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  'bun run bin/wrap_near/wrap_near_deposit.ts --amount "2 NEAR" [--contract-id <id>]';
const args = parse_args();
const amount = require_amount(args, "amount", usage);
require_signer(usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  wrap_near_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `near_deposit ${amount} @ ${contract_id}`,
  await wrap_near_deposit_fun_json(near_kit_env, contract_id, amount),
);
// =================================================
// copyright 2026 by sleet.near
