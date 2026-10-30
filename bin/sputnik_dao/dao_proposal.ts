// =================================================
// View: reads one Sputnik DAO proposal by its id.
//
// The dao account is `<name>.sputnik-dao.near`. Pass `--dao` with the
// name (`huggies`) or with the whole account id
// (`huggies.sputnik-dao.near`) — both work.
//
// usage:
//   bun run bin/sputnik_dao/dao_proposal.ts --dao <name|account-id> --proposal-id <id>
//
// A proposal that is not there answers with `null`, not with a
// failure. That is what a removed proposal looks like.
// =================================================
import { parse_args, require_number, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, NEAR_KIT_NETWORK } from "../_shared/env.js";
import {
  sputnik_dao_account_id_for_network,
  sputnik_dao_get_proposal_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_proposal.ts --dao <name|account-id> --proposal-id <id>";
const args = parse_args();
const dao_id = sputnik_dao_account_id_for_network(
  require_string(args, "dao", usage),
  NEAR_KIT_NETWORK,
);
const proposal_id = require_number(args, "proposal-id", usage);
// =================================================
log_result(
  `get_proposal ${proposal_id} ${dao_id}`,
  await sputnik_dao_get_proposal_fun_json(near_kit_env, dao_id, proposal_id),
);
// =================================================
// copyright 2026 by sleet.near
