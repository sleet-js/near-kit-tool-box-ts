// =================================================
// intear_dex_xyk_get_pool_fun_json
//
// View: the xyk dex's `get_pool`. Returns the pool at `pool_id`, or
// `null` when there is no such pool.
//
// The pool's `kind` tells you which pool shape it is: `Private`,
// `Public`, `Launch` or `LaunchV2`.
// =================================================
import type { Near } from "near-kit";
import { BorshReader, BorshWriter } from "../../lib/borsh/intear_dex_borsh";
import { intearDexView } from "../../lib/borsh/intear_dex_view";
import { decodePoolView } from "../../lib/borsh/intear_dex_xyk_decode";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
import type { intear_dex_xyk_args } from "../../lib/args/intear_dex_xyk_args";
import type { INTEAR_DEX_XYK_POOL_TYPE } from "../../types/intear_dex_xyk_types";
// =================================================
export async function intear_dex_xyk_get_pool_fun_json(
  near: Near,
  engineContractId: string,
  dexId: string,
  pool_id: intear_dex_xyk_args["pool_id"],
): Promise<INTEAR_DEX_XYK_POOL_TYPE | null> {
  const args = new BorshWriter().u32(pool_id).toBytes();
  return intearDexView(
    near,
    engineContractId,
    dexId,
    intear_dex_xyk_methods_const.get_pool,
    args,
    (reader: BorshReader) => reader.option((item) => decodePoolView(item)),
  );
}
// =================================================
// copyright 2026 by sleet.near
