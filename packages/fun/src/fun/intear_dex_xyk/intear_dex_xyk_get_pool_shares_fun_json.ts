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
//   - `shares: 0n`     — the account is registered but holds nothing
//   - `shares: 123n`   — the account holds that many shares
//
// The shares are the LP tokens of the pool. A share is worth its
// pro-rata part of the pool's two assets.
//
// VERIFIED live (2026-10-29): all three states occur on mainnet.
//
// The borsh schema is the single source of truth for the shape — see
// `lib/borsh/intear_dex_xyk_decode.ts`.
// =================================================
import type { Near } from "near-kit";
import { b } from "@zorsh/zorsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { intear_dex_xyk_pool_share_schema } from "../../lib/borsh/intear_dex_xyk_decode";
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
  const args = b
    .struct({
      pool_ids: b.vec(b.u32()),
      account_id: b.string(),
    })
    .serialize({ pool_ids: pool_ids, account_id: account_id });
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_xyk_methods_const.get_pool_shares,
    args,
    b.vec(intear_dex_xyk_pool_share_schema),
  );
}
// =================================================
// copyright 2026 by sleet.near
