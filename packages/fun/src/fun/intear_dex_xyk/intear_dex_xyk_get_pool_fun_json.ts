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
import { borsh_reader, borsh_writer } from "../../lib/borsh/intear_dex_borsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { decode_pool_view } from "../../lib/borsh/intear_dex_xyk_decode";
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
  const args = new borsh_writer().u32(pool_id).to_bytes();
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_xyk_methods_const.get_pool,
    args,
    (reader: borsh_reader) => reader.option((item) => decode_pool_view(item)),
  );
}
// =================================================
// copyright 2026 by sleet.near
