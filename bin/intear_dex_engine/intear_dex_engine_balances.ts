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
import { optionalNumber, parseArgs, requireString } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
} from "../_shared/env.js";
import { intear_dex_engine_registered_assets_of_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_engine/intear_dex_engine_balances.ts (--account-id <id> | --dex-id <deployer/id>) [--limit <n>] [--contract-id <id>]";
const args = parseArgs();
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
const limit = optionalNumber(args, "limit", 50);

const accountId =
  typeof args["account-id"] === "string" ? args["account-id"] : null;
const dexId = typeof args["dex-id"] === "string" ? args["dex-id"] : null;
if (accountId === null && dexId === null) {
  requireString(args, "account-id", usage);
}
// =================================================
logResult(
  `registered assets of ${accountId ?? dexId} @ ${contractId}`,
  await intear_dex_engine_registered_assets_of_fun_json(
    near_kit_env,
    contractId,
    accountId,
    dexId,
    0,
    limit,
  ),
);
// =================================================
// copyright 2026 by sleet.near
