// =================================================
// sputnik_dao_add_function_call_proposal_fun_json
//
// Call: the DAO's `add_proposal`, with a `FunctionCall` kind.
//
// A `FunctionCall` proposal names the contract to call and the methods
// to call on it. The contract stores each action's `args` as raw bytes
// (`Base64VecU8`), so this helper takes plain JSON arguments and
// base64-encodes them for you.
//
// The attached deposit must equal the DAO's current `proposal_bond`;
// the contract rejects both a smaller and a larger deposit.
//
// The DAO only executes the call after the proposal is approved, and
// the approval lands in the `on_proposal_callback` receipt — not in
// the receipt of the vote that triggered it.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import type { AMOUNT_INPUT } from "../../types/amount_input_type";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
import { json_to_base64 } from "../../lib/borsh/base64";
// =================================================

// =================================================
// One method call inside a `FunctionCall` proposal.
//
// `args` is the plain JSON the target method takes. It is base64
// encoded before it reaches the contract.
// `deposit` and `gas` are decimal strings in yoctoNEAR and yoctoGas.
export interface SPUTNIK_DAO_FUNCTION_CALL_ACTION_INPUT_TYPE {
  method_name: string;
  args?: unknown;
  deposit: string;
  gas: string;
}

// =================================================
// Adds a `FunctionCall` proposal to a Sputnik DAO V2.
// params:
//   near: the near-kit client
//   dao_contract_id: the DAO's account id
//   description: the proposal's description
//   receiver_id: the contract the DAO will call
//   actions: the method calls to make on it
//   attachedDeposit: the DAO's current proposal bond
// returns the transaction outcome
export async function sputnik_dao_add_function_call_proposal_fun_json(
  near: Near,
  dao_contract_id: string,
  description: string,
  receiver_id: string,
  actions: SPUTNIK_DAO_FUNCTION_CALL_ACTION_INPUT_TYPE[],
  attachedDeposit: AMOUNT_INPUT,
): Promise<FinalExecutionOutcome> {
  const kind: sputnik_dao_args["kind"] = {
    FunctionCall: {
      receiver_id,
      actions: actions.map((action) => ({
        method_name: action.method_name,
        args: action.args === undefined ? "" : json_to_base64(action.args),
        deposit: action.deposit,
        gas: action.gas,
      })),
    },
  };
  return await near.call(
    dao_contract_id,
    sputnik_dao_methods_const.add_proposal,
    { proposal: { description, kind } },
    { attachedDeposit, gas: "30 Tgas" },
  );
}
// =================================================
// copyright 2026 by sleet.near
