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
//
// VERIFIED live (2026-10-29): all three states occur on mainnet.
// =================================================
import type { Near } from "near-kit";
import { borsh_reader, borsh_writer } from "../../lib/borsh/intear_dex_borsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { decode_pool_share } from "../../lib/borsh/intear_dex_xyk_decode";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
import type { intear_dex_xyk_args } from "../../lib/args/intear_dex_xyk_args";
import type { INTEAR_DEX_XYK_POOL_SHARES_TYPE } from "../../types/intear_dex_xyk_types";
// =================================================
export async function intear_dex_xyk_get_pool_shares_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
  pool_ids: intear_dex_xyk_args["pool_ids"],
  account_id: intear_dex_xyk_args["account_id"],
): Promise<INTEAR_DEX_XYK_POOL_SHARES_TYPE> {
  const writer = new borsh_writer();
  writer.vec(pool_ids, (item, pool_id) => item.u32(pool_id));
  writer.string(account_id);
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_xyk_methods_const.get_pool_shares,
    writer.to_bytes(),
    (reader: borsh_reader) => reader.vec((item) => decode_pool_share(item)),
  );
}
// =================================================
// copyright 2026 by sleet.near
