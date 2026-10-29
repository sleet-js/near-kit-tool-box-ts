// =================================================
// generic_contract_call_types
//
// JSON-friendly transaction and action types shared by the generic
// contract-call helpers. These types are the contract between a caller
// (or queue file) and the sender: a transaction has one or more actions,
// and every action currently describes a contract function call.
//
// The names intentionally use snake_case so the same object can be stored
// directly as queue JSON without a second conversion layer.
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
  signer_id?: string;
  wait_until?:
    | "NONE"
    | "INCLUDED"
    | "EXECUTED_OPTIMISTIC"
    | "INCLUDED_FINAL"
    | "EXECUTED"
    | "FINAL";
  // Optional queue metadata. The generic sender ignores these fields;
  // they let a queue application keep its file state on the same object.
  network_id?: string;
  status?: "to_send" | "sent" | "completed" | "failed";
  created_at?: string;
  completed_hash?: string | null;
  failure?: string | null;
}

// =================================================
// A single transaction or a list of transactions.
// This is the input accepted by the generic web/env call helpers.
// =================================================
export type generic_contract_transactions_type =
  generic_contract_transaction_type | generic_contract_transaction_type[];

// =================================================
// A helper result for one transaction. The transaction hash is always
// available when near-kit successfully broadcasts it.
// =================================================
export interface generic_contract_call_result_type {
  transaction_hash: string;
  status?: "to_send" | "sent" | "completed" | "failed";
}

// =================================================
// The result returned for a list of transactions. Results preserve the
// order of the input transactions.
// =================================================
export type generic_contract_call_results_type =
  generic_contract_call_result_type[];
// =================================================
// copyright 2026 by sleet.near
