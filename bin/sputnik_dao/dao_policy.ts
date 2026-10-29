// =================================================
// View: reads a Sputnik DAO's policy — the roles and who is in them.
//
// The dao account is `<name>.sputnik-dao.near`. Pass `--dao` with the
// name (`huggies`) or with the whole account id
// (`huggies.sputnik-dao.near`) — both work.
//
// usage:
//   bun run bin/sputnik_dao/dao_policy.ts --dao <name|account-id>
// =================================================
import { parseArgs, requireString } from "../_shared/args.js";
import { logResult, near_kit_env } from "../_shared/env.js";
import {
  sputnik_dao_account_id,
  sputnik_dao_get_policy_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage = "bun run bin/sputnik_dao/dao_policy.ts --dao <name|account-id>";
const args = parseArgs();
const daoId = sputnik_dao_account_id(requireString(args, "dao", usage));
// =================================================
logResult(
  `get_policy ${daoId}`,
  await sputnik_dao_get_policy_fun_json(near_kit_env, daoId),
);
// =================================================
// copyright 2026 by sleet.near
