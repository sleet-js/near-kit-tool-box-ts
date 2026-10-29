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
import { parseArgs } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
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
const args = parseArgs();
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
// =================================================
logResult(`engine info @ ${contractId}`, {
  paused: await intear_dex_engine_is_paused_fun_json(near_kit_env, contractId),
  trusted_code_deployer:
    await intear_dex_engine_get_trusted_code_deployer_fun_json(
      near_kit_env,
      contractId,
    ),
  metadata: await intear_dex_engine_contract_source_metadata_fun_json(
    near_kit_env,
    contractId,
  ),
  storage: await intear_dex_engine_total_storage_balances_fun_json(
    near_kit_env,
    contractId,
  ),
  untracked_near: await intear_dex_engine_untracked_near_fun_json(
    near_kit_env,
    contractId,
  ),
});
// =================================================
// copyright 2026 by sleet.near
