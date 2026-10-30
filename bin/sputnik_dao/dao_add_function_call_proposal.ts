// =================================================
// Call: adds a `FunctionCall` proposal to a Sputnik DAO V2.
//
// The proposal names the contract to call and the method to call on it.
// The method's arguments are plain JSON here — this bin base64-encodes
// them the way the contract stores them.
//
// The attached `--deposit` must equal the DAO's current proposal bond.
//
// usage:
//   bun run bin/sputnik_dao/dao_add_function_call_proposal.ts --dao <name|account-id> --description <text> --receiver-id <contract-id> --method <name> [--args <json>] [--deposit <amount>] [--action-deposit <yocto>] [--action-gas <yocto>]
//
// =================================================
import { parse_args, require_amount, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, NEAR_KIT_NETWORK } from "../_shared/env.js";
import {
  sputnik_dao_account_id_for_network,
  sputnik_dao_add_function_call_proposal_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_add_function_call_proposal.ts --dao <name|account-id> --description <text> --receiver-id <contract-id> --method <name> [--args <json>] [--deposit <amount>] [--action-deposit <yocto>] [--action-gas <yocto>]";

const args = parse_args();
const dao_id = sputnik_dao_account_id_for_network(
  require_string(args, "dao", usage),
  NEAR_KIT_NETWORK,
);
const description = require_string(args, "description", usage);
const receiver_id = require_string(args, "receiver-id", usage);
const method_name = require_string(args, "method", usage);

// the action's arguments are optional — a method that takes no
// arguments gets an empty payload.
const args_flag = args["args"];
const action_args =
  typeof args_flag === "string" && args_flag.length > 0
    ? JSON.parse(args_flag)
    : undefined;

// the deposit and gas the DAO attaches to the action it runs on the
// target contract. both are decimal strings in their smallest unit.
const action_deposit =
  typeof args["action-deposit"] === "string" ? args["action-deposit"] : "0";
const action_gas =
  typeof args["action-gas"] === "string"
    ? args["action-gas"]
    : "30000000000000";

const deposit = require_amount(args, "deposit", usage);
// =================================================
const result = await sputnik_dao_add_function_call_proposal_fun_json(
  near_kit_env,
  dao_id,
  description,
  receiver_id,
  [
    {
      method_name,
      args: action_args,
      deposit: action_deposit,
      gas: action_gas,
    },
  ],
  deposit,
);
log_result(`add FunctionCall proposal ${dao_id}`, result);
// =================================================
// copyright 2026 by sleet.near
