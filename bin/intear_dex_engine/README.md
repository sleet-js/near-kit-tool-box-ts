# INTEAR_DEX_ENGINE

INTEAR DEX engine bins.

the engine (`dex.intear.near`, mainnet only) hosts every INTEAR DEX
sub-dex and keeps the users' and dexes' inner balances. its own views
are JSON; a sub-dex view is reached through the engine's `dex_view`,
which carries borsh payloads.

asset ids use the INTEAR DEX form: `near`, `nep141:<contract_id>`,
`nep245:<contract_id>:<token_id>` or `nep171:<contract_id>:<token_id>`.

---

#### CONTRACT ID PER NETWORK

- MAINNET: dex.intear.near
- TESTNET: (none — mainnet only)

#### EXAMPLES

```sh
# view: engine state — paused, code deployer, deployed version
bun run bin/intear_dex_engine/intear_dex_engine_info.ts

# view: the storage balances the engine holds
bun run bin/intear_dex_engine/intear_dex_engine_storage.ts

# view: an account's or a dex's inner balances
bun run bin/intear_dex_engine/intear_dex_engine_balances.ts \
  --account-id slimedragon.near --limit 10
bun run bin/intear_dex_engine/intear_dex_engine_balances.ts \
  --dex-id slimedragon.near/xyk --limit 10

# view: one asset's inner balance
bun run bin/intear_dex_engine/intear_dex_engine_asset_balance.ts \
  --asset-id near --account-id slimedragon.near
bun run bin/intear_dex_engine/intear_dex_engine_asset_balance.ts \
  --asset-id nep141:wrap.near --dex-id slimedragon.near/xyk
```

#### FLAGS

`--contract-id` is optional on every bin — it falls back to the
per-network default.

| bin                                | flags                                                              |
| ---------------------------------- | ------------------------------------------------------------------ |
| `intear_dex_engine_info.ts`        | —                                                                  |
| `intear_dex_engine_storage.ts`     | —                                                                  |
| `intear_dex_engine_balances.ts`    | `--account-id` or `--dex-id` (exactly one required), `--limit` (optional) |
| `intear_dex_engine_asset_balance.ts` | `--asset-id` (required), `--account-id` or `--dex-id` (exactly one required) |

==========================
<br/>
copyright 2026 by sleet.near
