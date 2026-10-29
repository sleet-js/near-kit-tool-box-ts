// =================================================
// intear_dex_xyk_get_pools_fun_json
//
// View: the xyk dex's `get_pools`. Returns a page of pools starting
// at `start_index`, at most `limit` of them.
//
// The page holds up to `limit` pools, so paging through every pool
// means repeating the call with `start_index` moving on by `limit`.
//
// The borsh schema is the single source of truth for the shape — see
// `lib/borsh/intear_dex_xyk_decode.ts`.
// =================================================
import type { Near } from "near-kit";
import { b } from "@zorsh/zorsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { intear_dex_xyk_pool_schema } from "../../lib/borsh/intear_dex_xyk_decode";
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
  // The dex's `get_pools` takes the two u32s one after the other —
  // a borsh struct encodes its fields the same way, back to back and
  // with no length prefix.
  const args = b
    .struct({
      start_index: b.u32(),
      limit: b.u32(),
    })
    .serialize({ start_index: start_index, limit: limit });
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_xyk_methods_const.get_pools,
    args,
    b.vec(intear_dex_xyk_pool_schema),
  );
}
// =================================================
// copyright 2026 by sleet.near
