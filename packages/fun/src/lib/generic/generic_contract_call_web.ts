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
// The browser signer is resolved by near-kit from the connected wallet
// (or the client's configured default signer). `signer_id` on a
// transaction is optional and overrides that default for that
// transaction.
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
  return send_generic_contract_transaction(
    near,
    await resolve_web_signer_id(near, transaction),
    transaction,
  );
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
    (transaction) => resolve_web_signer_id(near, transaction),
    send_in_parallel,
  );
}

// =================================================
// Resolves the signer for a browser transaction.
// An explicit `signer_id` wins. Otherwise near-kit's connected wallet
// account is used, matching the behavior of the existing `near.call`
// helpers.
// =================================================
async function resolve_web_signer_id(
  near: Near,
  transaction: generic_contract_transaction_type,
): Promise<string> {
  if (transaction.signer_id) {
    return transaction.signer_id;
  }
  const configured_signer_id = (near as unknown as { defaultSignerId?: string })
    .defaultSignerId;
  if (configured_signer_id) {
    return configured_signer_id;
  }
  const accounts = await get_wallet_accounts(near);
  if (accounts.length === 0) {
    throw new Error(
      "No browser wallet account is connected; connect a wallet or set signer_id on the transaction",
    );
  }
  return accounts[0]!.accountId;
}

// =================================================
// Reads the connected wallet accounts from near-kit's configured wallet.
// This is intentionally kept behind a small helper so the public call
// API stays focused on transaction data.
// =================================================
async function get_wallet_accounts(
  near: Near,
): Promise<Array<{ accountId: string }>> {
  const wallet = (
    near as unknown as {
      wallet?: { getAccounts(): Promise<Array<{ accountId: string }>> };
    }
  ).wallet;
  if (!wallet) {
    throw new Error("No browser wallet is configured on this NEAR client");
  }
  return wallet.getAccounts();
}
// =================================================
// copyright 2026 by sleet.near
