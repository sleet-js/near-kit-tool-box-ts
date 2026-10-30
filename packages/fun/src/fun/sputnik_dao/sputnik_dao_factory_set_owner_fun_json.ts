// =================================================
// sputnik_dao_factory_set_owner_fun_json
//
// Call: the V2 factory's `set_owner`. Only the current factory owner
// may call it.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_factory_set_owner_fun_json(
  near: Near,
  factory_contract_id: string,
  ownerId: string,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    factory_contract_id,
    sputnik_dao_factory_methods_const.set_owner,
    { owner_id: ownerId },
    { attachedDeposit: 0n },
  );
}
// =================================================
// copyright 2026 by sleet.near
