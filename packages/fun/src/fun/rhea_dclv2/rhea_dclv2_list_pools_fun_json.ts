// =================================================
// View: `list_pools`. Returns a paginated list of typed DCL v2 pools.
// =================================================
import type { Near } from "near-kit";
import { rhea_dclv2_methods_const } from "../../lib/methods/methods_rhea_dclv2";
import type { rhea_dclv2_args } from "../../lib/args/rhea_dclv2_args";
import {
  RHEA_DCLV2_POOLS_TYPE_Z_CONST,
  type RHEA_DCLV2_POOL_TYPE,
} from "../../types/rhea_dclv2_types";
// =================================================
export async function rhea_dclv2_list_pools_fun_json(
  near: Near,
  rhea_dclv2_contractId: string,
  from_index: rhea_dclv2_args["from_index"],
  limit: rhea_dclv2_args["limit"],
): Promise<RHEA_DCLV2_POOL_TYPE[]> {
  const result = await near.view(
    rhea_dclv2_contractId,
    rhea_dclv2_methods_const.list_pools,
    { from_index, limit },
  );
  return RHEA_DCLV2_POOLS_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
