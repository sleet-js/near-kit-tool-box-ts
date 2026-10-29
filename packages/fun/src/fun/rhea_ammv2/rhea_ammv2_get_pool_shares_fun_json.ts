// =================================================
// View: `get_pool_shares`. Returns an account's LP shares in one pool
// as a decimal string — `"0"` when the account holds nothing in that
// pool.
// =================================================
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { rhea_ammv2_args } from "../../lib/args/rhea_ammv2_args";
import { RHEA_AMMV2_U128_Z_CONST } from "../../types/rhea_ammv2_view_types";
// =================================================
export async function rhea_ammv2_get_pool_shares_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
  pool_id: rhea_ammv2_args["pool_id"],
  account_id: rhea_ammv2_args["account_id"],
): Promise<string> {
  const result = await near.view(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.get_pool_shares,
    { pool_id, account_id },
  );
  return RHEA_AMMV2_U128_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
