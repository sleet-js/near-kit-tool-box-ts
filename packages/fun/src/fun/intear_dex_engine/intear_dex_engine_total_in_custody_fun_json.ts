// =================================================
// intear_dex_engine_total_in_custody_fun_json
//
// View: the engine's `total_in_custody`. Returns the total amount of
// one asset the engine contract holds for the dexes running inside
// it, or `null` when that asset was never registered.
//
// If the engine's real balance of the asset is larger than this
// number, the difference is free to take out — the engine only
// tracks what belongs to its users.
// =================================================
import type { Near } from "near-kit";
import { intear_dex_engine_methods_const } from "../../lib/methods/methods_intear_dex_engine";
import type { INTEAR_DEX_ASSET_ID_STRING } from "../../types/intear_dex_engine_types";
// =================================================
export async function intear_dex_engine_total_in_custody_fun_json(
  near: Near,
  engine_contract_id: string,
  asset_id: INTEAR_DEX_ASSET_ID_STRING,
): Promise<string | null> {
  const result = await near.view(
    engine_contract_id,
    intear_dex_engine_methods_const.total_in_custody,
    { asset_id },
  );
  return result as string | null;
}
// =================================================
// copyright 2026 by sleet.near
