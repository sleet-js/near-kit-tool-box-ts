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
import { BorshReader, BorshWriter } from "../../lib/borsh/intear_dex_borsh";
import { readIntearDexAssetId } from "../../lib/borsh/intear_dex_asset_id";
import { intearDexView } from "../../lib/borsh/intear_dex_view";
import { intear_dex_simple_amm_methods_const } from "../../lib/methods/methods_intear_dex_simple_amm";
import type { intear_dex_simple_amm_args } from "../../lib/args/intear_dex_simple_amm_args";
import type { INTEAR_DEX_SIMPLE_AMM_POOL_TYPE } from "../../types/intear_dex_simple_amm_types";
// =================================================
export async function intear_dex_simple_amm_get_pool_fun_json(
  near: Near,
  engineContractId: string,
  dexId: string,
  pool_id: intear_dex_simple_amm_args["pool_id"],
): Promise<INTEAR_DEX_SIMPLE_AMM_POOL_TYPE | null> {
  const args = new BorshWriter().u64(pool_id).toBytes();
  return intearDexView(
    near,
    engineContractId,
    dexId,
    intear_dex_simple_amm_methods_const.get_pool,
    args,
    (reader: BorshReader) =>
      reader.option((item) => {
        const asset0 = {
          asset_id: readIntearDexAssetId(item),
          balance: item.u128().toString(),
        };
        const asset1 = {
          asset_id: readIntearDexAssetId(item),
          balance: item.u128().toString(),
        };
        const ownerId = item.string();
        return { assets: [asset0, asset1], owner_id: ownerId };
      }),
  );
}
// =================================================
// copyright 2026 by sleet.near
