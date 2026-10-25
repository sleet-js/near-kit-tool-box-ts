// =================================================
// View: `list_liquidities`. Returns an account's typed LP positions.
// =================================================
import type { Near } from "near-kit";
import { rhea_dclv2_methods_const } from "../../lib/methods/methods_rhea_dclv2";
import type { rhea_dclv2_args } from "../../lib/args/rhea_dclv2_args";
import {
  RHEA_DCLV2_LIQUIDITIES_TYPE_Z_CONST,
  type RHEA_DCLV2_LIQUIDITY_TYPE,
} from "../../types/rhea_dclv2_types";
// =================================================
export async function rhea_dclv2_list_liquidities_fun_json(
  near: Near,
  rhea_dclv2_contractId: string,
  account_id: rhea_dclv2_args["account_id"],
  from_index: rhea_dclv2_args["from_index"],
  limit: rhea_dclv2_args["limit"],
): Promise<RHEA_DCLV2_LIQUIDITY_TYPE[]> {
  const result = await near.view(
    rhea_dclv2_contractId,
    rhea_dclv2_methods_const.list_liquidities,
    { account_id, from_index, limit },
  );
  return RHEA_DCLV2_LIQUIDITIES_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
