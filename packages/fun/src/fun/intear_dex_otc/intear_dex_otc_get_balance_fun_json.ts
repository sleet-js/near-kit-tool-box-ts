// =================================================
// intear_dex_otc_get_balance_fun_json
//
// View: the otc dex's `get_balance`. Returns the otc dex's internal
// balance of one asset for one account, or `null` when the account
// has no balance entry for that asset.
//
// This is the otc desk's own ledger — balances the account deposited
// with `deposit_assets`, separate from the engine's inner balances.
//
// The balance is a u128, so it is a `bigint`.
// =================================================
import type { Near } from "near-kit";
import { b } from "@zorsh/zorsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import {
  intear_dex_asset_id_schema,
  intear_dex_asset_id_to_decoded,
} from "../../lib/borsh/intear_dex_asset_id";
import { intear_dex_otc_balance_schema } from "../../lib/borsh/intear_dex_otc_decode";
import { intear_dex_otc_methods_const } from "../../lib/methods/methods_intear_dex_otc";
import type { intear_dex_otc_args } from "../../lib/args/intear_dex_otc_args";
import type { INTEAR_DEX_OTC_BALANCE_TYPE } from "../../types/intear_dex_otc_types";
// =================================================
export async function intear_dex_otc_get_balance_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
  account_id: intear_dex_otc_args["account_id"],
  asset_id: intear_dex_otc_args["asset_id"],
): Promise<INTEAR_DEX_OTC_BALANCE_TYPE> {
  const args = b
    .struct({
      account_id: b.string(),
      asset_id: intear_dex_asset_id_schema,
    })
    .serialize({
      account_id: account_id,
      asset_id: intear_dex_asset_id_to_decoded(asset_id),
    });
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_otc_methods_const.get_balance,
    args,
    intear_dex_otc_balance_schema,
  );
}
// =================================================
// copyright 2026 by sleet.near
