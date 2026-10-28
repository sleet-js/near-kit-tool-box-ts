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
// --- WHY --- the amount is in the token's own smallest unit and the
// contract does not say how many decimals that is. NEAR is 24
// decimals and most other tokens are 18, so read the decimals from
// the token registry — never from a guess. an empty token id means
// NEAR.
// =================================================
import { optionalNumber, parseArgs, requireString } from "../_shared/args.js";
import { logResult, near_kit_env } from "../_shared/env.js";
import {
  sputnik_dao_account_id,
  sputnik_dao_get_bounties_fun_json,
  sputnik_dao_get_bounty_number_of_claims_fun_json,
  sputnik_dao_get_last_bounty_id_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_bounties.ts --dao <name|account-id> [--from-index <n>] [--limit <n>]";
const args = parseArgs();
const daoId = sputnik_dao_account_id(requireString(args, "dao", usage));
const fromIndex = optionalNumber(args, "from-index", 0);
const limit = optionalNumber(args, "limit", 50);

const [bounties, lastBountyId] = await Promise.all([
  sputnik_dao_get_bounties_fun_json(near_kit_env, daoId, fromIndex, limit),
  sputnik_dao_get_last_bounty_id_fun_json(near_kit_env, daoId),
]);
// =================================================
logResult(
  `get_bounties ${daoId} from ${fromIndex} limit ${limit}`,
  {
    last_bounty_id: lastBountyId,
    bounties,
  },
);
// =================================================
// copyright 2026 by sleet.near
