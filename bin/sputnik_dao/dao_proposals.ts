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
// A dao with no proposals answers with an empty list, not with a
// failure, so the bin prints `[]` for an empty dao.
// =================================================
import {
  optional_number,
  parse_args,
  require_string,
} from "../_shared/args.js";
import { log_result, near_kit_env } from "../_shared/env.js";
import {
  sputnik_dao_account_id,
  sputnik_dao_get_proposals_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_proposals.ts --dao <name|account-id> [--from-index <n>] [--limit <n>]";
const args = parse_args();
const dao_id = sputnik_dao_account_id(require_string(args, "dao", usage));
const from_index = optional_number(args, "from-index", 0);
const limit = optional_number(args, "limit", 50);
// =================================================
log_result(
  `get_proposals ${dao_id} from ${from_index} limit ${limit}`,
  await sputnik_dao_get_proposals_fun_json(
    near_kit_env,
    dao_id,
    from_index,
    limit,
  ),
);
// =================================================
// copyright 2026 by sleet.near
