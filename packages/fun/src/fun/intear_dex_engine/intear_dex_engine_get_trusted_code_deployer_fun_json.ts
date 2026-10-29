// =================================================
// intear_dex_engine_get_trusted_code_deployer_fun_json
//
// View: the engine's `get_trusted_code_deployer`. Returns the
// account that may deploy or upgrade the code of a sub-dex.
//
// Only this account's `deploy_dex_code` calls are accepted, so its
// key decides which sub-dex code the engine runs.
// =================================================
import type { Near } from "near-kit";
import { intear_dex_engine_methods_const } from "../../lib/methods/methods_intear_dex_engine";
import { INTEAR_DEX_AMOUNT_STRING_Z_CONST } from "../../types/intear_dex_engine_types";
// =================================================
export async function intear_dex_engine_get_trusted_code_deployer_fun_json(
  near: Near,
  engine_contract_id: string,
): Promise<string> {
  const result = await near.view(
    engine_contract_id,
    intear_dex_engine_methods_const.get_trusted_code_deployer,
    {},
  );
  return INTEAR_DEX_AMOUNT_STRING_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
