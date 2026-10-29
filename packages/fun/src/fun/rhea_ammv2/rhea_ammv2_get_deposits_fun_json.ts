// =================================================
// rhea_ammv2_get_deposits_fun_json
//
// View: `get_deposits`. Returns the per-token deposited balances
// (`{ token_id: balance_string }`) for `account_id` as a typed
// `RHEA_AMMV2_GET_DEPOSITS_TYPE` map. To get the raw JSON, call
// `near.view(...)` directly.
// =================================================
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { rhea_ammv2_args } from "../../lib/args/rhea_ammv2_args";
import type { RHEA_AMMV2_GET_DEPOSITS_TYPE } from "../../types/rhea_ammv2_get_deposits_type";
// =================================================
export async function rhea_ammv2_get_deposits_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
  account_id: rhea_ammv2_args["account_id"],
): Promise<RHEA_AMMV2_GET_DEPOSITS_TYPE> {
  const result = await near.view(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.get_deposits,
    { account_id },
  );
  return result as RHEA_AMMV2_GET_DEPOSITS_TYPE;
}
// =================================================
// copyright 2026 by sleet.near
