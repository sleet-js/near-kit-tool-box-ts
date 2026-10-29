// =================================================
// rhea_ammv2_get_pool_fun_json
//
// View: `get_pool`. Returns the pool descriptor at `pool_id`, parsed
// against `RHEA_AMMV2_GET_POOL_TYPE` (zod). To get the raw JSON, call
// `near.view(...)` directly.
// =================================================
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { rhea_ammv2_args } from "../../lib/args/rhea_ammv2_args";
import {
  RHEA_AMMV2_GET_POOL_TYPE_Z_CONST,
  type RHEA_AMMV2_GET_POOL_TYPE,
} from "../../types/rhea_ammv2_get_pool_type";
// =================================================
export async function rhea_ammv2_get_pool_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
  pool_id: rhea_ammv2_args["pool_id"],
): Promise<RHEA_AMMV2_GET_POOL_TYPE> {
  const result = await near.view(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.get_pool,
    { pool_id },
  );
  return RHEA_AMMV2_GET_POOL_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
