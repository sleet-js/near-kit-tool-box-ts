// =================================================
// bin/wrap_near/wrap_near_withdraw.ts
//
// Call: unwraps wNEAR back into NEAR.
//
// usage:
//   bun run bin/wrap_near/wrap_near_withdraw.ts --amount <raw> [--contract-id <id>]
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  require_signer,
  resolve_contract_id,
  wrap_near_contractid,
} from "../_shared/env.js";
import { wrap_near_withdraw_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/wrap_near/wrap_near_withdraw.ts --amount <raw> [--contract-id <id>]";
const args = parse_args();
const amount = require_string(args, "amount", usage);
require_signer(usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  wrap_near_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `near_withdraw ${amount} @ ${contract_id}`,
  await wrap_near_withdraw_fun_json(near_kit_env, contract_id, amount),
);
// =================================================
// copyright 2026 by sleet.near
