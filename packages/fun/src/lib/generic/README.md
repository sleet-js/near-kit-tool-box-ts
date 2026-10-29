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

## Call with near-kit

`generic_contract_call_fun` works with any near-kit `Near` client: a backend
client with a private key, or a browser client with a wallet.

```ts
import { generic_contract_call_fun } from "@near-kit-tool-box/fun";

const transactions = [
  {
    actions: [
      {
        kind: "function_call",
        contract_id: "hello.sleet.near",
        method_name: "set_greeting",
        args: { greeting: "hello" },
        gas: "3 Tgas",
      },
    ],
  },
  {
    actions: [
      {
        kind: "function_call",
        contract_id: "hello.sleet.near",
        method_name: "set_greeting",
        args: { greeting: "again" },
      },
      {
        kind: "function_call",
        contract_id: "another.sleet.near",
        method_name: "do_something",
        args: { id: 1 },
        attached_deposit: "1 yocto",
      },
    ],
  },
];

const results = await generic_contract_call_fun(near, transactions);
// [{ transaction_hash: "..." }, { transaction_hash: "..." }]
```

One input transaction becomes one NEAR transaction. The actions in that
transaction run in array order, so a transaction can hold one function call
or several function calls. An input array is a list of separate
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

The whole transaction list is handed to the wallet in one call. The signer
is the connected wallet account.

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
