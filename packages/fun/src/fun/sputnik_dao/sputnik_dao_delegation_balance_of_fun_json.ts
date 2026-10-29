// =================================================
// sputnik_dao_delegation_balance_of_fun_json
//
// View: the DAO's `delegation_balance_of`. Returns the delegated
// voting power an account holds, as a string.
//
// The arg is `account_id` — the contract panics with
// `missing field 'account_id'` without it.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
import {
  SPUTNIK_DAO_DELEGATION_BALANCE_TYPE_Z_CONST,
  type SPUTNIK_DAO_DELEGATION_BALANCE_TYPE,
} from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_delegation_balance_of_fun_json(
  near: Near,
  dao_contract_id: string,
  account_id: sputnik_dao_args["account_id"],
): Promise<SPUTNIK_DAO_DELEGATION_BALANCE_TYPE> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.delegation_balance_of,
    { account_id },
  );
  return SPUTNIK_DAO_DELEGATION_BALANCE_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
