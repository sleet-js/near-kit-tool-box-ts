// =================================================
// View: `get_pool_total_shares`. Returns total LP shares for one pool
// as a decimal string.
// =================================================
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { rhea_ammv2_args } from "../../lib/args/rhea_ammv2_args";
import { RHEA_AMMV2_U128_Z_CONST } from "../../types/rhea_ammv2_view_types";
// =================================================
export async function rhea_ammv2_get_pool_total_shares_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
  pool_id: rhea_ammv2_args["pool_id"],
): Promise<string> {
  const result = await near.view(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.get_pool_total_shares,
    { pool_id },
  );
  return RHEA_AMMV2_U128_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
