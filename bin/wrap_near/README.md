# WRAP_NEAR

wNEAR bins.

wraps NEAR into wNEAR (a NEP-141 token) and unwraps it back. both bins
are calls — they need a signer.

---

#### CONTRACT ID PER NETWORK

- MAINNET: wrap.near
- TESTNET: wrap.testnet

#### EXAMPLES

```sh
# call: wrap NEAR into wNEAR
bun run bin/wrap_near/wrap_near_deposit.ts --amount "2 NEAR"

# call: unwrap wNEAR back into NEAR (amount in yocto)
bun run bin/wrap_near/wrap_near_withdraw.ts --amount 2000000000000000000000000
```

#### FLAGS

`--contract-id` is optional on both bins — it falls back to the
per-network default.

| bin                     | flags                 |
| ----------------------- | --------------------- |
| `wrap_near_deposit.ts`  | `--amount` (required) |
| `wrap_near_withdraw.ts` | `--amount` (required) |

==========================
<br/>
copyright 2026 by sleet.near
