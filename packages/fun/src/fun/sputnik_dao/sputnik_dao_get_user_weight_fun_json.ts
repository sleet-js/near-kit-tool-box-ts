// =================================================
// sputnik_dao_get_user_weight_fun_json
//
// View: the DAO's `get_user_weight`. Returns the delegated voting
// weight of one account, in yocto units.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
import { AMOUNT_STRING_Z_CONST } from "../../types/scalar_type";
// =================================================
export async function sputnik_dao_get_user_weight_fun_json(
  near: Near,
  dao_contract_id: string,
  account_id: sputnik_dao_args["account_id"],
): Promise<string> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.get_user_weight,
    { account_id },
  );
  return AMOUNT_STRING_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
