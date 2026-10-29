// =================================================
// intear_dex_otc_get_authorized_key_fun_json
//
// View: the otc dex's `get_authorized_key`. Returns the public key an
// account authorized to sign its own trade intents, or `null` when
// the account has not authorized any key.
//
// With an authorized key an account can sign a trade intent and let
// another account submit the `match` call on its behalf.
//
// The key comes back as the raw borsh bytes of a near-crypto
// `PublicKey`; `intear_dex_public_key_to_string` turns them into the
// `ed25519:<base58>` form.
// =================================================
import type { Near } from "near-kit";
import { b } from "@zorsh/zorsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { intear_dex_public_key_schema } from "../../lib/borsh/intear_dex_otc_decode";
import { intear_dex_otc_methods_const } from "../../lib/methods/methods_intear_dex_otc";
import type { intear_dex_otc_args } from "../../lib/args/intear_dex_otc_args";
import type { INTEAR_DEX_OTC_AUTHORIZED_KEY_TYPE } from "../../types/intear_dex_otc_types";
// =================================================
export async function intear_dex_otc_get_authorized_key_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
  account_id: intear_dex_otc_args["owner_account_id"],
): Promise<INTEAR_DEX_OTC_AUTHORIZED_KEY_TYPE> {
  const args = b.string().serialize(account_id);
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_otc_methods_const.get_authorized_key,
    args,
    b.option(intear_dex_public_key_schema),
  );
}
// =================================================
// copyright 2026 by sleet.near
