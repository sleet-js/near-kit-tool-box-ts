// =================================================
// sputnik_dao_factory_get_code_fun_json
//
// View: the V2 factory's `get_code`. Returns the raw WASM bytes for a
// stored contract code hash.
//
// The response is binary, not JSON. Near-kit's generic JSON view
// helper is therefore not used here.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
// =================================================
export async function sputnik_dao_factory_get_code_fun_json(
  near: Near,
  factory_contract_id: string,
  code_hash: sputnik_dao_args["code_hash"],
): Promise<Uint8Array> {
  const result = await near.view(
    factory_contract_id,
    sputnik_dao_factory_methods_const.get_code,
    { code_hash },
  );
  if (!(result instanceof Uint8Array)) {
    throw new Error("sputnik dao factory get_code: expected raw WASM bytes");
  }
  return result;
}
// =================================================
// copyright 2026 by sleet.near
