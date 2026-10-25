// =================================================
// View: `get_deposit`. Returns one internal token balance for an account.
// =================================================
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { rhea_ammv2_args } from "../../lib/args/rhea_ammv2_args";
// =================================================
export async function rhea_ammv2_get_deposit_fun_json(
  near: Near,
  rhea_ammv2_contractId: string,
  account_id: rhea_ammv2_args["account_id"],
  token_id: rhea_ammv2_args["token_id"],
): Promise<string> {
  const result = await near.view(
    rhea_ammv2_contractId,
    rhea_ammv2_methods_const.get_deposit,
    { account_id, token_id },
  );
  return result as string;
}
// =================================================
// copyright 2026 by sleet.near
