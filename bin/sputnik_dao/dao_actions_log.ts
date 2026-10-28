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
// --- WHY --- a proposal is not a transaction. the contract stores the
// proposal's record and this trail of actions, but it does not store
// the transaction hashes, so the log is the way back to what happened
// on a proposal that is no longer in the list.
// =================================================
import { parseArgs, requireString } from "../_shared/args.js";
import { logResult, near_kit_env } from "../_shared/env.js";
import {
  sputnik_dao_account_id,
  sputnik_dao_get_actions_log_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_actions_log.ts --dao <name|account-id>";
const args = parseArgs();
const daoId = sputnik_dao_account_id(requireString(args, "dao", usage));
// =================================================
logResult(
  `get_actions_log ${daoId}`,
  await sputnik_dao_get_actions_log_fun_json(near_kit_env, daoId),
);
// =================================================
// copyright 2026 by sleet.near
