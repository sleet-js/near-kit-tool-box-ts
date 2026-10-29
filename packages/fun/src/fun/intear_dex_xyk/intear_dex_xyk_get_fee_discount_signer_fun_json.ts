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
//
// The key comes back as the raw borsh bytes of a near-crypto
// `PublicKey`; `intear_dex_public_key_to_string` turns them into the
// `ed25519:<base58>` form.
// =================================================
import type { Near } from "near-kit";
import { b } from "@zorsh/zorsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { intear_dex_public_key_schema } from "../../lib/borsh/intear_dex_otc_decode";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
// =================================================
export async function intear_dex_xyk_get_fee_discount_signer_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
): Promise<Uint8Array | null> {
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_xyk_methods_const.get_fee_discount_signer,
    new Uint8Array(),
    b.option(intear_dex_public_key_schema),
  );
}
// =================================================
// copyright 2026 by sleet.near
