// =================================================
// intear_dex_xyk_get_pending_fees_fun_json
//
// View: the xyk dex's `get_pending_fees`. Returns the fees
// `account_id` has collected but not withdrawn yet, as a map from
// asset id to amount.
//
// Only the assets asked for are looked up. An asset the account has
// never collected a fee for is simply absent from the map.
// =================================================
import type { Near } from "near-kit";
import { BorshReader, BorshWriter } from "../../lib/borsh/intear_dex_borsh";
import {
  readIntearDexAssetId,
  writeIntearDexAssetId,
} from "../../lib/borsh/intear_dex_asset_id";
import { intearDexView } from "../../lib/borsh/intear_dex_view";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
import type { intear_dex_xyk_args } from "../../lib/args/intear_dex_xyk_args";
import type { INTEAR_DEX_XYK_PENDING_FEES_TYPE } from "../../types/intear_dex_xyk_types";
// =================================================
export async function intear_dex_xyk_get_pending_fees_fun_json(
  near: Near,
  engineContractId: string,
  dexId: string,
  account_id: intear_dex_xyk_args["account_id"],
  asset_ids: intear_dex_xyk_args["asset_ids"],
): Promise<INTEAR_DEX_XYK_PENDING_FEES_TYPE> {
  const writer = new BorshWriter();
  writer.string(account_id);
  writer.vec(asset_ids, (item, assetId) =>
    writeIntearDexAssetId(item, assetId),
  );
  return intearDexView(
    near,
    engineContractId,
    dexId,
    intear_dex_xyk_methods_const.get_pending_fees,
    writer.toBytes(),
    (reader: BorshReader) => {
      const entries = reader.vec((item) => {
        const assetId = readIntearDexAssetId(item);
        const amount = item.u128().toString();
        return [assetId, amount] as const;
      });
      return Object.fromEntries(entries) as INTEAR_DEX_XYK_PENDING_FEES_TYPE;
    },
  );
}
// =================================================
// copyright 2026 by sleet.near
