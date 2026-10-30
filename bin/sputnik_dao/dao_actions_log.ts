// =================================================
// View: reads a Sputnik DAO's actions log — who did what, to which
// proposal, and in which block.
//
// The dao account is `<name>.sputnik-dao.near`. Pass `--dao` with the
// name (`huggies`) or with the whole account id
// (`huggies.sputnik-dao.near`) — both work.
//
// usage:
//   bun run bin/sputnik_dao/dao_actions_log.ts --dao <name|account-id>
//
// A proposal is not a transaction. The contract stores the proposal's
// record and this trail of actions, but it does not store the
// transaction hashes, so the log is the way back to what happened on a
// proposal that is no longer in the list.
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, NEAR_KIT_NETWORK } from "../_shared/env.js";
import {
  sputnik_dao_account_id_for_network,
  sputnik_dao_get_actions_log_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_actions_log.ts --dao <name|account-id>";
const args = parse_args();
const dao_id = sputnik_dao_account_id_for_network(
  require_string(args, "dao", usage),
  NEAR_KIT_NETWORK,
);
// =================================================
log_result(
  `get_actions_log ${dao_id}`,
  await sputnik_dao_get_actions_log_fun_json(near_kit_env, dao_id),
);
// =================================================
// copyright 2026 by sleet.near
