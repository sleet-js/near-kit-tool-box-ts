// =================================================
// generic_contract_call_env
//
// Sends generic contract-call transactions from a backend NEAR client.
//
// The input is one transaction or an array of transactions. Every
// transaction contains an `actions` array, so the sender decides whether
// a transaction has one function call or several actions. Each input
// transaction is sent as its own transaction; the helper never combines
// separate transactions into one batched transaction.
//
// The backend signer is resolved by near-kit from the client's configured
// private key/key store/default signer. `signer_id` on a transaction is
// optional and overrides that default for that transaction.
//
// Transactions are sent sequentially by default. This avoids nonce
// conflicts when one private key signs several transactions. Set
// `send_in_parallel` to true only when the client is configured with a
// rotating key store and concurrent transactions are intended.
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
// Sends one generic transaction through the backend NEAR client.
// params:
//   near: the backend NEAR client
//   transaction: the transaction and its actions
// returns the transaction hash
export async function generic_contract_call_env(
  near: Near,
  transaction: generic_contract_transaction_type,
): Promise<generic_contract_call_result_type> {
  return send_generic_contract_transaction(
    near,
    resolve_env_signer_id(near, transaction),
    transaction,
  );
}

// =================================================
// Sends one or more generic transactions through the backend NEAR client.
// params:
//   near: the backend NEAR client
//   transactions: one transaction or an array of transactions
//   send_in_parallel: send transactions concurrently; defaults to false
// returns one result for a single transaction, or an ordered result list
export async function generic_contract_call_env_transactions(
  near: Near,
  transactions: generic_contract_transactions_type,
  send_in_parallel?: false,
): Promise<generic_contract_call_result_type>;
export async function generic_contract_call_env_transactions(
  near: Near,
  transactions: generic_contract_transactions_type,
  send_in_parallel: true,
): Promise<generic_contract_call_results_type>;
export async function generic_contract_call_env_transactions(
  near: Near,
  transactions: generic_contract_transactions_type,
  send_in_parallel = false,
): Promise<
  generic_contract_call_result_type | generic_contract_call_results_type
> {
  return send_generic_contract_transactions(
    near,
    transactions,
    (transaction) => resolve_env_signer_id(near, transaction),
    send_in_parallel,
  );
}

// =================================================
// Resolves the signer for a backend transaction.
// An explicit `signer_id` wins. Otherwise near-kit's configured default
// signer is used, matching the behavior of the existing `near.call`
// helpers.
// =================================================
function resolve_env_signer_id(
  near: Near,
  transaction: generic_contract_transaction_type,
): string {
  if (transaction.signer_id) {
    return transaction.signer_id;
  }
  const signer_id = (near as unknown as { defaultSignerId?: string })
    .defaultSignerId;
  if (!signer_id) {
    throw new Error(
      "No signer id is configured on this NEAR client; set defaultSignerId on Near or signer_id on the transaction",
    );
  }
  return signer_id;
}
// =================================================
// copyright 2026 by sleet.near
