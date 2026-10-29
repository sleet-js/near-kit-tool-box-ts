// =================================================
// pool_ping_fun_json
//
// Call: `ping`. A no-op method that exists on the staking pool
// contract (handy for testing connectivity or funding the contract's
// account). Attaches `"30 Tgas"`.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { pool_methods_const } from "../../lib/methods/methods_pool";
// =================================================
export async function pool_ping_fun_json(
  near: Near,
  pool_contract_id: string,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(pool_contract_id, pool_methods_const.ping, {
    gas: "30 Tgas",
  });
  return result;
}
// =================================================
// copyright 2026 by sleet.near
