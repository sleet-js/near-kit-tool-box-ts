# staking pools

The standard NEAR validator staking-pool child contracts. There is no
single canonical id on either network — staking pools are deployed
**per-validator**, and the fun helpers take the concrete pool account
id as a parameter.

Pass the specific pool account id into the `pool_*_fun_json` helpers.
On mainnet the validator's pool account id is typically
`<validator>.pool.near` (deployed by the v2 factory) or
`<validator>.poolv1.near` (deployed by the legacy v1 factory).

```sh
# near cli - get a list of methods
# replace <pool_account> with the specific pool's account id
near contract inspect <pool_account> network-config mainnet now
```

#### KNOWN POOLS (v2 hash)

| pool account id        |
| ---------------------- |
| `everything.pool.near` |
| `shitzu.pool.near`     |
| `shadowcorp.pool.near` |
| `intear.pool.near`     |

> Aurorapool (`<validator>.pool.near` for aurora) runs a **patched**
> v2 pool. Method surface matches but **always verify code_hash at the
> call site** before assuming parity.

#### FILES

- `packages/fun/src/lib/methods/methods_pool.ts`
- `packages/fun/src/fun/pool/pool_get_number_of_accounts_fun_json.ts`, `packages/fun/src/fun/pool/pool_get_accounts_fun_json.ts`, `packages/fun/src/fun/pool/pool_deposit_and_stake_fun_json.ts`, `packages/fun/src/fun/pool/pool_ping_fun_json.ts`
- `bin/pool/README.md` — the examples and the flags for these bins

==========================
<br/>
copyright 2026 by sleet.near
