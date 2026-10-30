// =================================================
// sputnik_dao_factory_store_contract_metadata_fun_json
//
// Call: the V2 factory's `store_contract_metadata`. Registers metadata
// for a stored DAO contract code hash and optionally makes it the
// default code for new DAOs.
//
// Only the current factory owner may call it, and the code hash must
// already be stored.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { SPUTNIK_DAO_CONTRACT_METADATA_TYPE } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_factory_store_contract_metadata_fun_json(
  near: Near,
  factory_contract_id: string,
  codeHash: string,
  metadata: SPUTNIK_DAO_CONTRACT_METADATA_TYPE,
  setDefault: boolean,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    factory_contract_id,
    sputnik_dao_factory_methods_const.store_contract_metadata,
    { code_hash: codeHash, metadata, set_default: setDefault },
    { attachedDeposit: 0n },
  );
}
// =================================================
// copyright 2026 by sleet.near
