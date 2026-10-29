// =================================================
// intear_dex_xyk_get_pool_count_fun_json
//
// View: the xyk dex's `get_pool_count`. Returns how many pools the
// dex holds. The count is the pool id of the next pool to be
// created, so valid pool ids run `0 .. count - 1`.
// =================================================
import type { Near } from "near-kit";
import { borsh_reader } from "../../lib/borsh/intear_dex_borsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
// =================================================
export async function intear_dex_xyk_get_pool_count_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
): Promise<number> {
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_xyk_methods_const.get_pool_count,
    new Uint8Array(),
    (reader: borsh_reader) => reader.u32(),
  );
}
// =================================================
// copyright 2026 by sleet.near
