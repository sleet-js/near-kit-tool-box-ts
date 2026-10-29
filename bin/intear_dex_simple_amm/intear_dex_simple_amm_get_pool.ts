// =================================================
// bin/intear_dex_simple_amm/intear_dex_simple_amm_get_pool.ts
//
// View: reads one pool of the INTEAR DEX simple-amm sub-dex.
//
// usage:
//   bun run bin/intear_dex_simple_amm/intear_dex_simple_amm_get_pool.ts \
//     --pool-id <id> --dex-id <deployer/id> [--contract-id <id>]
// =================================================
import { parse_args, require_number, require_string } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import { intear_dex_simple_amm_get_pool_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_simple_amm/intear_dex_simple_amm_get_pool.ts --pool-id <id> --dex-id <deployer/id> [--contract-id <id>]";
const args = parse_args();
const pool_id = require_number(args, "pool-id", usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
// The simple-amm dex is not deployed on mainnet — pass its dex id
// explicitly.
const dex_id = require_string(args, "dex-id", usage);
// =================================================
log_result(
  `simple-amm pool ${pool_id} @ ${dex_id}`,
  await intear_dex_simple_amm_get_pool_fun_json(
    near_kit_env,
    contract_id,
    dex_id,
    pool_id,
  ),
);
// =================================================
// copyright 2026 by sleet.near
