// =================================================
// intear_dex_otc_get_balance_fun_json
//
// View: the otc dex's `get_balance`. Returns the otc dex's internal
// balance of one asset for one account, or `null` when the account
// has no balance entry for that asset.
//
// This is the otc desk's own ledger — balances the account deposited
// with `deposit_assets`, separate from the engine's inner balances.
// =================================================
import type { Near } from "near-kit";
import { BorshReader, BorshWriter } from "../../lib/borsh/intear_dex_borsh";
import { writeIntearDexAssetId } from "../../lib/borsh/intear_dex_asset_id";
import { intearDexView } from "../../lib/borsh/intear_dex_view";
import { intear_dex_otc_methods_const } from "../../lib/methods/methods_intear_dex_otc";
import type { intear_dex_otc_args } from "../../lib/args/intear_dex_otc_args";
import type { INTEAR_DEX_OTC_BALANCE_TYPE } from "../../types/intear_dex_otc_types";
// =================================================
export async function intear_dex_otc_get_balance_fun_json(
  near: Near,
  engineContractId: string,
  dexId: string,
  account_id: intear_dex_otc_args["account_id"],
  asset_id: intear_dex_otc_args["asset_id"],
): Promise<INTEAR_DEX_OTC_BALANCE_TYPE> {
  const writer = new BorshWriter();
  writer.string(account_id);
  writeIntearDexAssetId(writer, asset_id);
  return intearDexView(
    near,
    engineContractId,
    dexId,
    intear_dex_otc_methods_const.get_balance,
    writer.toBytes(),
    (reader: BorshReader) => reader.option((item) => item.u128().toString()),
  );
}
// =================================================
// copyright 2026 by sleet.near
