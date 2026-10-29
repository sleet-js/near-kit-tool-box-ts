// =================================================
// intear_dex_engine_untracked_near_fun_json
//
// View: the engine's `untracked_near`. Returns the NEAR the engine
// contract holds that no user or dex owns.
//
// The engine keeps a tracked balance of everything it owes its users
// and dexes. Anything above that tracked balance is untracked and can
// be taken out freely.
// =================================================
import type { Near } from "near-kit";
import { intear_dex_engine_methods_const } from "../../lib/methods/methods_intear_dex_engine";
import { INTEAR_DEX_AMOUNT_STRING_Z_CONST } from "../../types/intear_dex_engine_types";
// =================================================
export async function intear_dex_engine_untracked_near_fun_json(
  near: Near,
  engine_contract_id: string,
): Promise<string> {
  const result = await near.view(
    engine_contract_id,
    intear_dex_engine_methods_const.untracked_near,
    {},
  );
  return INTEAR_DEX_AMOUNT_STRING_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
