// =================================================
// Call: claims a Sputnik DAO V2 bounty.
//
// The attached `--deposit` must equal the DAO's current bounty bond.
// `--deadline` is a duration in nanoseconds and must not exceed the
// bounty's `max_deadline`.
//
// usage:
//   bun run bin/sputnik_dao/dao_bounty_claim.ts --dao <name|account-id> --bounty-id <n> --deadline <nanoseconds> --deposit <amount>
// =================================================
import {
  parse_args,
  require_amount,
  require_number,
  require_string,
} from "../_shared/args.js";
import { log_result, near_kit_env, NEAR_KIT_NETWORK } from "../_shared/env.js";
import {
  sputnik_dao_account_id_for_network,
  sputnik_dao_bounty_claim_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_bounty_claim.ts --dao <name|account-id> --bounty-id <n> --deadline <nanoseconds> --deposit <amount>";
const args = parse_args();
const dao_id = sputnik_dao_account_id_for_network(
  require_string(args, "dao", usage),
  NEAR_KIT_NETWORK,
);
const bounty_id = require_number(args, "bounty-id", usage);
const deadline = require_number(args, "deadline", usage).toString();
const deposit = require_amount(args, "deposit", usage);
// =================================================
const result = await sputnik_dao_bounty_claim_fun_json(
  near_kit_env,
  dao_id,
  bounty_id,
  deadline,
  deposit,
);
log_result(`bounty_claim ${dao_id} #${bounty_id}`, result);
// =================================================
// copyright 2026 by sleet.near
