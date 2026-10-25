// =================================================
// intear_dex_engine_is_paused_fun_json
//
// View: the engine's `is_paused`. Returns whether the engine is
// paused.
//
// A paused engine rejects swaps, deposits, withdrawals and every other
// state change, but its views keep working.
// =================================================
import type { Near } from "near-kit";
import { intear_dex_engine_methods_const } from "../../lib/methods/methods_intear_dex_engine";
// =================================================
export async function intear_dex_engine_is_paused_fun_json(
  near: Near,
  engineContractId: string,
): Promise<boolean> {
  const result = await near.view(
    engineContractId,
    intear_dex_engine_methods_const.is_paused,
    {},
  );
  return result as boolean;
}
// =================================================
// copyright 2026 by sleet.near
