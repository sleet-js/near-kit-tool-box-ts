// =================================================
// intear_dex_xyk_get_pending_fees_fun_json
//
// View: the xyk dex's `get_pending_fees`. Returns the fees
// `account_id` has collected but not withdrawn yet, as a map from
// asset id to amount.
//
// Only the assets asked for are looked up. An asset the account has
// never collected a fee for is simply absent from the map.
//
// The dex answers with a borsh `HashMap<AssetId, U128>`, which goes
// over the wire as a length followed by that many (key, value) pairs.
// The decoder reads it as a vector of pairs, which is the same bytes.
// =================================================
import type { Near } from "near-kit";
import { borsh_reader, borsh_writer } from "../../lib/borsh/intear_dex_borsh";
import {
  read_intear_dex_asset_id,
  write_intear_dex_asset_id,
} from "../../lib/borsh/intear_dex_asset_id";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
import type { intear_dex_xyk_args } from "../../lib/args/intear_dex_xyk_args";
import type { INTEAR_DEX_XYK_PENDING_FEES_TYPE } from "../../types/intear_dex_xyk_types";
// =================================================
export async function intear_dex_xyk_get_pending_fees_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
  account_id: intear_dex_xyk_args["account_id"],
  asset_ids: intear_dex_xyk_args["asset_ids"],
): Promise<INTEAR_DEX_XYK_PENDING_FEES_TYPE> {
  const writer = new borsh_writer();
  writer.string(account_id);
  writer.vec(asset_ids, (item, asset_id) =>
    write_intear_dex_asset_id(item, asset_id),
  );
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_xyk_methods_const.get_pending_fees,
    writer.to_bytes(),
    (reader: borsh_reader) => {
      const entries = reader.vec((item) => {
        const asset_id = read_intear_dex_asset_id(item);
        const amount = item.u128().toString();
        return [asset_id, amount] as const;
      });
      return Object.fromEntries(entries) as INTEAR_DEX_XYK_PENDING_FEES_TYPE;
    },
  );
}
// =================================================
// copyright 2026 by sleet.near
