// =================================================
// intear_dex_otc_storage_balance_of_fun_json
//
// View: the otc dex's `storage_balance_of`. Returns the NEAR storage
// deposit an account has with the otc dex, or `null` when the
// account has no storage registered.
//
// `total` is the deposited amount and `used` is the part of it the
// account's entries take up. The rest can be withdrawn.
//
// Both are u128, so they are `bigint`s.
// =================================================
import type { Near } from "near-kit";
import { b } from "@zorsh/zorsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { intear_dex_otc_storage_balance_schema } from "../../lib/borsh/intear_dex_otc_decode";
import { intear_dex_otc_methods_const } from "../../lib/methods/methods_intear_dex_otc";
import type { intear_dex_otc_args } from "../../lib/args/intear_dex_otc_args";
import type { INTEAR_DEX_OTC_STORAGE_BALANCE_TYPE } from "../../types/intear_dex_otc_types";
// =================================================
export async function intear_dex_otc_storage_balance_of_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
  account_id: intear_dex_otc_args["owner_account_id"],
): Promise<INTEAR_DEX_OTC_STORAGE_BALANCE_TYPE | null> {
  const args = b.string().serialize(account_id);
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_otc_methods_const.storage_balance_of,
    args,
    b.option(intear_dex_otc_storage_balance_schema),
  );
}
// =================================================
// copyright 2026 by sleet.near
