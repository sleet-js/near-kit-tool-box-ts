// =================================================
// bin/near/near_delete_account.ts
//
// Local action: deletes the signer account, sending the remaining
// balance to `beneficiary`.
//
// usage:
//   bun run bin/near/near_delete_account.ts --signer-id <id> --beneficiary <id>
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, require_signer } from "../_shared/env.js";
import { near_delete_account_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/near/near_delete_account.ts --signer-id <id> --beneficiary <id>";
const args = parse_args();
const signer_id = require_string(args, "signer-id", usage);
const beneficiary = require_string(args, "beneficiary", usage);
require_signer(usage);
// =================================================
log_result(
  `delete_account ${signer_id} -> ${beneficiary}`,
  await near_delete_account_fun_json(near_kit_env, signer_id, beneficiary),
);
// =================================================
// copyright 2026 by sleet.near
