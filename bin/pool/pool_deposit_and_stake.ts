// =================================================
// bin/pool/pool_deposit_and_stake.ts
//
// Call: deposits the signer's balance into the staking pool and stakes
// it in the same transaction.
//
// usage:
//   bun run bin/pool/pool_deposit_and_stake.ts --contract-id <pool_id> --deposit "5 NEAR"
// =================================================
import { parse_args, require_amount, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, require_signer } from "../_shared/env.js";
import { pool_deposit_and_stake_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  'bun run bin/pool/pool_deposit_and_stake.ts --contract-id <pool_id> --deposit "5 NEAR"';
const args = parse_args();
const contract_id = require_string(args, "contract-id", usage);
const deposit = require_amount(args, "deposit", usage);
require_signer(usage);
// =================================================
log_result(
  `deposit_and_stake ${deposit} @ ${contract_id}`,
  await pool_deposit_and_stake_fun_json(near_kit_env, contract_id, deposit),
);
// =================================================
// copyright 2026 by sleet.near
