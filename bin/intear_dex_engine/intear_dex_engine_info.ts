// =================================================
// bin/intear_dex_engine/intear_dex_engine_info.ts
//
// View: reads the INTEAR DEX engine's state — whether it is paused,
// who may deploy sub-dex code, the deployed contract version, and the
// NEAR it holds that no user or dex owns.
//
// usage:
//   bun run bin/intear_dex_engine/intear_dex_engine_info.ts [--contract-id <id>]
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
  intear_dex_engine_contract_source_metadata_fun_json,
  intear_dex_engine_get_trusted_code_deployer_fun_json,
  intear_dex_engine_is_paused_fun_json,
  intear_dex_engine_total_storage_balances_fun_json,
  intear_dex_engine_untracked_near_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_engine/intear_dex_engine_info.ts [--contract-id <id>]";
const args = parse_args();
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(`engine info @ ${contract_id}`, {
  paused: await intear_dex_engine_is_paused_fun_json(near_kit_env, contract_id),
  trusted_code_deployer:
    await intear_dex_engine_get_trusted_code_deployer_fun_json(
      near_kit_env,
      contract_id,
    ),
  metadata: await intear_dex_engine_contract_source_metadata_fun_json(
    near_kit_env,
    contract_id,
  ),
  storage: await intear_dex_engine_total_storage_balances_fun_json(
    near_kit_env,
    contract_id,
  ),
  untracked_near: await intear_dex_engine_untracked_near_fun_json(
    near_kit_env,
    contract_id,
  ),
});
// =================================================
// copyright 2026 by sleet.near
