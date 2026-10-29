// =================================================
// near_create_account_fun_json
//
// Call (NEP-...): the TLD registrar/linkdrop `create_account` method.
// Creates a sub-account `new_account_id` of the TLD registrar and
// grants `new_public_key` full-access on the new sub-account.
// Attaches `"30 Tgas"`. The registrar contract id (`"testnet"` /
// `"near"`) is resolved by the caller.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { near_methods_const } from "../../lib/methods/methods_near";
// =================================================
export async function near_create_account_fun_json(
  near: Near,
  tld_contract_id: string,
  new_account_id: string,
  new_public_key: string,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    tld_contract_id,
    near_methods_const.create_account,
    { new_account_id, new_public_key },
    { gas: "30 Tgas" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
