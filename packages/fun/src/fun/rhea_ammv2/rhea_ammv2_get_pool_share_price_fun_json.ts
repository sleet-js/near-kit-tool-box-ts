// =================================================
// View: `get_pool_share_price`. Returns one pool share price.
// =================================================
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { rhea_ammv2_args } from "../../lib/args/rhea_ammv2_args";
// =================================================
export async function rhea_ammv2_get_pool_share_price_fun_json(
  near: Near,
  rhea_ammv2_contractId: string,
  pool_id: rhea_ammv2_args["pool_id"],
): Promise<string[]> {
  const result = await near.view(
    rhea_ammv2_contractId,
    rhea_ammv2_methods_const.get_pool_share_price,
    { pool_id },
  );
  return result as string[];
}
// =================================================
// copyright 2026 by sleet.near
