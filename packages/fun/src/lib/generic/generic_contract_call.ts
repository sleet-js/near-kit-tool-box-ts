// =================================================
// generic_contract_call
//
// Generic contract-call helper for near-kit's `Near` client.
//
// One input transaction is sent as one NEAR transaction. The actions in
// that transaction run in array order, so a transaction can hold one
// function call or several function calls.
//
// An input array is sent as a list of separate transactions. Transactions
// are sent sequentially by default, which is the safe choice for a
// client signing with one private key. Set `send_in_parallel` to true
// for concurrent sending.
//
// Browser wallets that support `signAndSendTransactions` (plural) can
// use `generic_contract_call_wallet` instead. That helper sends the
// whole list through one wallet popup.
// =================================================
import type { Near } from "near-kit";
import type {
  generic_contract_call_options_type,
  generic_contract_call_result_type,
  generic_contract_call_results_type,
  generic_contract_transaction_type,
  generic_contract_transactions_type,
} from "./generic_contract_call_types";

// =================================================
// Sends one or more generic transactions with near-kit.
// params:
//   near: the NEAR client
//   transactions: one transaction or an array of transactions
//   options: `send_in_parallel` sends transactions concurrently
// returns one result for a single transaction, or an ordered result list
export async function generic_contract_call_fun(
  near: Near,
  transaction: generic_contract_transaction_type,
  options?: generic_contract_call_options_type,
): Promise<generic_contract_call_result_type>;
export async function generic_contract_call_fun(
  near: Near,
  transactions: generic_contract_transaction_type[],
  options?: generic_contract_call_options_type,
): Promise<generic_contract_call_results_type>;
export async function generic_contract_call_fun(
  near: Near,
  transactions: generic_contract_transactions_type,
  options: generic_contract_call_options_type = {},
): Promise<
  generic_contract_call_result_type | generic_contract_call_results_type
> {
  const list = Array.isArray(transactions) ? transactions : [transactions];
  if (list.length === 0) {
    return [];
  }

  if (options.send_in_parallel) {
    return Promise.all(
      list.map((transaction) =>
        send_generic_contract_transaction(near, transaction),
      ),
    );
  }

  const results: generic_contract_call_result_type[] = [];
  for (const transaction of list) {
    results.push(await send_generic_contract_transaction(near, transaction));
  }
  return results;
}

// =================================================
// Sends one generic transaction with near-kit.
// params:
//   near: the NEAR client
//   transaction: the transaction and its actions
// returns the transaction hash
async function send_generic_contract_transaction(
  near: Near,
  transaction: generic_contract_transaction_type,
): Promise<generic_contract_call_result_type> {
  if (transaction.actions.length === 0) {
    throw new Error(
      "A generic contract transaction must contain at least one action",
    );
  }

  const signer_id = await resolve_signer_id(near);
  const builder = near.transaction(signer_id);
  for (const action of transaction.actions) {
    if (action.kind !== "function_call") {
      throw new Error(`Unsupported generic contract action: ${action.kind}`);
    }
    builder.functionCall(
      action.contract_id,
      action.method_name,
      action.args ?? {},
      {
        gas: action.gas,
        attachedDeposit: action.attached_deposit,
      },
    );
  }

  const outcome = await builder.send(
    transaction.wait_until ? { waitUntil: transaction.wait_until } : {},
  );
  const transaction_hash =
    outcome.transaction?.hash ?? get_transaction_hash(outcome);
  if (!transaction_hash) {
    throw new Error(
      "The generic contract transaction was sent without a transaction hash",
    );
  }
  return { transaction_hash };
}

// =================================================
// Resolves the signer from the NEAR client, like `near.call(...)` does.
// Priority: the client's default signer, then the connected wallet account.
// =================================================
async function resolve_signer_id(near: Near): Promise<string> {
  const get_signer_id = (
    near as unknown as {
      getSignerId?: (signer_id?: string) => Promise<string>;
    }
  ).getSignerId;
  if (get_signer_id) {
    return await get_signer_id.call(near);
  }

  const default_signer_id = (near as unknown as { defaultSignerId?: string })
    .defaultSignerId;
  if (default_signer_id) {
    return default_signer_id;
  }

  throw new Error("No signer is configured on this NEAR client");
}

// =================================================
// Reads the transaction hash from an execution outcome that did not
// include the transaction details (for example, `wait_until: "NONE"`).
// =================================================
function get_transaction_hash(outcome: {
  status?: unknown;
}): string | undefined {
  const status = outcome.status;
  if (
    typeof status !== "object" ||
    status === null ||
    !("SuccessReceiptId" in status)
  ) {
    return undefined;
  }
  const receipt_id = status.SuccessReceiptId;
  return typeof receipt_id === "string" ? receipt_id : undefined;
}
// =================================================
// copyright 2026 by sleet.near
