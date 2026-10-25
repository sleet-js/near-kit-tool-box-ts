// =================================================
// intear_dex_engine_dex_code_fun_json
//
// View: the engine's `dex_code`. Returns the WASM code of a sub-dex,
// base64 encoded.
//
// The engine does not validate a sub-dex's code when it loads it, so
// only the trusted code deployer's deployments are trustworthy.
// Comparing the code hash tells you whether a sub-dex was upgraded.
// =================================================
import type { Near } from "near-kit";
import { intear_dex_engine_methods_const } from "../../lib/methods/methods_intear_dex_engine";
// =================================================
export async function intear_dex_engine_dex_code_fun_json(
  near: Near,
  engineContractId: string,
  dex_id: string,
): Promise<string> {
  const result = await near.view(
    engineContractId,
    intear_dex_engine_methods_const.dex_code,
    { dex_id },
  );
  return result as string;
}
// =================================================
// copyright 2026 by sleet.near
