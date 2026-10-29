# RHEA_DCLV2

concentrated-liquidity DEX bins.

views only for the DCL v2 dex. the contract id defaults to the
per-network id and `--contract-id` overrides it.

---

#### EXAMPLES

```sh
# view: one pool (pool id is token-x|token-y|fee)
bun run bin/rhea_dclv2/rhea_get_pool.ts --pool-id "wrap.testnet|usdc.fakes.testnet|2000"

# view: a page of pools
bun run bin/rhea_dclv2/rhea_list_pools.ts --from-index 0 --limit 10

# view: one LP position
bun run bin/rhea_dclv2/rhea_get_liquidity.ts --lpt-id "wrap.testnet|usdc.fakes.testnet|2000#1"

# view: LP positions owned by an account
bun run bin/rhea_dclv2/rhea_list_liquidities.ts --account-id sleet.testnet

# view: one internal token balance
bun run bin/rhea_dclv2/rhea_get_user_asset.ts \
  --account-id sleet.testnet \
  --token-id wrap.testnet

# view: all internal token balances
bun run bin/rhea_dclv2/rhea_list_user_assets.ts --account-id sleet.testnet

# view: contract metadata
bun run bin/rhea_dclv2/rhea_get_metadata.ts
```

#### FLAGS

`--contract-id` is optional on every bin — it falls back to the
per-network default.

| bin                            | flags                                                     |
| ------------------------------ | --------------------------------------------------------- |
| `rhea_get_pool.ts`             | `--pool-id` (required)                                    |
| `rhea_list_pools.ts`           | `--from-index`, `--limit` (both optional)                 |
| `rhea_get_liquidity.ts`        | `--lpt-id` (required)                                     |
| `rhea_list_liquidities.ts`     | `--account-id` (required), `--from-index`, `--limit` (optional) |
| `rhea_get_user_asset.ts`       | `--account-id`, `--token-id` (both required)              |
| `rhea_list_user_assets.ts`     | `--account-id` (required)                                 |
| `rhea_get_metadata.ts`         | —                                                         |

==========================
<br/>
copyright 2026 by sleet.near
