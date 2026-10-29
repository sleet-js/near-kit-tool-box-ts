# RHEA_AMMV2

AMM / ref-finance bins.

views and calls for the constant-product AMM. the contract id defaults
to the per-network id — `ref-finance-101.testnet` on testnet,
`v2.ref-finance.near` on mainnet — and `--contract-id` overrides it.

---

#### CONTRACT ID PER NETWORK

- MAINNET: v2.ref-finance.near
- TESTNET: ref-finance-101.testnet

#### EXAMPLES

```sh
# view: how many pools are registered
bun run bin/rhea_ammv2/rhea_get_number_of_pools.ts

# view: a single pool
bun run bin/rhea_ammv2/rhea_get_pool.ts --pool-id 2459

# view: a page of pools
bun run bin/rhea_ammv2/rhea_get_pools.ts --from-index 0 --limit 10

# view: deposited balances of an account
bun run bin/rhea_ammv2/rhea_get_deposits.ts --account-id sleet.testnet

# view: one internal token balance
bun run bin/rhea_ammv2/rhea_get_deposit.ts \
  --account-id sleet.testnet \
  --token-id wrap.testnet

# view: LP shares held by an account
bun run bin/rhea_ammv2/rhea_get_pool_shares.ts \
  --pool-id 2459 \
  --account-id sleet.testnet

# view: LP shares held by an account in several pools at once
# the batch is bounded by the rpc's view gas, not by the contract —
# about 5000 pool ids answer on mainnet today, more runs out of gas
bun run bin/rhea_ammv2/rhea_get_pool_shares_batch.ts \
  --pool-ids 0,1,2 \
  --account-id sleet.near

# view: total LP shares and share prices for a pool
bun run bin/rhea_ammv2/rhea_get_pool_total_shares.ts --pool-id 2459

# view: account registration information
bun run bin/rhea_ammv2/rhea_get_account_basic_info.ts --account-id sleet.testnet

# view: AMM contract metadata
bun run bin/rhea_ammv2/rhea_metadata.ts

# view: storage balance of an account
bun run bin/rhea_ammv2/rhea_storage_balance_of.ts --account-id sleet.testnet

# view: quote a swap
bun run bin/rhea_ammv2/rhea_get_return.ts \
  --pool-id 2459 \
  --token-in wrap.testnet \
  --amount-in 1000000000000000000000000 \
  --token-out shit-237.factory.v10.meme-cooking.testnet

# call: register the signer's storage
bun run bin/rhea_ammv2/rhea_storage_deposit.ts --deposit "0.00125 NEAR"

# call: withdraw a deposited token
bun run bin/rhea_ammv2/rhea_withdraw.ts \
  --amount 1000000000000000000000 \
  --token-id shit-237.factory.v10.meme-cooking.testnet

# call: swap — one action
bun run bin/rhea_ammv2/rhea_swap.ts \
  --pool-id 2459 \
  --token-in wrap.testnet \
  --token-out shit-237.factory.v10.meme-cooking.testnet \
  --amount-in 1000000000000000000000000 \
  --min-amount-out 0

# call: swap — two hops (repeat the flags for each action)
bun run bin/rhea_ammv2/rhea_swap.ts \
  --pool-id 2459 --token-in wrap.testnet \
  --token-out shit-237.factory.v10.meme-cooking.testnet --min-amount-out 0 \
  --pool-id 2459 --token-in shit-237.factory.v10.meme-cooking.testnet \
  --token-out wrap.testnet --min-amount-out 0 \
  --referral-id ref.huggies.testnet

# call: create a new simple pool
bun run bin/rhea_ammv2/rhea_add_simple_pool.ts \
  --fee 30 \
  --tokens wrap.testnet,shit-237.factory.v10.meme-cooking.testnet
```

#### FLAGS

`--contract-id` is optional on every bin — it falls back to the
per-network default.

| bin                              | flags                                                        |
| -------------------------------- | ------------------------------------------------------------ |
| `rhea_get_number_of_pools.ts`    | —                                                            |
| `rhea_get_pool.ts`               | `--pool-id` (required)                                       |
| `rhea_get_pools.ts`              | `--from-index`, `--limit` (both optional)                    |
| `rhea_get_deposits.ts`           | `--account-id` (required)                                    |
| `rhea_get_deposit.ts`            | `--account-id`, `--token-id` (both required)                 |
| `rhea_get_pool_shares.ts`        | `--pool-id`, `--account-id` (both required)                  |
| `rhea_get_pool_shares_batch.ts`  | `--pool-ids`, `--account-id` (both required)                 |
| `rhea_get_pool_total_shares.ts`  | `--pool-id` (required)                                       |
| `rhea_get_account_basic_info.ts` | `--account-id` (required)                                    |
| `rhea_metadata.ts`               | —                                                            |
| `rhea_storage_balance_of.ts`     | `--account-id` (required)                                    |
| `rhea_get_return.ts`             | `--pool-id`, `--token-in`, `--amount-in`, `--token-out` (all required) |
| `rhea_storage_deposit.ts`        | `--deposit` (required)                                       |
| `rhea_withdraw.ts`               | `--amount`, `--token-id` (both required)                     |
| `rhea_swap.ts`                   | `--pool-id`, `--token-in`, `--token-out` (required); `--amount-in`, `--min-amount-out`, `--referral-id` (optional, repeatable per action) |
| `rhea_add_simple_pool.ts`        | `--fee`, `--tokens` (both required)                          |

==========================
<br/>
copyright 2026 by sleet.near
