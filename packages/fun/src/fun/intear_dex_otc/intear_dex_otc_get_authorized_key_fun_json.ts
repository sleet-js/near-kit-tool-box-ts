// =================================================
// intear_dex_otc_get_authorized_key_fun_json
//
// View: the otc dex's `get_authorized_key`. Returns the public key an
// account authorized to sign its own trade intents, or `null` when
// the account has not authorized any key.
//
// With an authorized key an account can sign a trade intent and let
// another account submit the `match` call on its behalf.
// =================================================
import type { Near } from "near-kit";
import { BorshReader, BorshWriter } from "../../lib/borsh/intear_dex_borsh";
import { intearDexView } from "../../lib/borsh/intear_dex_view";
import { intear_dex_otc_methods_const } from "../../lib/methods/methods_intear_dex_otc";
import type { intear_dex_otc_args } from "../../lib/args/intear_dex_otc_args";
import type { INTEAR_DEX_OTC_AUTHORIZED_KEY_TYPE } from "../../types/intear_dex_otc_types";
// =================================================
export async function intear_dex_otc_get_authorized_key_fun_json(
  near: Near,
  engineContractId: string,
  dexId: string,
  account_id: intear_dex_otc_args["owner_account_id"],
): Promise<INTEAR_DEX_OTC_AUTHORIZED_KEY_TYPE> {
  const args = new BorshWriter().string(account_id).toBytes();
  return intearDexView(
    near,
    engineContractId,
    dexId,
    intear_dex_otc_methods_const.get_authorized_key,
    args,
    (reader: BorshReader) => reader.option((item) => item.publicKey()),
  );
}
// =================================================
// copyright 2026 by sleet.near
