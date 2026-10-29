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
import { parse_args } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import {
  intear_dex_engine_dex_storage_balance_bounds_fun_json,
  intear_dex_engine_storage_balance_bounds_fun_json,
  intear_dex_engine_total_storage_balances_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const args = parse_args();
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(`engine storage @ ${contract_id}`, {
  totals: await intear_dex_engine_total_storage_balances_fun_json(
    near_kit_env,
    contract_id,
  ),
  user_bounds: await intear_dex_engine_storage_balance_bounds_fun_json(
    near_kit_env,
    contract_id,
  ),
  dex_bounds: await intear_dex_engine_dex_storage_balance_bounds_fun_json(
    near_kit_env,
    contract_id,
  ),
});
// =================================================
// copyright 2026 by sleet.near
