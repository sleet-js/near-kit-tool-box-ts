// =================================================
// generic_contract_call_wallet
//
// Generic contract-call helper for browser wallets.
//
// The wallet must implement `signAndSendTransactions` (plural), like
// `@hot-labs/near-connect` does. The whole transaction list is handed to
// the wallet in one call, so the user approves the list in one popup.
//
// One input transaction becomes one NEAR transaction. The actions in that
// transaction run in array order, so a transaction can hold one function
// call or several function calls.
//
// The signer is the connected wallet account. It is read from the
// wallet's connected accounts, so the caller does not need to pass it.
// =================================================
import type {
  generic_contract_call_result_type,
  generic_contract_call_results_type,
  generic_contract_transaction_type,
  generic_contract_transactions_type,
} from "./generic_contract_call_types";

// =================================================
// The wallet shape needed by this helper.
// `signAndSendTransactions` (plural) is the batched browser wallet API.
// =================================================
export interface generic_contract_wallet_type {
  getAccounts(): Promise<Array<{ accountId: string }>>;
  signAndSendTransactions(params: {
    signerId?: string;
    transactions: Array<{
      receiverId: string;
      actions: Array<generic_contract_wallet_action_type>;
    }>;
  }): Promise<Array<{ transaction?: { hash?: string } }>>;
}

// =================================================
// One wallet action. The wallet receives JSON arguments and human-readable
// gas/deposit values.
// =================================================
export interface generic_contract_wallet_action_type {
  type: "FunctionCall";
  params: {
    methodName: string;
    args: Record<string, unknown>;
    gas: string;
    deposit: string;
  };
}

// =================================================
// Sends one or more generic transactions through a browser wallet.
// params:
//   wallet: the browser wallet
//   transactions: one transaction or an array of transactions
// returns one result for a single transaction, or an ordered result list
export async function generic_contract_call_wallet(
  wallet: generic_contract_wallet_type,
  transaction: generic_contract_transaction_type,
): Promise<generic_contract_call_result_type>;
export async function generic_contract_call_wallet(
  wallet: generic_contract_wallet_type,
  transactions: generic_contract_transaction_type[],
): Promise<generic_contract_call_results_type>;
export async function generic_contract_call_wallet(
  wallet: generic_contract_wallet_type,
  transactions: generic_contract_transactions_type,
): Promise<
  generic_contract_call_result_type | generic_contract_call_results_type
> {
  const list = Array.isArray(transactions) ? transactions : [transactions];
  if (list.length === 0) {
    return [];
  }
  for (const transaction of list) {
    if (transaction.actions.length === 0) {
      throw new Error(
        "A generic contract transaction must contain at least one action",
      );
    }
  }

  const accounts = await wallet.getAccounts();
  const signer_id = accounts[0]?.accountId;
  if (!signer_id) {
    throw new Error("No browser wallet account is connected");
  }

  const wallet_transactions = list.map((transaction) =>
    to_wallet_transaction(transaction),
  );
  const outcomes = await wallet.signAndSendTransactions({
    signerId: signer_id,
    transactions: wallet_transactions,
  });

  const results = outcomes.map((outcome, index) => {
    const transaction_hash = outcome.transaction?.hash;
    if (!transaction_hash) {
      throw new Error(
        `The generic contract transaction ${index} was sent without a transaction hash`,
      );
    }
    return { transaction_hash };
  });

  return Array.isArray(transactions) ? results : results[0]!;
}

// =================================================
// Converts one generic transaction into the wallet's transaction shape.
// The first action's contract becomes the transaction receiver. All the
// transaction's actions are sent in that one transaction.
// =================================================
function to_wallet_transaction(
  transaction: generic_contract_transaction_type,
): {
  receiverId: string;
  actions: Array<generic_contract_wallet_action_type>;
} {
  const first_action = transaction.actions[0];
  if (!first_action) {
    throw new Error(
      "A generic contract transaction must contain at least one action",
    );
  }

  const actions = transaction.actions.map((action) => {
    if (action.kind !== "function_call") {
      throw new Error(`Unsupported generic contract action: ${action.kind}`);
    }
    return {
      type: "FunctionCall" as const,
      params: {
        methodName: action.method_name,
        args: action.args ?? {},
        gas: action.gas ?? "30 Tgas",
        deposit: String(action.attached_deposit ?? "0 yocto"),
      },
    };
  });

  return {
    receiverId: first_action.contract_id,
    actions,
  };
}
// =================================================
// copyright 2026 by sleet.near
