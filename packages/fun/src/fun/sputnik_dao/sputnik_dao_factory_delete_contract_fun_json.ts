// =================================================
// sputnik_dao_factory_delete_contract_fun_json
//
// Call: the V2 factory's `delete_contract`. Removes a stored DAO
// contract code and its metadata.
//
// Only the current factory owner may call it. The default contract
// cannot be deleted.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_factory_delete_contract_fun_json(
  near: Near,
  factory_contract_id: string,
  codeHash: string,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    factory_contract_id,
    sputnik_dao_factory_methods_const.delete_contract,
    { code_hash: codeHash },
    { attachedDeposit: 0n },
  );
}
// =================================================
// copyright 2026 by sleet.near
