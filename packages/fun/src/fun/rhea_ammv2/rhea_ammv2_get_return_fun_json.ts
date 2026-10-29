// =================================================
// rhea_ammv2_get_return_fun_json
//
// View: `get_return`. Returns the expected output amount (decimal
// string) the caller would receive for swapping `amount_in` of
// `token_in` into `token_out` on `pool_id`, as raw JSON.
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { rhea_ammv2_args } from "../../lib/args/rhea_ammv2_args";
import { RHEA_AMMV2_U128_Z_CONST } from "../../types/rhea_ammv2_view_types";
// =================================================
export async function rhea_ammv2_get_return_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
  pool_id: rhea_ammv2_args["pool_id"],
  token_in: rhea_ammv2_args["token_in"],
  amount_in: rhea_ammv2_args["amount_in"],
  token_out: rhea_ammv2_args["token_out"],
): Promise<string> {
  const result = await near.view(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.get_return,
    {
      pool_id,
      token_in,
      amount_in,
      token_out,
    },
  );
  return RHEA_AMMV2_U128_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
