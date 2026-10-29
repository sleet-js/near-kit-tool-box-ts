# INTEAR_DEX_SIMPLE_AMM

INTEAR DEX simple-amm sub-dex bins.

the smallest working AMM, one liquidity provider per pool. it is not
deployed on mainnet, so pass its dex id explicitly with `--dex-id`.

---

#### EXAMPLES

```sh
# view: a single pool
bun run bin/intear_dex_simple_amm/intear_dex_simple_amm_get_pool.ts \
  --pool-id 0 --dex-id <deployer>/<id>
```

#### FLAGS

`--contract-id` is optional — it falls back to the per-network default.

| bin                                 | flags                                         |
| ----------------------------------- | --------------------------------------------- |
| `intear_dex_simple_amm_get_pool.ts` | `--pool-id` (required), `--dex-id` (optional) |

==========================
<br/>
copyright 2026 by sleet.near
