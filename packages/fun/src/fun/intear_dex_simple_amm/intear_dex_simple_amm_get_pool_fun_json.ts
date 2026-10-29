// =================================================
// intear_dex_simple_amm_get_pool_fun_json
//
// View: the simple-amm dex's `get_pool`. Returns the pool at
// `pool_id`, or `null` when there is no such pool.
//
// A simple-amm pool has exactly one liquidity provider — its
// `owner_id` — and holds the two assets it trades.
//
// The borsh schema is the single source of truth for the shape — see
// `lib/borsh/intear_dex_simple_amm_decode.ts`.
// =================================================
import type { Near } from "near-kit";
import { b } from "@zorsh/zorsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { intear_dex_simple_amm_pool_schema } from "../../lib/borsh/intear_dex_simple_amm_decode";
import { intear_dex_simple_amm_methods_const } from "../../lib/methods/methods_intear_dex_simple_amm";
import type { intear_dex_simple_amm_args } from "../../lib/args/intear_dex_simple_amm_args";
import type { INTEAR_DEX_SIMPLE_AMM_POOL_TYPE } from "../../types/intear_dex_simple_amm_types";
// =================================================
export async function intear_dex_simple_amm_get_pool_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
  pool_id: intear_dex_simple_amm_args["pool_id"],
): Promise<INTEAR_DEX_SIMPLE_AMM_POOL_TYPE | null> {
  // The simple-amm dex's pool id is a u64, unlike the xyk dex's u32.
  const args = b.u64().serialize(BigInt(pool_id));
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_simple_amm_methods_const.get_pool,
    args,
    b.option(intear_dex_simple_amm_pool_schema),
  );
}
// =================================================
// copyright 2026 by sleet.near
