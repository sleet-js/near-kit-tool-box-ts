// =================================================
// View: `get_liquidity`. Returns one typed DCL v2 LP position.
// =================================================
import type { Near } from "near-kit";
import { rhea_dclv2_methods_const } from "../../lib/methods/methods_rhea_dclv2";
import type { rhea_dclv2_args } from "../../lib/args/rhea_dclv2_args";
import {
  RHEA_DCLV2_LIQUIDITY_TYPE_Z_CONST,
  type RHEA_DCLV2_LIQUIDITY_TYPE,
} from "../../types/rhea_dclv2_types";
// =================================================
export async function rhea_dclv2_get_liquidity_fun_json(
  near: Near,
  rhea_dclv2_contractId: string,
  lpt_id: rhea_dclv2_args["lpt_id"],
): Promise<RHEA_DCLV2_LIQUIDITY_TYPE> {
  const result = await near.view(
    rhea_dclv2_contractId,
    rhea_dclv2_methods_const.get_liquidity,
    { lpt_id },
  );
  return RHEA_DCLV2_LIQUIDITY_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
