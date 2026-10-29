// =================================================
// generic_contract_call_web
//
// Sends generic contract-call transactions from a browser wallet.
//
// The input is one transaction or an array of transactions. Every
// transaction contains an `actions` array, so the sender decides whether
// a transaction has one function call or several actions. Each input
// transaction is sent as its own transaction; the helper never combines
// separate transactions into one batched transaction.
//
// The signer is resolved from the connected browser wallet by near-kit,
// the same way `near.call(...)` resolves it.
//
// Browser wallets often ask the user to approve every transaction. This
// helper therefore sends transactions sequentially by default. Set
// `send_in_parallel` to true when the wallet supports approving several
// requests without causing a nonce race.
// =================================================
import type { Near } from "near-kit";
import {
  send_generic_contract_transaction,
  send_generic_contract_transactions,
} from "./generic_contract_call";
import type {
  generic_contract_call_result_type,
  generic_contract_call_results_type,
  generic_contract_transaction_type,
  generic_contract_transactions_type,
} from "./generic_contract_call_types";

// =================================================
// Sends one generic transaction through the browser wallet.
// params:
//   near: the browser NEAR client
//   transaction: the transaction and its actions
// returns the transaction hash
export async function generic_contract_call_web(
  near: Near,
  transaction: generic_contract_transaction_type,
): Promise<generic_contract_call_result_type> {
  return send_generic_contract_transaction(near, transaction);
}

// =================================================
// Sends one or more generic transactions through the browser wallet.
// params:
//   near: the browser NEAR client
//   transactions: one transaction or an array of transactions
//   send_in_parallel: send transactions concurrently; defaults to false
// returns one result for a single transaction, or an ordered result list
export async function generic_contract_call_web_transactions(
  near: Near,
  transactions: generic_contract_transactions_type,
  send_in_parallel?: false,
): Promise<generic_contract_call_result_type>;
export async function generic_contract_call_web_transactions(
  near: Near,
  transactions: generic_contract_transactions_type,
  send_in_parallel: true,
): Promise<generic_contract_call_results_type>;
export async function generic_contract_call_web_transactions(
  near: Near,
  transactions: generic_contract_transactions_type,
  send_in_parallel = false,
): Promise<
  generic_contract_call_result_type | generic_contract_call_results_type
> {
  return send_generic_contract_transactions(
    near,
    transactions,
    send_in_parallel,
  );
}
// =================================================
// copyright 2026 by sleet.near
