// =================================================
// Call: acts on a Sputnik DAO V2 proposal.
//
// The `--proposal-kind` must be the exact proposal kind stored for the
// proposal; the contract checks it and rejects a mismatch.
//
// usage:
//   bun run bin/sputnik_dao/dao_act_proposal.ts --dao <name|account-id> --proposal-id <n> --action <action> --proposal-kind <json>
// =================================================
import { parse_args, require_number, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, NEAR_KIT_NETWORK } from "../_shared/env.js";
import {
  sputnik_dao_account_id_for_network,
  sputnik_dao_act_proposal_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_act_proposal.ts --dao <name|account-id> --proposal-id <n> --action <action> --proposal-kind <json>";
const args = parse_args();
const dao_id = sputnik_dao_account_id_for_network(
  require_string(args, "dao", usage),
  NEAR_KIT_NETWORK,
);
const proposal_id = require_number(args, "proposal-id", usage);
const action = require_string(args, "action", usage) as never;
const proposal = JSON.parse(
  require_string(args, "proposal-kind", usage),
) as never;
// =================================================
const result = await sputnik_dao_act_proposal_fun_json(
  near_kit_env,
  dao_id,
  proposal_id,
  action,
  proposal,
);
log_result(`act_proposal ${dao_id} #${proposal_id}`, result);
// =================================================
// copyright 2026 by sleet.near
