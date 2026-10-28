// =================================================
// View: reads a Sputnik DAO's balances and its version.
//
// Reads the NEAR the dao can spend, the NEAR it holds for storage,
// the factory it belongs to, and its contract version.
//
// usage:
//   bun run bin/sputnik_dao/dao_info.ts --dao <name|account-id>
// =================================================
import { parseArgs, requireString } from "../_shared/args.js";
import { logResult, near_kit_env } from "../_shared/env.js";
import {
  sputnik_dao_account_id,
  sputnik_dao_get_available_amount_fun_json,
  sputnik_dao_get_factory_info_fun_json,
  sputnik_dao_get_locked_storage_amount_fun_json,
  sputnik_dao_get_staking_contract_fun_json,
  sputnik_dao_version_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage = "bun run bin/sputnik_dao/dao_info.ts --dao <name|account-id>";
const args = parseArgs();
const daoId = sputnik_dao_account_id(requireString(args, "dao", usage));

// the four reads are four different methods on one contract, so they
// run together and the page is as slow as its slowest one.
const [available, locked, factory, staking, version] = await Promise.all([
  sputnik_dao_get_available_amount_fun_json(near_kit_env, daoId),
  sputnik_dao_get_locked_storage_amount_fun_json(near_kit_env, daoId),
  sputnik_dao_get_factory_info_fun_json(near_kit_env, daoId),
  sputnik_dao_get_staking_contract_fun_json(near_kit_env, daoId),
  sputnik_dao_version_fun_json(near_kit_env, daoId),
]);
// =================================================
logResult(`dao info ${daoId}`, {
  id: daoId,
  version,
  available_amount: available,
  locked_storage_amount: locked,
  staking_contract: staking,
  factory_info: factory,
});
// =================================================
// copyright 2026 by sleet.near
