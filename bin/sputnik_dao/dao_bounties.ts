// =================================================
// View: reads a Sputnik DAO's bounties.
//
// The dao account is `<name>.sputnik-dao.near`. Pass `--dao` with the
// name (`huggies`) or with the whole account id
// (`huggies.sputnik-dao.near`) — both work.
//
// usage:
//   bun run bin/sputnik_dao/dao_bounties.ts --dao <name|account-id> [--from-index <n>] [--limit <n>]
//
// The amount is in the token's own smallest unit and the contract does
// not say how many decimals that is. NEAR is 24 decimals and most
// other tokens are 18, so read the decimals from the token registry —
// never from a guess. An empty token id means NEAR.
// =================================================
import {
  optional_number,
  parse_args,
  require_string,
} from "../_shared/args.js";
import { log_result, near_kit_env } from "../_shared/env.js";
import {
  sputnik_dao_account_id,
  sputnik_dao_get_bounties_fun_json,
  sputnik_dao_get_last_bounty_id_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_bounties.ts --dao <name|account-id> [--from-index <n>] [--limit <n>]";
const args = parse_args();
const dao_id = sputnik_dao_account_id(require_string(args, "dao", usage));
const from_index = optional_number(args, "from-index", 0);
const limit = optional_number(args, "limit", 50);

const [bounties, last_bounty_id] = await Promise.all([
  sputnik_dao_get_bounties_fun_json(near_kit_env, dao_id, from_index, limit),
  sputnik_dao_get_last_bounty_id_fun_json(near_kit_env, dao_id),
]);
// =================================================
log_result(`get_bounties ${dao_id} from ${from_index} limit ${limit}`, {
  last_bounty_id: last_bounty_id,
  bounties,
});
// =================================================
// copyright 2026 by sleet.near
