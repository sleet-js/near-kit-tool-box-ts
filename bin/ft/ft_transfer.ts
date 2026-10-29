// =================================================
// bin/ft/ft_transfer.ts
//
// Call (NEP-141): transfers `amount` of the token to `receiver_id`.
//
// usage:
//   bun run bin/ft/ft_transfer.ts --contract-id <id> --receiver-id <id> --amount <raw>
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, require_signer } from "../_shared/env.js";
import { ft_transfer_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/ft/ft_transfer.ts --contract-id <id> --receiver-id <id> --amount <raw>";
const args = parse_args();
const contract_id = require_string(args, "contract-id", usage);
const receiver_id = require_string(args, "receiver-id", usage);
const amount = require_string(args, "amount", usage);
require_signer(usage);
// =================================================
log_result(
  `ft_transfer @ ${contract_id} -> ${receiver_id}`,
  await ft_transfer_fun_json(near_kit_env, contract_id, receiver_id, amount),
);
// =================================================
// copyright 2026 by sleet.near
