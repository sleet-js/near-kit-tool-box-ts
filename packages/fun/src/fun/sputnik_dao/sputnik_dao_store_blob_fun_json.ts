// =================================================
// sputnik_dao_store_blob_fun_json
//
// Call: the DAO's `store_blob`. Stores raw bytes in the DAO's blob
// store for later use by an upgrade proposal.
//
// The method input is the raw blob, not JSON. The attached deposit
// must cover the storage cost for the blob plus 32 bytes.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import type { AMOUNT_INPUT } from "../../types/amount_input_type";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_store_blob_fun_json(
  near: Near,
  dao_contract_id: string,
  blob: Uint8Array,
  attachedDeposit: AMOUNT_INPUT,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    dao_contract_id,
    sputnik_dao_methods_const.store_blob,
    blob,
    { attachedDeposit, gas: "30 Tgas" },
  );
}
// =================================================
// copyright 2026 by sleet.near
