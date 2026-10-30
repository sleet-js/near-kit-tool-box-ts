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
import { parse_args, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, NEAR_KIT_NETWORK } from "../_shared/env.js";
import {
  sputnik_dao_account_id_for_network,
  sputnik_dao_get_policy_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage = "bun run bin/sputnik_dao/dao_policy.ts --dao <name|account-id>";
const args = parse_args();
const dao_id = sputnik_dao_account_id_for_network(
  require_string(args, "dao", usage),
  NEAR_KIT_NETWORK,
);
// =================================================
log_result(
  `get_policy ${dao_id}`,
  await sputnik_dao_get_policy_fun_json(near_kit_env, dao_id),
);
// =================================================
// copyright 2026 by sleet.near
