# Generic contract helpers

These helpers cover contract methods that do not have a dedicated helper in
`src/fun/<contract>/`, and contracts that are not in the toolbox at all.

## View

```ts
import { generic_contract_view_fun_json } from "@near-kit-tool-box/fun";

const greeting = await generic_contract_view_fun_json<string>(
  near,
  "hello.sleet.near",
  "get_greeting",
);
```

## The transaction shape

The shape follows the NEAR action naming used by the INTEAR dex-aggregator
and other NEAR tooling:

- one transaction has one `receiver_id` and an `actions` array
- one action is `{ FunctionCall: { method_name, args, gas, deposit } }`
- `gas` is raw gas units, `deposit` is raw yoctoNEAR

`gas` and `deposit` also accept near-kit's human-readable forms (`"30 Tgas"`,
`"1 NEAR"`, `"1 yocto"`) because near-kit accepts both.

`args` is JSON only. The dex-aggregator sends base64-encoded args on the
wire; a consumer that gets a route decodes them and hands the generic
helper plain JSON.

```ts
const transactions = [
  {
    receiver_id: "hello.sleet.near",
    actions: [
      {
        FunctionCall: {
          method_name: "set_greeting",
          args: { greeting: "hello" },
          gas: "30000000000000",
          deposit: "0",
        },
      },
      {
        FunctionCall: {
          method_name: "set_greeting",
          args: { greeting: "again" },
          gas: "30000000000000",
          deposit: "0",
        },
      },
    ],
  },
  {
    receiver_id: "other.sleet.near",
    actions: [
      {
        FunctionCall: {
          method_name: "do_something",
          args: { id: 1 },
          gas: "30000000000000",
          deposit: "0",
        },
      },
    ],
  },
];
```

The first entry is **one** NEAR transaction to `hello.sleet.near` with **two**
function-call actions. The second entry is **one** NEAR transaction to
`other.sleet.near` with **one** action. Two NEAR transactions in total.

## Call with near-kit

`generic_contract_call_fun` works with any near-kit `Near` client: a backend
client with a private key, or a browser client with a wallet.

```ts
import { generic_contract_call_fun } from "@near-kit-tool-box/fun";

const results = await generic_contract_call_fun(near, transactions);
// [{ transaction_hash: "..." }, { transaction_hash: "..." }]
```

One input transaction becomes one NEAR transaction. The actions in that
transaction run in array order. An input array is a list of separate
transactions; the helper never merges separate transactions into one.

Transactions are sent sequentially by default. This avoids nonce conflicts
when one private key signs several transactions. Send them concurrently with:

```ts
const results = await generic_contract_call_fun(near, transactions, {
  send_in_parallel: true,
});
```

The signer comes from the NEAR client, the same way `near.call(...)` gets
it: the configured default signer, or the connected wallet account.

## Call with a browser wallet

Browser wallets can approve several transactions in one popup when they
implement `signAndSendTransactions` (plural), like `@hot-labs/near-connect`
does.

```ts
import { generic_contract_call_wallet } from "@near-kit-tool-box/fun";
import { near_connect_client } from "@near-kit-tool-box/web";

const wallet = await near_connect_client().wallet();
const results = await generic_contract_call_wallet(wallet, transactions);
```

The whole transaction list is handed to the wallet in one call, so the user
approves the list in one popup. The signer is the connected wallet account.

## Using a dex-aggregator route

The INTEAR dex-aggregator's `NearTransaction` instruction is the same shape
as our transaction, except the args are base64-encoded and the transaction
is wrapped in `{ NearTransaction: ... }`. Convert it like this:

```ts
const transactions = route.execution_instructions.map((instruction) => {
  const tx = instruction.NearTransaction;
  return {
    receiver_id: tx.receiver_id,
    actions: tx.actions.map((action) => ({
      FunctionCall: {
        method_name: action.FunctionCall.method_name,
        args: decode_base64_json(action.FunctionCall.args),
        gas: action.FunctionCall.gas,
        deposit: action.FunctionCall.deposit,
      },
    })),
  };
});

await generic_contract_call_fun(near, transactions);
```

## Using the types

The transaction and action types are exported from
`@near-kit-tool-box/fun`. They are the minimal shape the generic sender
needs:

```ts
import type { generic_contract_transaction_type } from "@near-kit-tool-box/fun";
```

Applications with their own storage, queue, or persistence model should
transform their data into this shape before calling the generic helpers.
Queue state, retry metadata, timestamps, and relaying details are not part
of these generic types.

==========================
<br/>
copyright 2026 by sleet.near
