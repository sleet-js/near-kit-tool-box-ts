// =================================================
// bin/intear_dex_engine/intear_dex_engine_balances.ts
//
// View: reads an account's or a dex's inner balances inside the INTEAR
// DEX engine — the balances the engine keeps so a swap needs no
// `ft_transfer_call` round trip.
//
// Pass `--account-id` for a user, or `--dex-id` for a sub-dex
// (`<deployer>/<id>`). Pass exactly one of them.
//
// usage:
//   bun run bin/intear_dex_engine/intear_dex_engine_balances.ts \
//     (--account-id <id> | --dex-id <deployer/id>) [--limit <n>] [--contract-id <id>]
// =================================================
import {
  optional_number,
  parse_args,
  require_string,
} from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import { intear_dex_engine_registered_assets_of_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_engine/intear_dex_engine_balances.ts (--account-id <id> | --dex-id <deployer/id>) [--limit <n>] [--contract-id <id>]";
const args = parse_args();
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
const limit = optional_number(args, "limit", 50);

const account_id =
  typeof args["account-id"] === "string" ? args["account-id"] : null;
const dex_id = typeof args["dex-id"] === "string" ? args["dex-id"] : null;
if (account_id === null && dex_id === null) {
  require_string(args, "account-id", usage);
}
// =================================================
log_result(
  `registered assets of ${account_id ?? dex_id} @ ${contract_id}`,
  await intear_dex_engine_registered_assets_of_fun_json(
    near_kit_env,
    contract_id,
    account_id,
    dex_id,
    0,
    limit,
  ),
);
// =================================================
// copyright 2026 by sleet.near
