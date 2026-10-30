// =================================================
// Call: adds a proposal to a Sputnik DAO V2.
//
// The proposal kind is JSON. This example creates a signaling `Vote`.
// The attached `--deposit` must equal the DAO's current proposal bond.
//
// usage:
//   bun run bin/sputnik_dao/dao_add_proposal.ts --dao <name|account-id> --description <text> --kind <json> --deposit <amount>
// =================================================
import { parse_args, require_amount, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, NEAR_KIT_NETWORK } from "../_shared/env.js";
import {
  sputnik_dao_account_id_for_network,
  sputnik_dao_add_proposal_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_add_proposal.ts --dao <name|account-id> --description <text> --kind <json> --deposit <amount>";
const args = parse_args();
const dao_id = sputnik_dao_account_id_for_network(
  require_string(args, "dao", usage),
  NEAR_KIT_NETWORK,
);
const description = require_string(args, "description", usage);
const kind = JSON.parse(require_string(args, "kind", usage)) as never;
const deposit = require_amount(args, "deposit", usage);
// =================================================
const result = await sputnik_dao_add_proposal_fun_json(
  near_kit_env,
  dao_id,
  description,
  kind,
  deposit,
);
log_result(`add_proposal ${dao_id}`, result);
// =================================================
// copyright 2026 by sleet.near
