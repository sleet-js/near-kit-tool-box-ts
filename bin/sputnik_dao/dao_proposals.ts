// =================================================
// View: reads a Sputnik DAO's proposals.
//
// The dao account is `<name>.sputnik-dao.near`. Pass `--dao` with the
// name (`huggies`) or with the whole account id
// (`huggies.sputnik-dao.near`) — both work.
//
// usage:
//   bun run bin/sputnik_dao/dao_proposals.ts --dao <name|account-id> [--from-index <n>] [--limit <n>]
//
// --- WHY --- a dao with no proposals answers with an empty list, not
// with a failure, so the bin prints `[]` for an empty dao.
// =================================================
import { optionalNumber, parseArgs, requireString } from "../_shared/args.js";
import { logResult, near_kit_env } from "../_shared/env.js";
import {
  sputnik_dao_account_id,
  sputnik_dao_get_proposals_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_proposals.ts --dao <name|account-id> [--from-index <n>] [--limit <n>]";
const args = parseArgs();
const daoId = sputnik_dao_account_id(requireString(args, "dao", usage));
const fromIndex = optionalNumber(args, "from-index", 0);
const limit = optionalNumber(args, "limit", 50);
// =================================================
logResult(
  `get_proposals ${daoId} from ${fromIndex} limit ${limit}`,
  await sputnik_dao_get_proposals_fun_json(
    near_kit_env,
    daoId,
    fromIndex,
    limit,
  ),
);
// =================================================
// copyright 2026 by sleet.near
