// =================================================
// intear_dex_otc_storage_balance_of_fun_json
//
// View: the otc dex's `storage_balance_of`. Returns the NEAR storage
// deposit an account has with the otc dex, or `null` when the
// account has no storage registered.
//
// `total` is the deposited amount and `used` is the part of it the
// account's entries take up. The rest can be withdrawn.
// =================================================
import type { Near } from "near-kit";
import { BorshReader, BorshWriter } from "../../lib/borsh/intear_dex_borsh";
import { intearDexView } from "../../lib/borsh/intear_dex_view";
import { intear_dex_otc_methods_const } from "../../lib/methods/methods_intear_dex_otc";
import type { intear_dex_otc_args } from "../../lib/args/intear_dex_otc_args";
import type { INTEAR_DEX_OTC_STORAGE_BALANCE_TYPE } from "../../types/intear_dex_otc_types";
// =================================================
export async function intear_dex_otc_storage_balance_of_fun_json(
  near: Near,
  engineContractId: string,
  dexId: string,
  account_id: intear_dex_otc_args["owner_account_id"],
): Promise<INTEAR_DEX_OTC_STORAGE_BALANCE_TYPE | null> {
  const args = new BorshWriter().string(account_id).toBytes();
  return intearDexView(
    near,
    engineContractId,
    dexId,
    intear_dex_otc_methods_const.storage_balance_of,
    args,
    (reader: BorshReader) =>
      reader.option((item) => ({
        total: item.u128().toString(),
        used: item.u128().toString(),
      })),
  );
}
// =================================================
// copyright 2026 by sleet.near
