# HELLO

greeting contract bins.

one bin per `fun` helper — a view that reads the greeting and a call
that sets it.

---

#### CONTRACT ID PER NETWORK

- MAINNET: hello.sleet.near
- TESTNET: hello.sleet.testnet

#### EXAMPLES

```sh
# view: read the current greeting
bun run bin/hello/hello_get.ts
bun run bin/hello/hello_get.ts --contract-id hello.sleet.testnet

# call: set the greeting (needs a signer)
bun run bin/hello/hello_set.ts --greeting "Hello from near kit"
```

#### FLAGS

| bin            | flags                                               |
| -------------- | --------------------------------------------------- |
| `hello_get.ts` | `--contract-id` (optional)                          |
| `hello_set.ts` | `--greeting` (required), `--contract-id` (optional) |

==========================
<br/>
copyright 2026 by sleet.near
