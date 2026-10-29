// =================================================
// ft_metadata_fun_json
//
// View (NEP-145): `ft_metadata`. Returns the token metadata,
// Zod-parsed into `FT_METADATA_TYPE` (spec, name, symbol, icon,
// reference, reference_hash, decimals).
import type { Near } from "near-kit";
import { ft_methods_const } from "../../lib/methods/methods_ft";
import {
  FT_METADATA_TYPE_Z_CONST,
  type FT_METADATA_TYPE,
} from "../../types/ft_metadata_get_response_type";
// =================================================
export async function ft_metadata_fun_json(
  near: Near,
  ft_contract_id: string,
): Promise<FT_METADATA_TYPE> {
  const result = await near.view(
    ft_contract_id,
    ft_methods_const.ft_metadata,
    {},
  );
  return FT_METADATA_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
