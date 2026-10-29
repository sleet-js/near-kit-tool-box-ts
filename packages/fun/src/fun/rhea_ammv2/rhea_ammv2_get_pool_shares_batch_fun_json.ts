// =================================================
// rhea_ammv2_get_pool_shares_batch_fun_json
//
// View: `get_pool_shares_batch`. Returns an account's LP shares in
// several pools at once, in the order the pools were asked for.
//
// Each entry is the same string `get_pool_shares` returns for one
// pool — the LP token balance, or `"0"` when the account holds
// nothing in that pool.
//
// The contract does not cap how many pool ids one call may carry.
// The ceiling is the RPC's view gas: a batch of about 5000 pool ids
// answers on mainnet today, and a larger one fails with a wasm
// `GasLimitExceeded` rather than a contract error.
//
// A hard cap here would reject calls the contract itself accepts, so
// the limit is left to the caller — split a large list into batches
// if the call runs out of gas.
// =================================================
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { rhea_ammv2_args } from "../../lib/args/rhea_ammv2_args";
import type { RHEA_AMMV2_POOL_SHARES_BATCH_TYPE } from "../../types/rhea_ammv2_view_types";
// =================================================
export async function rhea_ammv2_get_pool_shares_batch_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
  pool_ids: rhea_ammv2_args["pool_ids"],
  account_id: rhea_ammv2_args["account_id"],
): Promise<RHEA_AMMV2_POOL_SHARES_BATCH_TYPE> {
  const result = await near.view(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.get_pool_shares_batch,
    { pool_ids, account_id },
  );
  return result as RHEA_AMMV2_POOL_SHARES_BATCH_TYPE;
}
// =================================================
// copyright 2026 by sleet.near
