// =================================================
// bin/pool/pool_get_accounts.ts
//
// View: reads a paginated list of staking accounts on a staking pool.
//
// usage:
//   bun run bin/pool/pool_get_accounts.ts --contract-id <pool_id> [--from-index <n>] [--limit <n>]
// =================================================
import {
  optional_number,
  parse_args,
  require_string,
} from "../_shared/args.js";
import { log_result, near_kit_env } from "../_shared/env.js";
import { pool_get_accounts_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/pool/pool_get_accounts.ts --contract-id <pool_id> [--from-index <n>] [--limit <n>]";
const args = parse_args();
const contract_id = require_string(args, "contract-id", usage);
const from_index = optional_number(args, "from-index", 0);
const limit = optional_number(args, "limit", 10);
// =================================================
log_result(
  `get_accounts ${from_index}..${from_index + limit} @ ${contract_id}`,
  await pool_get_accounts_fun_json(
    near_kit_env,
    contract_id,
    from_index,
    limit,
  ),
);
// =================================================
// copyright 2026 by sleet.near
