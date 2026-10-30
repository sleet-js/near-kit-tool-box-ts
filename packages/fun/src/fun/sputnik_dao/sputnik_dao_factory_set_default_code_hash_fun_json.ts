// =================================================
// sputnik_dao_factory_set_default_code_hash_fun_json
//
// Call: the V2 factory's `set_default_code_hash`. Only the current
// factory owner may call it, and the hash must already be stored.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_factory_set_default_code_hash_fun_json(
  near: Near,
  factory_contract_id: string,
  codeHash: string,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    factory_contract_id,
    sputnik_dao_factory_methods_const.set_default_code_hash,
    { code_hash: codeHash },
    { attachedDeposit: 0n },
  );
}
// =================================================
// copyright 2026 by sleet.near
