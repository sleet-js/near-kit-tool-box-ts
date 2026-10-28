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
// --- WHY --- a proposal that is not there answers with `null`, not
// with a failure. that is what a removed proposal looks like.
// =================================================
import { parseArgs, requireNumber, requireString } from "../_shared/args.js";
import { logResult, near_kit_env } from "../_shared/env.js";
import {
  sputnik_dao_account_id,
  sputnik_dao_get_proposal_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_proposal.ts --dao <name|account-id> --proposal-id <id>";
const args = parseArgs();
const daoId = sputnik_dao_account_id(requireString(args, "dao", usage));
const proposalId = requireNumber(args, "proposal-id", usage);
// =================================================
logResult(
  `get_proposal ${proposalId} ${daoId}`,
  await sputnik_dao_get_proposal_fun_json(near_kit_env, daoId, proposalId),
);
// =================================================
// copyright 2026 by sleet.near
