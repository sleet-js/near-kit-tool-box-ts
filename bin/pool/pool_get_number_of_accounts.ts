// =================================================
// bin/pool/pool_get_number_of_accounts.ts
//
// View: reads the total number of staking accounts on a staking pool.
//
// usage:
//   bun run bin/pool/pool_get_number_of_accounts.ts --contract-id <pool_id>
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import { log_result, near_kit_env } from "../_shared/env.js";
import { pool_get_number_of_accounts_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/pool/pool_get_number_of_accounts.ts --contract-id <pool_id>";
const args = parse_args();
const contract_id = require_string(args, "contract-id", usage);
// =================================================
log_result(
  `get_number_of_accounts @ ${contract_id}`,
  await pool_get_number_of_accounts_fun_json(near_kit_env, contract_id),
);
// =================================================
// copyright 2026 by sleet.near
