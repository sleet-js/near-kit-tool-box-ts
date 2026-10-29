// =================================================
// View: `get_pools`. Returns typed DCL v2 pool descriptors by id.
// =================================================
import type { Near } from "near-kit";
import { rhea_dclv2_methods_const } from "../../lib/methods/methods_rhea_dclv2";
import type { rhea_dclv2_args } from "../../lib/args/rhea_dclv2_args";
import {
  RHEA_DCLV2_POOLS_TYPE_Z_CONST,
  type RHEA_DCLV2_POOL_TYPE,
} from "../../types/rhea_dclv2_types";
// =================================================
export async function rhea_dclv2_get_pools_fun_json(
  near: Near,
  rhea_dclv2_contract_id: string,
  pool_ids: rhea_dclv2_args["pool_ids"],
): Promise<RHEA_DCLV2_POOL_TYPE[]> {
  const result = await near.view(
    rhea_dclv2_contract_id,
    rhea_dclv2_methods_const.get_pools,
    { pool_ids },
  );
  return RHEA_DCLV2_POOLS_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
