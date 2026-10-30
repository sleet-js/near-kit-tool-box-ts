// =================================================
// sputnik_dao_factory_update_fun_json
//
// Call: the V2 factory's `update`. Updates a DAO created by the
// factory to a stored contract code hash.
//
// The factory owner or the DAO itself may call it, and the DAO must
// belong to the factory.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_factory_update_fun_json(
  near: Near,
  factory_contract_id: string,
  accountId: string,
  codeHash: string,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    factory_contract_id,
    sputnik_dao_factory_methods_const.update,
    { account_id: accountId, code_hash: codeHash },
    { attachedDeposit: 0n },
  );
}
// =================================================
// copyright 2026 by sleet.near
