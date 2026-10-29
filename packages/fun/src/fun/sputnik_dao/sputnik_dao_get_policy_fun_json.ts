// =================================================
// sputnik_dao_get_policy_fun_json
//
// View: the DAO's `get_policy`. Returns the roles and who is in them.
//
// There is NO method that lists every member of a DAO. The policy
// holds role -> member lists, so the members are the union of the
// roles' member lists.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import {
  SPUTNIK_DAO_POLICY_TYPE_Z_CONST,
  type SPUTNIK_DAO_POLICY_TYPE,
} from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_get_policy_fun_json(
  near: Near,
  dao_contract_id: string,
): Promise<SPUTNIK_DAO_POLICY_TYPE> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.get_policy,
    {},
  );
  return SPUTNIK_DAO_POLICY_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
