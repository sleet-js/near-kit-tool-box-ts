// =================================================
// sputnik_dao_update_fun_json
//
// Call: the DAO's `update`. Deploys new contract WASM to the DAO.
//
// The method input is the raw new WASM, not JSON. It does not appear
// in the contract's ABI, so `near contract inspect` shows no argument
// shape for it.
//
// Only the DAO itself may call it, or its factory when the DAO's
// `auto_update` is on. When the factory triggers it, the DAO first
// requires an `UpgradeSelf` proposal whose hash matches the incoming
// code, and that proposal must be at least two weeks old — otherwise
// a new `UpgradeSelf` proposal is created and nothing is deployed.
//
// The attached deposit is 0.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_update_fun_json(
  near: Near,
  dao_contract_id: string,
  wasm: Uint8Array,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    dao_contract_id,
    sputnik_dao_methods_const.update,
    wasm,
    { attachedDeposit: 0n, gas: "60 Tgas" },
  );
}
// =================================================
// copyright 2026 by sleet.near
