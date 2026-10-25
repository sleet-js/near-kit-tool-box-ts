// =================================================
// intear_dex_xyk_get_pool_shares_fun_json
//
// View: the xyk dex's `get_pool_shares`. Returns the LP shares
// `account_id` holds in each of `pool_ids`, in the order the pools
// were asked for.
//
// Each entry is `{ shares }`:
//   - `shares: null`   — the pool is not a public pool, or the
//                        account has no entry in it
//   - `shares: "0"`    — the account is registered but holds nothing
//   - `shares: "123"`  — the account holds that many shares
//
// The shares are the LP tokens of the pool. A share is worth its
// pro-rata part of the pool's two assets.
// =================================================
import type { Near } from "near-kit";
import { BorshReader, BorshWriter } from "../../lib/borsh/intear_dex_borsh";
import { intearDexView } from "../../lib/borsh/intear_dex_view";
import { decodePoolShare } from "../../lib/borsh/intear_dex_xyk_decode";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
import type { intear_dex_xyk_args } from "../../lib/args/intear_dex_xyk_args";
import type { INTEAR_DEX_XYK_POOL_SHARES_TYPE } from "../../types/intear_dex_xyk_types";
// =================================================
export async function intear_dex_xyk_get_pool_shares_fun_json(
  near: Near,
  engineContractId: string,
  dexId: string,
  pool_ids: intear_dex_xyk_args["pool_ids"],
  account_id: intear_dex_xyk_args["account_id"],
): Promise<INTEAR_DEX_XYK_POOL_SHARES_TYPE> {
  const writer = new BorshWriter();
  writer.vec(pool_ids, (item, poolId) => item.u32(poolId));
  writer.string(account_id);
  return intearDexView(
    near,
    engineContractId,
    dexId,
    intear_dex_xyk_methods_const.get_pool_shares,
    writer.toBytes(),
    (reader: BorshReader) => reader.vec((item) => decodePoolShare(item)),
  );
}
// =================================================
// copyright 2026 by sleet.near
