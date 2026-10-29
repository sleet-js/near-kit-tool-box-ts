// =================================================
// sputnik_dao_get_bounty_claims_fun_json
//
// View: the DAO's `get_bounty_claims`. Returns the bounty claims one
// account holds, and how far each of them has run.
//
// The only arg is `account_id` — the contract panics with
// `missing field 'account_id'` without it, and ignores any other
// field.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
import {
  SPUTNIK_DAO_BOUNTY_CLAIMS_TYPE_Z_CONST,
  type SPUTNIK_DAO_BOUNTY_CLAIM_TYPE,
} from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_get_bounty_claims_fun_json(
  near: Near,
  dao_contract_id: string,
  account_id: sputnik_dao_args["account_id"],
): Promise<SPUTNIK_DAO_BOUNTY_CLAIM_TYPE[]> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.get_bounty_claims,
    { account_id },
  );
  if (result === undefined) return [];
  return SPUTNIK_DAO_BOUNTY_CLAIMS_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
