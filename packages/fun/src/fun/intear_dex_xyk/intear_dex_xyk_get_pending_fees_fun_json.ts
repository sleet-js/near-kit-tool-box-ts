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
// The dex answers with a borsh `HashMap<AssetId, U128>`. Zorsh's
// `hashMap` reads the entries in the order they are on the wire, and
// Rust writes a `HashMap` in canonical `Ord` order, so the decoded
// map is in the order Rust produced it.
//
// The borsh schema is the single source of truth for the shape — see
// `lib/borsh/intear_dex_xyk_decode.ts`.
// =================================================
import type { Near } from "near-kit";
import { b } from "@zorsh/zorsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import {
  intear_dex_asset_id_schema,
  intear_dex_asset_id_to_decoded,
} from "../../lib/borsh/intear_dex_asset_id";
import { intear_dex_xyk_pending_fees_schema } from "../../lib/borsh/intear_dex_xyk_decode";
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
  const args = b
    .struct({
      account_id: b.string(),
      asset_ids: b.vec(intear_dex_asset_id_schema),
    })
    .serialize({
      account_id: account_id,
      asset_ids: asset_ids.map((asset_id) =>
        intear_dex_asset_id_to_decoded(asset_id),
      ),
    });
  const fees = await intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_xyk_methods_const.get_pending_fees,
    args,
    intear_dex_xyk_pending_fees_schema,
  );
  return fees;
}
// =================================================
// copyright 2026 by sleet.near
