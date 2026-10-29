// =================================================
// intear_dex_xyk_get_pool_fun_json
//
// View: the xyk dex's `get_pool`. Returns the pool at `pool_id`, or
// `null` when there is no such pool.
//
// The pool's variant tells you which pool shape it is: `Private`,
// `Public`, `Launch` or `LaunchV2`.
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
export async function intear_dex_xyk_get_pool_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
  pool_id: intear_dex_xyk_args["pool_id"],
): Promise<INTEAR_DEX_XYK_POOL_TYPE | null> {
  const args = b.u32().serialize(pool_id);
  const pool = await intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_xyk_methods_const.get_pool,
    args,
    b.option(intear_dex_xyk_pool_schema),
  );
  return pool;
}
// =================================================
// copyright 2026 by sleet.near
