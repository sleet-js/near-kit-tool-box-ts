// =================================================
// ft_balance_of_fun_json
//
// View (NEP-145): `ft_balance_of`. Returns the call's token balance
// (decimal string) for `account_id` as raw JSON.
import type { Near } from "near-kit";
import { ft_methods_const } from "../../lib/methods/methods_ft";
import type { ft_args } from "../../lib/args/ft_args";
import { FT_AMOUNT_STRING_Z_CONST } from "../../types/ft_metadata_get_response_type";
// =================================================
export async function ft_balance_of_fun_json(
  near: Near,
  ft_contract_id: string,
  account_id: ft_args["account_id"],
): Promise<string> {
  const result = await near.view(
    ft_contract_id,
    ft_methods_const.ft_balance_of,
    { account_id },
  );
  return FT_AMOUNT_STRING_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
