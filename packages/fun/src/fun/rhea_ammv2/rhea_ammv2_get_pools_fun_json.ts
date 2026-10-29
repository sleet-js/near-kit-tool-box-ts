// =================================================
// rhea_ammv2_get_pools_fun_json
//
// View: `get_pools`. Returns a paginated list of pool descriptors,
// each parsed against `RHEA_AMMV2_GET_POOL_TYPE` (zod). To get the raw
// JSON, call `near.view(...)` directly.
// =================================================
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { rhea_ammv2_args } from "../../lib/args/rhea_ammv2_args";
import {
  RHEA_AMMV2_GET_POOLS_TYPE_Z_CONST,
  type RHEA_AMMV2_GET_POOL_TYPE,
} from "../../types/rhea_ammv2_get_pool_type";
// =================================================
export async function rhea_ammv2_get_pools_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
  from_index: rhea_ammv2_args["from_index"],
  limit: rhea_ammv2_args["limit"],
): Promise<RHEA_AMMV2_GET_POOL_TYPE[]> {
  const result = await near.view(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.get_pools,
    { from_index, limit },
  );
  return RHEA_AMMV2_GET_POOLS_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
