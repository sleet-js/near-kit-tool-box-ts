# INTEAR_DEX_OTC

INTEAR DEX otc sub-dex bins.

the over-the-counter desk. it is not deployed on mainnet, so pass its
dex id explicitly with `--dex-id`.

---

#### EXAMPLES

```sh
# view: the desk's internal balance of an asset
bun run bin/intear_dex_otc/intear_dex_otc_get_balance.ts \
  --account-id alice.near --asset-id near --dex-id <deployer>/<id>

# view: the key an account authorized for its trade intents
bun run bin/intear_dex_otc/intear_dex_otc_get_authorized_key.ts \
  --account-id alice.near --dex-id <deployer>/<id>

# view: whether a trade-intent nonce was used
bun run bin/intear_dex_otc/intear_dex_otc_is_nonce_used.ts \
  --account-id alice.near --nonce 42 --dex-id <deployer>/<id>

# view: the storage deposit an account has with the desk
bun run bin/intear_dex_otc/intear_dex_otc_storage_balance_of.ts \
  --account-id alice.near --dex-id <deployer>/<id>
```

#### FLAGS

`--contract-id` is optional on every bin — it falls back to the
per-network default.

| bin                                    | flags                                                               |
| -------------------------------------- | ------------------------------------------------------------------- |
| `intear_dex_otc_get_balance.ts`        | `--account-id`, `--asset-id` (both required), `--dex-id` (optional) |
| `intear_dex_otc_get_authorized_key.ts` | `--account-id` (required), `--dex-id` (optional)                    |
| `intear_dex_otc_is_nonce_used.ts`      | `--account-id`, `--nonce` (both required), `--dex-id` (optional)    |
| `intear_dex_otc_storage_balance_of.ts` | `--account-id` (required), `--dex-id` (optional)                    |

==========================
<br/>
copyright 2026 by sleet.near
