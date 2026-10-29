// =================================================
// bin/pool/pool_ping.ts
//
// Call: pings the staking pool contract (no-op method, useful for
// checking connectivity).
//
// usage:
//   bun run bin/pool/pool_ping.ts --contract-id <pool_id>
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, require_signer } from "../_shared/env.js";
import { pool_ping_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage = "bun run bin/pool/pool_ping.ts --contract-id <pool_id>";
const args = parse_args();
const contract_id = require_string(args, "contract-id", usage);
require_signer(usage);
// =================================================
log_result(
  `ping @ ${contract_id}`,
  await pool_ping_fun_json(near_kit_env, contract_id),
);
// =================================================
// copyright 2026 by sleet.near
