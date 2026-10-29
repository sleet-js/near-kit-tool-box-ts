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
import { borsh_reader, borsh_writer } from "../../lib/borsh/intear_dex_borsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { decode_pool_view } from "../../lib/borsh/intear_dex_xyk_decode";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
import type { intear_dex_xyk_args } from "../../lib/args/intear_dex_xyk_args";
import type { INTEAR_DEX_XYK_POOL_TYPE } from "../../types/intear_dex_xyk_types";
// =================================================
export async function intear_dex_xyk_get_pools_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
  start_index: intear_dex_xyk_args["start_index"],
  limit: intear_dex_xyk_args["limit"],
): Promise<INTEAR_DEX_XYK_POOL_TYPE[]> {
  const args = new borsh_writer().u32(start_index).u32(limit).to_bytes();
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_xyk_methods_const.get_pools,
    args,
    (reader: borsh_reader) => reader.vec((item) => decode_pool_view(item)),
  );
}
// =================================================
// copyright 2026 by sleet.near
