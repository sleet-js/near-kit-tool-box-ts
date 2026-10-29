// =================================================
// intear_dex_xyk_get_fee_discount_signer_fun_json
//
// View: the xyk dex's `get_fee_discount_signer`. Returns the public
// key that signs fee discounts for this dex, or `null` when fee
// discounts are disabled.
//
// A fee discount lowers the pool and protocol fees of a swap. The
// discount itself is signed off-chain and handed to the dex as part
// of the swap message — this view only tells you which key to trust.
// =================================================
import type { Near } from "near-kit";
import { borsh_reader } from "../../lib/borsh/intear_dex_borsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
// =================================================
export async function intear_dex_xyk_get_fee_discount_signer_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
): Promise<string | null> {
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_xyk_methods_const.get_fee_discount_signer,
    new Uint8Array(),
    (reader: borsh_reader) => reader.option((item) => item.public_key()),
  );
}
// =================================================
// copyright 2026 by sleet.near
