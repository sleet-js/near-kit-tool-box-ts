// =================================================
// rhea_ammv2_get_number_of_pools_fun_json
//
// View: `get_number_of_pools`. Returns the total number of pools
// currently registered in the rhea_ammv2 / ref-finance contract as a
// JSON `number`.
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import { RHEA_AMMV2_POOL_COUNT_Z_CONST } from "../../types/rhea_ammv2_view_types";
// =================================================
export async function rhea_ammv2_get_number_of_pools_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
): Promise<number> {
  const result = await near.view(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.get_number_of_pools,
    {},
  );
  return RHEA_AMMV2_POOL_COUNT_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
