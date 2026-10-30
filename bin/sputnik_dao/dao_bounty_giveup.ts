// =================================================
// Call: gives up the caller's Sputnik DAO V2 bounty claim.
//
// usage:
//   bun run bin/sputnik_dao/dao_bounty_giveup.ts --dao <name|account-id> --bounty-id <n>
// =================================================
import { parse_args, require_number, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, NEAR_KIT_NETWORK } from "../_shared/env.js";
import {
  sputnik_dao_account_id_for_network,
  sputnik_dao_bounty_giveup_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_bounty_giveup.ts --dao <name|account-id> --bounty-id <n>";
const args = parse_args();
const dao_id = sputnik_dao_account_id_for_network(
  require_string(args, "dao", usage),
  NEAR_KIT_NETWORK,
);
const bounty_id = require_number(args, "bounty-id", usage);
// =================================================
const result = await sputnik_dao_bounty_giveup_fun_json(
  near_kit_env,
  dao_id,
  bounty_id,
);
log_result(`bounty_giveup ${dao_id} #${bounty_id}`, result);
// =================================================
// copyright 2026 by sleet.near
