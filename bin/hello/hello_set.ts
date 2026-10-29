// =================================================
// bin/hello/hello_set.ts
//
// Call: sets the greeting on the greeting contract.
//
// usage:
//   bun run bin/hello/hello_set.ts --greeting "Hello NEAR" [--contract-id <id>]
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import {
  greeting_contractid,
  log_result,
  NEAR_KIT_NETWORK,
  near_kit_env,
  require_signer,
  resolve_contract_id,
} from "../_shared/env.js";
import { greeting_set_greeting_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  'bun run bin/hello/hello_set.ts --greeting "Hello NEAR" [--contract-id <id>]';
const args = parse_args();
const greeting = require_string(args, "greeting", usage);
require_signer(usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  greeting_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `set_greeting @ ${contract_id} (${NEAR_KIT_NETWORK})`,
  await greeting_set_greeting_fun_json(near_kit_env, contract_id, greeting),
);
// =================================================
// copyright 2026 by sleet.near
