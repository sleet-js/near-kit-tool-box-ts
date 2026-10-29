// =================================================
// bin/hello/hello_get.ts
//
// View: reads the greeting stored on the greeting contract.
//
// usage:
//   bun run bin/hello/hello_get.ts [--contract-id <id>]
// =================================================
import { parse_args } from "../_shared/args.js";
import {
  greeting_contractid,
  log_result,
  NEAR_KIT_NETWORK,
  near_kit_env,
  resolve_contract_id,
} from "../_shared/env.js";
import { greeting_get_greeting_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const args = parse_args();
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  greeting_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `get_greeting @ ${contract_id} (${NEAR_KIT_NETWORK})`,
  await greeting_get_greeting_fun_json(near_kit_env, contract_id),
);
// =================================================
// copyright 2026 by sleet.near
