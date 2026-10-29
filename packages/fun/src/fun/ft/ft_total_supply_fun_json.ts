// =================================================
// ft_total_supply_fun_json
//
// View (NEP-145): `ft_total_supply`. Returns the total supply of the
// token as a decimal string.
import type { Near } from "near-kit";
import { ft_methods_const } from "../../lib/methods/methods_ft";
import { FT_AMOUNT_STRING_Z_CONST } from "../../types/ft_metadata_get_response_type";
// =================================================
export async function ft_total_supply_fun_json(
  near: Near,
  ft_contract_id: string,
): Promise<string> {
  const result = await near.view(
    ft_contract_id,
    ft_methods_const.ft_total_supply,
  );
  return FT_AMOUNT_STRING_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
