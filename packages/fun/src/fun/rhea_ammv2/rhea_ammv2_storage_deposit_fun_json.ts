// =================================================
// rhea_ammv2_storage_deposit_fun_json
//
// Call: `storage_deposit`. Pays `attachedDeposit` to register
// (or top up) the signer's storage in the rhea_ammv2 contract.
// `attachedDeposit` covers NEP-145 storage staking.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { AMOUNT_INPUT } from "../../types/AmountInput";
// =================================================
export async function rhea_ammv2_storage_deposit_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
  attached_deposit: AMOUNT_INPUT,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.storage_deposit,
    {},
    { attachedDeposit: attached_deposit },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
