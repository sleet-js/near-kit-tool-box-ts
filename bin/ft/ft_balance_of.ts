// =================================================
// bin/ft/ft_balance_of.ts
//
// View (NEP-145): reads the token balance of an account.
//
// usage:
//   bun run bin/ft/ft_balance_of.ts --contract-id <id> --account-id <id>
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import { log_result, near_kit_env } from "../_shared/env.js";
import { ft_balance_of_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/ft/ft_balance_of.ts --contract-id <id> --account-id <id>";
const args = parse_args();
const contract_id = require_string(args, "contract-id", usage);
const account_id = require_string(args, "account-id", usage);
// =================================================
log_result(
  `ft_balance_of @ ${contract_id}`,
  await ft_balance_of_fun_json(near_kit_env, contract_id, account_id),
);
// =================================================
// copyright 2026 by sleet.near
