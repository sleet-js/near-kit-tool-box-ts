// =================================================
// rhea_ammv2_add_simple_pool_fun_json
//
// Call: `add_simple_pool`. Creates a new simple (constant-product)
// pool with the given `fee` (basis points) and ordered list of
// NEP-141 `tokens` (at least 2). Returns the resulting
// `FinalExecutionOutcome`.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { rhea_ammv2_args } from "../../lib/args/rhea_ammv2_args";
// =================================================
export async function rhea_ammv2_add_simple_pool_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
  fee: rhea_ammv2_args["fee"],
  tokens: rhea_ammv2_args["tokens"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.add_simple_pool,
    { fee, tokens },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
