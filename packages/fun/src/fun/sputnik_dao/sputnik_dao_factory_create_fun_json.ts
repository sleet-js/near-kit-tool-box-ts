// =================================================
// sputnik_dao_factory_create_fun_json
//
// Call: the V2 factory's `create`. Creates one DAO as a subaccount of
// the factory.
//
// `name` is the DAO name, and `args` is the base64-encoded JSON body
// for the DAO's `new` method. The attached deposit pays for account
// creation, contract deployment, and the DAO's own initialization.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import type { AMOUNT_INPUT } from "../../types/amount_input_type";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_factory_create_fun_json(
  near: Near,
  factory_contract_id: string,
  name: string,
  args: string,
  attachedDeposit: AMOUNT_INPUT,
): Promise<FinalExecutionOutcome> {
  return await near.call(
    factory_contract_id,
    sputnik_dao_factory_methods_const.create,
    { name, args },
    { attachedDeposit, gas: "60 Tgas" },
  );
}
// =================================================
// copyright 2026 by sleet.near
