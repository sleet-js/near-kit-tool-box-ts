// =================================================
// intear_dex_xyk_get_pool_count_fun_json
//
// View: the xyk dex's `get_pool_count`. Returns how many pools the
// dex holds. The count is the pool id of the next pool to be
// created, so valid pool ids run `0 .. count - 1`.
// =================================================
import type { Near } from "near-kit";
import { BorshReader } from "../../lib/borsh/intear_dex_borsh";
import { intearDexView } from "../../lib/borsh/intear_dex_view";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
// =================================================
export async function intear_dex_xyk_get_pool_count_fun_json(
  near: Near,
  engineContractId: string,
  dexId: string,
): Promise<number> {
  return intearDexView(
    near,
    engineContractId,
    dexId,
    intear_dex_xyk_methods_const.get_pool_count,
    new Uint8Array(),
    (reader: BorshReader) => reader.u32(),
  );
}
// =================================================
// copyright 2026 by sleet.near
