// =================================================
// rhea_ammv2_storage_balance_of_fun_json
//
// View: `storage_balance_of`. Returns the NEP-145 storage balance for
// `account_id` as a typed `STORAGE_BALANCE_OF_RESPONSE_TYPE`
// (`{ total, available }`). To get the raw JSON, call `near.view(...)`
// directly.
// =================================================
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { rhea_ammv2_args } from "../../lib/args/rhea_ammv2_args";
import type { STORAGE_BALANCE_OF_RESPONSE_TYPE } from "../../types/storage_balance_of_response_type";
// =================================================
export async function rhea_ammv2_storage_balance_of_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
  account_id: rhea_ammv2_args["account_id"],
): Promise<STORAGE_BALANCE_OF_RESPONSE_TYPE> {
  const result = await near.view(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.storage_balance_of,
    { account_id },
  );
  return result as STORAGE_BALANCE_OF_RESPONSE_TYPE;
}
// =================================================
// copyright 2026 by sleet.near
