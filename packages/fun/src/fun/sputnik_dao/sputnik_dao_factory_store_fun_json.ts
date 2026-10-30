// =================================================
// sputnik_dao_factory_store_fun_json
//
// Call: the V2 factory's `store`. Stores raw DAO contract WASM in the
// factory for later use.
//
// Only the current factory owner may call it. The input is the raw
// WASM bytes, not JSON. The attached deposit must cover the contract's
// local storage cost plus the global-contract registration cost.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import type { AMOUNT_INPUT } from "../../types/amount_input_type";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_factory_store_fun_json(
  near: Near,
  factory_contract_id: string,
  wasm: Uint8Array,
  attachedDeposit: AMOUNT_INPUT,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    factory_contract_id,
    sputnik_dao_factory_methods_const.store,
    wasm,
    { attachedDeposit, gas: "60 Tgas" },
  );
}
// =================================================
// copyright 2026 by sleet.near
