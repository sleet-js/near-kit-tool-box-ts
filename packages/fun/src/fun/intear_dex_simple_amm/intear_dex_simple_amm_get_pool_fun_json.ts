// =================================================
// intear_dex_simple_amm_get_pool_fun_json
//
// View: the simple-amm dex's `get_pool`. Returns the pool at
// `pool_id`, or `null` when there is no such pool.
//
// A simple-amm pool has exactly one liquidity provider — its
// `owner_id` — and holds the two assets it trades.
// =================================================
import type { Near } from "near-kit";
import { borsh_reader, borsh_writer } from "../../lib/borsh/intear_dex_borsh";
import { read_intear_dex_asset_id } from "../../lib/borsh/intear_dex_asset_id";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
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
  const args = new borsh_writer().u64(pool_id).to_bytes();
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_simple_amm_methods_const.get_pool,
    args,
    (reader: borsh_reader) =>
      reader.option((item) => {
        const asset0 = {
          asset_id: read_intear_dex_asset_id(item),
          balance: item.u128().toString(),
        };
        const asset1 = {
          asset_id: read_intear_dex_asset_id(item),
          balance: item.u128().toString(),
        };
        const owner_id = item.string();
        return { assets: [asset0, asset1], owner_id: owner_id };
      }),
  );
}
// =================================================
// copyright 2026 by sleet.near
