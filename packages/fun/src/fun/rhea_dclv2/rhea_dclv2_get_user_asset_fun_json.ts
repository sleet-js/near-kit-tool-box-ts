// =================================================
// View: `get_user_asset`. Returns an account's internal token balance.
// =================================================
import type { Near } from "near-kit";
import { rhea_dclv2_methods_const } from "../../lib/methods/methods_rhea_dclv2";
import type { rhea_dclv2_args } from "../../lib/args/rhea_dclv2_args";
import {
  RHEA_DCLV2_USER_ASSET_TYPE_Z_CONST,
  type RHEA_DCLV2_USER_ASSET_TYPE,
} from "../../types/rhea_dclv2_types";
// =================================================
export async function rhea_dclv2_get_user_asset_fun_json(
  near: Near,
  rhea_dclv2_contractId: string,
  account_id: rhea_dclv2_args["account_id"],
  token_id: rhea_dclv2_args["token_id"],
): Promise<RHEA_DCLV2_USER_ASSET_TYPE> {
  const result = await near.view(
    rhea_dclv2_contractId,
    rhea_dclv2_methods_const.get_user_asset,
    { account_id, token_id },
  );
  return RHEA_DCLV2_USER_ASSET_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
