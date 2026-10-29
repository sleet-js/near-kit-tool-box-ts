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

## Calls

The call helpers accept the same JSON-friendly transaction shape. A
transaction contains an `actions` array. Each action currently describes
one contract function call. A transaction can contain one action or several
actions; the actions run in array order inside that one transaction.

The input can be one transaction or an array of transactions. Every array
entry is a separate transaction. The helpers never combine separate
transactions into one batched transaction.

```ts
import {
  generic_contract_call_web,
  generic_contract_call_web_transactions,
} from "@near-kit-tool-box/fun";

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

const results = await generic_contract_call_web_transactions(
  near,
  transactions,
);
// [{ transaction_hash: "..." }, { transaction_hash: "..." }]
```

Use `generic_contract_call_web` for exactly one transaction.

The browser helper uses the connected wallet account. Near-kit resolves
the signer internally, just like the existing `near.call(...)` helpers.
Browser transactions are sent sequentially by default; pass `true` as the
third argument to `generic_contract_call_web_transactions` to send them
concurrently.

## Backend calls

```ts
import {
  generic_contract_call_env,
  generic_contract_call_env_transactions,
} from "@near-kit-tool-box/fun";

const result = await generic_contract_call_env(near, transactions[0]);
const results = await generic_contract_call_env_transactions(
  near,
  transactions,
);
```

The backend helper uses the signer configured on the NEAR client. Near-kit
resolves the signer internally, just like the existing `near.call(...)`
helpers. Backend transactions are sent sequentially by default to avoid
nonce conflicts with one private key. Pass `true` as the third argument to
`generic_contract_call_env_transactions` only when using a rotating key
store for concurrent transactions.

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
