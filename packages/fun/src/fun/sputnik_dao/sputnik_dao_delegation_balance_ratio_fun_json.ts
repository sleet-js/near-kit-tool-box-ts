// =================================================
// sputnik_dao_delegation_balance_ratio_fun_json
//
// View: the DAO's `delegation_balance_ratio`. Returns an account's
// delegated voting power and the DAO's total delegated voting power,
// as a pair of strings.
//
// The contract answers `[balance, total]` — it does not divide them
// into a ratio.
//
// The arg is `account_id`.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
import {
  SPUTNIK_DAO_DELEGATION_BALANCE_RATIO_TYPE_Z_CONST,
  type SPUTNIK_DAO_DELEGATION_BALANCE_RATIO_TYPE,
} from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_delegation_balance_ratio_fun_json(
  near: Near,
  dao_contract_id: string,
  account_id: sputnik_dao_args["account_id"],
): Promise<SPUTNIK_DAO_DELEGATION_BALANCE_RATIO_TYPE> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.delegation_balance_ratio,
    { account_id },
  );
  return SPUTNIK_DAO_DELEGATION_BALANCE_RATIO_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
