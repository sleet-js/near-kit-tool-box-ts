// =================================================
// generic_contract_call_types
//
// Types for generic contract calls.
//
// The shape follows the NEAR action naming used by the INTEAR
// dex-aggregator and other NEAR tooling:
//
//   - one transaction has one `receiver_id` and an `actions` array
//   - one action is `{ FunctionCall: { ... } }`
//   - `gas` is raw gas units, `deposit` is raw yoctoNEAR
//
// `gas` and `deposit` also accept near-kit's human-readable forms
// (`"30 Tgas"`, `"1 NEAR"`) because near-kit accepts both.
//
// `args` is JSON only. A consumer that receives base64-encoded args
// (the dex-aggregator sends them that way) decodes them itself and
// hands the generic helper plain JSON.
//
// Applications with their own storage or queue model should transform
// their data into these types before calling the generic helpers.
// =================================================

// =================================================
// One function-call action.
// =================================================
export interface generic_contract_function_call_action_type {
  FunctionCall: {
    method_name: string;
    args: Record<string, unknown>;
    // Raw gas units, or near-kit's human-readable form.
    gas?: number | string;
    // Raw yoctoNEAR, or near-kit's human-readable form.
    deposit?: number | string | bigint;
  };
}

// =================================================
// One action in a generic transaction.
// Currently only function calls are supported.
// =================================================
export type generic_contract_action_type =
  generic_contract_function_call_action_type;

// =================================================
// One generic transaction. The actions execute in array order.
// A transaction may contain one action or several actions.
// =================================================
export interface generic_contract_transaction_type {
  receiver_id: string;
  actions: generic_contract_action_type[];
  wait_until?:
    | "NONE"
    | "INCLUDED"
    | "EXECUTED_OPTIMISTIC"
    | "INCLUDED_FINAL"
    | "EXECUTED"
    | "FINAL";
}

// =================================================
// A single transaction or a list of transactions.
// This is the input accepted by the generic call helpers.
// =================================================
export type generic_contract_transactions_type =
  generic_contract_transaction_type | generic_contract_transaction_type[];

// =================================================
// The result of one successfully sent transaction.
// =================================================
export interface generic_contract_call_result_type {
  transaction_hash: string;
}

// =================================================
// The results of a list of sent transactions. Results preserve the order
// of the input transactions.
// =================================================
export type generic_contract_call_results_type =
  generic_contract_call_result_type[];

// =================================================
// Options for the near-kit generic call helper.
// =================================================
export interface generic_contract_call_options_type {
  // Send transactions one at a time; this is the safe default.
  send_in_parallel?: boolean;
}
