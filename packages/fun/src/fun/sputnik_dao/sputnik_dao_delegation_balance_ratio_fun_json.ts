// =================================================
// sputnik_dao_delegation_balance_ratio_fun_json
//
// View: the DAO's `delegation_balance_ratio`. Returns an account's
// delegated voting power and the share of the DAO's total it is, as
// a pair of strings.
//
// The arg is `account_id`.
//
// --- WHY --- the pair is `[balance, ratio]`, where the ratio is the
// account's share of the DAO's delegated voting power.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
import type { SPUTNIK_DAO_DELEGATION_BALANCE_RATIO_TYPE } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_delegation_balance_ratio_fun_json(
  near: Near,
  daoContractId: string,
  account_id: sputnik_dao_args["account_id"],
): Promise<SPUTNIK_DAO_DELEGATION_BALANCE_RATIO_TYPE> {
  const result = await near.view(
    daoContractId,
    sputnik_dao_methods_const.delegation_balance_ratio,
    { account_id },
  );
  return result as SPUTNIK_DAO_DELEGATION_BALANCE_RATIO_TYPE;
}
// =================================================
// copyright 2026 by sleet.near
