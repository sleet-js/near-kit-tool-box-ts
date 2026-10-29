// =================================================
// bin/near/near_delete_key.ts
//
// Local action: deletes an access key from the signer account.
//
// usage:
//   bun run bin/near/near_delete_key.ts --signer-id <id> --public-key <ed25519:...>
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, require_signer } from "../_shared/env.js";
import { near_delete_key_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/near/near_delete_key.ts --signer-id <id> --public-key <ed25519:...>";
const args = parse_args();
const signer_id = require_string(args, "signer-id", usage);
const public_key = require_string(args, "public-key", usage);
require_signer(usage);
// =================================================
log_result(
  `delete_key ${public_key} on ${signer_id}`,
  await near_delete_key_fun_json(near_kit_env, signer_id, public_key),
);
// =================================================
// copyright 2026 by sleet.near
