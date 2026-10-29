# POOL

staking pool bins.

staking pools are deployed per-validator, so there is no canonical
contract id — pass the pool account explicitly with `--contract-id`.

---

#### EXAMPLES

```sh
# view: how many accounts are staking
bun run bin/pool/pool_get_number_of_accounts.ts --contract-id everything.pool.near

# view: a page of staking accounts
bun run bin/pool/pool_get_accounts.ts --contract-id everything.pool.near --from-index 0 --limit 10

# call: deposit and stake in one transaction
bun run bin/pool/pool_deposit_and_stake.ts \
  --contract-id everything.pool.near \
  --deposit "5 NEAR"

# call: ping the pool contract
bun run bin/pool/pool_ping.ts --contract-id everything.pool.near
```

#### FLAGS

| bin                             | flags                                                       |
| ------------------------------- | ----------------------------------------------------------- |
| `pool_get_number_of_accounts.ts` | `--contract-id` (required)                                 |
| `pool_get_accounts.ts`          | `--contract-id` (required), `--from-index`, `--limit` (optional) |
| `pool_deposit_and_stake.ts`     | `--contract-id`, `--deposit` (both required)               |
| `pool_ping.ts`                  | `--contract-id` (required)                                 |

==========================
<br/>
copyright 2026 by sleet.near
