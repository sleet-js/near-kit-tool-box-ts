// =================================================
// sputnik_dao_get_policy_fun_json
//
// View: the DAO's `get_policy`. Returns the roles and who is in them.
//
// --- WHY --- a role's `kind` is an enum with two shapes:
//   - `{ "Group": ["a.near", "b.near"] }` — the accounts in the role
//   - `"Everyone"` — a bare string, meaning any account may act in
//     the role. it names no accounts, so it has no member list.
//
// There is NO method that lists every member of a DAO. The policy
// holds role -> member lists, so the members are the union of the
// roles' member lists.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { SPUTNIK_DAO_POLICY_TYPE } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_get_policy_fun_json(
  near: Near,
  daoContractId: string,
): Promise<SPUTNIK_DAO_POLICY_TYPE> {
  const result = await near.view(
    daoContractId,
    sputnik_dao_methods_const.get_policy,
    {},
  );
  return result as SPUTNIK_DAO_POLICY_TYPE;
}
// =================================================
// copyright 2026 by sleet.near
