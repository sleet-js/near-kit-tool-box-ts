// =================================================
// sputnik_dao_get_bounty_claims_fun_json
//
// View: the DAO's `get_bounty_claims`. Returns the accounts that
// claimed a bounty, and how much each of them took.
//
// The only arg is `account_id` — the contract panics with
// `missing field 'account_id'` without it, and ignores any other
// field.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
// =================================================
export async function sputnik_dao_get_bounty_claims_fun_json(
  near: Near,
  dao_contract_id: string,
  account_id: sputnik_dao_args["account_id"],
): Promise<unknown[]> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.get_bounty_claims,
    { account_id },
  );
  return (result as unknown[] | undefined) ?? [];
}
// =================================================
// copyright 2026 by sleet.near
