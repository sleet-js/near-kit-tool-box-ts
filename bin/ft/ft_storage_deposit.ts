// =================================================
// bin/ft/ft_storage_deposit.ts
//
// Call (NEP-145): pays the standard storage deposit to register the
// signer's storage on the token contract.
//
// usage:
//   bun run bin/ft/ft_storage_deposit.ts --contract-id <id>
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, require_signer } from "../_shared/env.js";
import { ft_storage_deposit_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage = "bun run bin/ft/ft_storage_deposit.ts --contract-id <id>";
const args = parse_args();
const contract_id = require_string(args, "contract-id", usage);
require_signer(usage);
// =================================================
log_result(
  `storage_deposit @ ${contract_id}`,
  await ft_storage_deposit_fun_json(near_kit_env, contract_id),
);
// =================================================
// copyright 2026 by sleet.near
