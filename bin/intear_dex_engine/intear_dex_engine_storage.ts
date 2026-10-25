// =================================================
// bin/intear_dex_engine/intear_dex_engine_storage.ts
//
// View: reads the INTEAR DEX engine's storage balances — the NEAR
// users and sub-dexes have deposited, and the deposit bounds the
// engine accepts.
//
// usage:
//   bun run bin/intear_dex_engine/intear_dex_engine_storage.ts [--contract-id <id>]
// =================================================
import { parseArgs } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
} from "../_shared/env.js";
import {
  intear_dex_engine_dex_storage_balance_bounds_fun_json,
  intear_dex_engine_storage_balance_bounds_fun_json,
  intear_dex_engine_total_storage_balances_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_engine/intear_dex_engine_storage.ts [--contract-id <id>]";
const args = parseArgs();
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
// =================================================
logResult(`engine storage @ ${contractId}`, {
  totals: await intear_dex_engine_total_storage_balances_fun_json(
    near_kit_env,
    contractId,
  ),
  user_bounds: await intear_dex_engine_storage_balance_bounds_fun_json(
    near_kit_env,
    contractId,
  ),
  dex_bounds: await intear_dex_engine_dex_storage_balance_bounds_fun_json(
    near_kit_env,
    contractId,
  ),
});
// =================================================
// copyright 2026 by sleet.near
