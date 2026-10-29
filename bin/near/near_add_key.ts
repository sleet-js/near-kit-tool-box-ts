// =================================================
// bin/near/near_add_key.ts
//
// Local action: appends an access key to the signer account.
//
// Two permission shapes are supported:
//   --permission full-access
//   --permission function-call --receiver-id <id> --method-names "a,b" [--allowance "1 NEAR"]
//
// usage:
//   bun run bin/near/near_add_key.ts --signer-id <id> --public-key <ed25519:...>
//     --permission <full-access|function-call> [--receiver-id <id>] [--method-names "a,b"] [--allowance "1 NEAR"]
// =================================================
import type { AMOUNT_INPUT } from "../../packages/fun/src/index.js";
import {
  parse_args,
  optional_string,
  require_amount,
  require_string,
} from "../_shared/args.js";
import { log_result, near_kit_env, require_signer } from "../_shared/env.js";
import { near_add_key_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  'bun run bin/near/near_add_key.ts --signer-id <id> --public-key <ed25519:...> --permission <full-access|function-call> [--receiver-id <id>] [--method-names "a,b"] [--allowance "1 NEAR"]';
const args = parse_args();
const signer_id = require_string(args, "signer-id", usage);
const public_key = require_string(args, "public-key", usage);
const permission_kind = require_string(args, "permission", usage);
require_signer(usage);
// =================================================
// Build the NEAR-kit AccessKeyPermission value from the CLI flags.
let permission:
  | { type: "fullAccess" }
  | {
      type: "functionCall";
      receiverId: string;
      methodNames: string[];
      allowance: AMOUNT_INPUT;
    };
if (permission_kind === "fullAccess" || permission_kind === "full-access") {
  permission = { type: "fullAccess" };
} else if (
  permission_kind === "functionCall" ||
  permission_kind === "function-call"
) {
  const receiver_id = require_string(args, "receiver-id", usage);
  const method_names = optional_string(args, "method-names", "")
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
  if (method_names.length === 0) {
    console.error(
      "error: --method-names is required when --permission is function-call",
    );
    console.error(`usage: ${usage}`);
    process.exit(1);
  }
  permission = {
    type: "functionCall",
    receiverId: receiver_id,
    methodNames: method_names,
    allowance: args["allowance"]
      ? require_amount(args, "allowance", usage)
      : ("1 NEAR" as AMOUNT_INPUT),
  };
} else {
  console.error(
    `error: unknown --permission "${permission_kind}" (use full-access or function-call)`,
  );
  console.error(`usage: ${usage}`);
  process.exit(1);
}
// =================================================
log_result(
  `add_key ${public_key} on ${signer_id}`,
  await near_add_key_fun_json(near_kit_env, signer_id, public_key, permission),
);
// =================================================
// copyright 2026 by sleet.near
