// =================================================
// View: `get_pool`. Returns one typed DCL v2 pool descriptor.
// =================================================
import type { Near } from "near-kit";
import { rhea_dclv2_methods_const } from "../../lib/methods/methods_rhea_dclv2";
import type { rhea_dclv2_args } from "../../lib/args/rhea_dclv2_args";
import {
  RHEA_DCLV2_POOL_TYPE_Z_CONST,
  type RHEA_DCLV2_POOL_TYPE,
} from "../../types/rhea_dclv2_types";
// =================================================
export async function rhea_dclv2_get_pool_fun_json(
  near: Near,
  rhea_dclv2_contractId: string,
  pool_id: rhea_dclv2_args["pool_id"],
): Promise<RHEA_DCLV2_POOL_TYPE> {
  const result = await near.view(
    rhea_dclv2_contractId,
    rhea_dclv2_methods_const.get_pool,
    { pool_id },
  );
  return RHEA_DCLV2_POOL_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
