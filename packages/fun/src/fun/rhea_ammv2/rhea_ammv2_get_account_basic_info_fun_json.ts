// =================================================
// View: `get_account_basic_info`. Returns typed account registration data.
// =================================================
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { rhea_ammv2_args } from "../../lib/args/rhea_ammv2_args";
import {
  RHEA_AMMV2_ACCOUNT_BASIC_INFO_TYPE_Z_CONST,
  type RHEA_AMMV2_ACCOUNT_BASIC_INFO_TYPE,
} from "../../types/rhea_ammv2_view_types";
// =================================================
export async function rhea_ammv2_get_account_basic_info_fun_json(
  near: Near,
  rhea_ammv2_contractId: string,
  account_id: rhea_ammv2_args["account_id"],
): Promise<RHEA_AMMV2_ACCOUNT_BASIC_INFO_TYPE> {
  const result = await near.view(
    rhea_ammv2_contractId,
    rhea_ammv2_methods_const.get_account_basic_info,
    { account_id },
  );
  return RHEA_AMMV2_ACCOUNT_BASIC_INFO_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
