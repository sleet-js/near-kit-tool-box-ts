// =================================================
// generic_contract_call_types
//
// Minimal types for generic contract calls.
//
// These types describe only what the generic sender needs to build,
// sign, and send a transaction. Applications with their own storage or
// queue model should transform their data into these types before
// calling the generic helpers.
// =================================================

// =================================================
// One function-call action.
// `gas` accepts near-kit's gas input format, such as `"30 Tgas"`.
// `attached_deposit` accepts near-kit's amount input format, such as
// `"1 NEAR"` or `"1 yocto"`.
// =================================================
export interface generic_contract_function_call_action_type {
  kind: "function_call";
  contract_id: string;
  method_name: string;
  args?: Record<string, unknown>;
  gas?: `${number} Tgas` | `${number}.${number} Tgas` | `${number}`;
  attached_deposit?: `${number} NEAR` | `${bigint} yocto` | bigint;
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
