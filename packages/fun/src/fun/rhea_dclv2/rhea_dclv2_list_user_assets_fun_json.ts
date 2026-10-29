// =================================================
// View: `list_user_assets`. Returns all internal token balances.
// =================================================
import type { Near } from "near-kit";
import { rhea_dclv2_methods_const } from "../../lib/methods/methods_rhea_dclv2";
import type { rhea_dclv2_args } from "../../lib/args/rhea_dclv2_args";
import {
  RHEA_DCLV2_USER_ASSETS_TYPE_Z_CONST,
  type RHEA_DCLV2_USER_ASSETS_TYPE,
} from "../../types/rhea_dclv2_types";
// =================================================
export async function rhea_dclv2_list_user_assets_fun_json(
  near: Near,
  rhea_dclv2_contract_id: string,
  account_id: rhea_dclv2_args["account_id"],
): Promise<RHEA_DCLV2_USER_ASSETS_TYPE> {
  const result = await near.view(
    rhea_dclv2_contract_id,
    rhea_dclv2_methods_const.list_user_assets,
    { account_id },
  );
  return RHEA_DCLV2_USER_ASSETS_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
