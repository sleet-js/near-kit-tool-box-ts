// =================================================
// ft_storage_deposit_fun_json
//
// Call (NEP-145): `storage_deposit`. Pays the standard NEP-145
// storage deposit (`"0.00125 NEAR"`) to register the signer's storage
// on this NEP-141 contract. No args are required.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { ft_methods_const } from "../../lib/methods/methods_ft";
// =================================================
export async function ft_storage_deposit_fun_json(
  near: Near,
  ft_contract_id: string,
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    ft_contract_id,
    ft_methods_const.storage_deposit,
    {},
    { attachedDeposit: "0.00125 NEAR" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
