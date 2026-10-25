// =================================================
// intear_dex_xyk_get_pools_fun_json
//
// View: the xyk dex's `get_pools`. Returns a page of pools starting
// at `start_index`, at most `limit` of them.
//
// The page holds up to `limit` pools, so paging through every pool
// means repeating the call with `start_index` moving on by `limit`.
// =================================================
import type { Near } from "near-kit";
import { BorshReader, BorshWriter } from "../../lib/borsh/intear_dex_borsh";
import { intearDexView } from "../../lib/borsh/intear_dex_view";
import { decodePoolView } from "../../lib/borsh/intear_dex_xyk_decode";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
import type { intear_dex_xyk_args } from "../../lib/args/intear_dex_xyk_args";
import type { INTEAR_DEX_XYK_POOL_TYPE } from "../../types/intear_dex_xyk_types";
// =================================================
export async function intear_dex_xyk_get_pools_fun_json(
  near: Near,
  engineContractId: string,
  dexId: string,
  start_index: intear_dex_xyk_args["start_index"],
  limit: intear_dex_xyk_args["limit"],
): Promise<INTEAR_DEX_XYK_POOL_TYPE[]> {
  const args = new BorshWriter().u32(start_index).u32(limit).toBytes();
  return intearDexView(
    near,
    engineContractId,
    dexId,
    intear_dex_xyk_methods_const.get_pools,
    args,
    (reader: BorshReader) => reader.vec((item) => decodePoolView(item)),
  );
}
// =================================================
// copyright 2026 by sleet.near
