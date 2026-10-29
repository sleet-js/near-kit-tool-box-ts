// =================================================
// rhea_ammv2_get_number_of_pools_fun_json
//
// View: `get_number_of_pools`. Returns the total number of pools
// currently registered in the rhea_ammv2 / ref-finance contract as a
// JSON `number`.
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
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
  return result as number;
}
// =================================================
// copyright 2026 by sleet.near
