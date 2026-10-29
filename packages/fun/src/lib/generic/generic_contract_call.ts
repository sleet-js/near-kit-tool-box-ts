// =================================================
// generic_contract_call
//
// Shared implementation for the browser and backend generic contract-call
// helpers. The public `generic_contract_call_web` and
// `generic_contract_call_env` functions live in their own files.
// =================================================
import type { Near } from "near-kit";
import type {
  generic_contract_call_result_type,
  generic_contract_call_results_type,
  generic_contract_transaction_type,
  generic_contract_transactions_type,
} from "./generic_contract_call_types";

// =================================================
// Sends one generic transaction.
// params:
//   near: the NEAR client
//   signer_id: the account that signs and pays for the transaction
//   transaction: the transaction and its actions
// returns the transaction hash
export async function send_generic_contract_transaction(
  near: Near,
  signer_id: string,
  transaction: generic_contract_transaction_type,
): Promise<generic_contract_call_result_type> {
  if (transaction.actions.length === 0) {
    throw new Error(
      "A generic contract transaction must contain at least one action",
    );
  }

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
// Sends one or more generic transactions sequentially or in parallel.
// params:
//   near: the NEAR client
//   transactions: one transaction or an array of transactions
//   resolve_signer_id: resolves the signer for each transaction
//   send_in_parallel: send transactions concurrently; defaults to false
// returns one result for a single transaction, or an ordered result list
export async function send_generic_contract_transactions(
  near: Near,
  transactions: generic_contract_transactions_type,
  resolve_signer_id: (
    transaction: generic_contract_transaction_type,
  ) => string | Promise<string>,
  send_in_parallel = false,
): Promise<
  generic_contract_call_result_type | generic_contract_call_results_type
> {
  const list = Array.isArray(transactions) ? transactions : [transactions];
  if (list.length === 0) {
    return [];
  }

  if (send_in_parallel) {
    return Promise.all(
      list.map(async (transaction) =>
        send_generic_contract_transaction(
          near,
          await resolve_signer_id(transaction),
          transaction,
        ),
      ),
    );
  }

  const results: generic_contract_call_result_type[] = [];
  for (const transaction of list) {
    results.push(
      await send_generic_contract_transaction(
        near,
        await resolve_signer_id(transaction),
        transaction,
      ),
    );
  }
  return results;
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
