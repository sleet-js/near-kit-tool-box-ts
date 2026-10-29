# INTEAR_DEX_XYK

INTEAR DEX xyk sub-dex bins.

the constant-product AMM. its dex id is `<deployer>/<id>` — the mainnet
one is `slimedragon.near/xyk`. pass `--dex-id` to use another one.

asset ids use the INTEAR DEX form: `near`, `nep141:<contract_id>`,
`nep245:<contract_id>:<token_id>` or `nep171:<contract_id>:<token_id>`.

---

#### EXAMPLES

```sh
# view: how many pools the dex holds
bun run bin/intear_dex_xyk/intear_dex_xyk_get_pool_count.ts

# view: a single pool
bun run bin/intear_dex_xyk/intear_dex_xyk_get_pool.ts --pool-id 3

# view: a page of pools
bun run bin/intear_dex_xyk/intear_dex_xyk_get_pools.ts --start-index 0 --limit 10

# view: the LP shares an account holds
bun run bin/intear_dex_xyk/intear_dex_xyk_get_pool_shares.ts \
  --account-id slimedragon.near --pool-ids 3,13

# view: the fees an account has collected but not withdrawn
bun run bin/intear_dex_xyk/intear_dex_xyk_get_pending_fees.ts \
  --account-id slimedragon.near --asset-ids near,nep141:wrap.near
```

#### FLAGS

`--contract-id` is optional on every bin — it falls back to the
per-network default. `--dex-id` is optional too and falls back to the
mainnet xyk dex id.

| bin                                  | flags                                              |
| ------------------------------------ | -------------------------------------------------- |
| `intear_dex_xyk_get_pool_count.ts`   | —                                                  |
| `intear_dex_xyk_get_pool.ts`         | `--pool-id` (required)                             |
| `intear_dex_xyk_get_pools.ts`        | `--start-index`, `--limit` (both optional)         |
| `intear_dex_xyk_get_pool_shares.ts`  | `--account-id` (required), `--pool-ids` (optional) |
| `intear_dex_xyk_get_pending_fees.ts` | `--account-id`, `--asset-ids` (both required)      |

==========================
<br/>
copyright 2026 by sleet.near
