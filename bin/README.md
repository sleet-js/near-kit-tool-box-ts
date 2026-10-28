# BIN

Runnable examples for every helper in `@near-kit-tool-box/fun`.

One bin per function, grouped into a folder per contract family.
Every bin takes its arguments as CLI flags — nothing is hardcoded.

## setup

```sh
cp .env.example .env
# no `source` needed — dotenv loads .env from the cwd automatically
```

`.env` needs `NEAR_KIT_NETWORK` (`mainnet` | `testnet`). View bins
work without a signer; call bins need `NEAR_KIT_ACCOUNT_ID` and
`NEAR_KIT_PRIVATE_KEY`.

## conventions

- `--flag value` and `--flag=value` both work.
- Contract ids default to the per-network id for that contract
  (`ref-finance-101.testnet`, `wrap.testnet`, `hello.sleet.testnet`, ...).
  Pass `--contract-id` to override, or `--tld-contract-id` for the
  registrar in `near/`.
- Amounts are `"<n> NEAR"`, `"<n> yocto"`, or a raw yocto integer.
- A missing flag or an unconfigured signer exits with code `1` and
  prints the usage line.

---

## hello — greeting contract

```sh
# view: read the current greeting
bun run bin/hello/hello_get.ts
bun run bin/hello/hello_get.ts --contract-id hello.sleet.testnet

# call: set the greeting (needs a signer)
bun run bin/hello/hello_set.ts --greeting "Hello from near kit"
```

## ft — NEP-141 / NEP-145 fungible tokens

```sh
# view: token metadata
bun run bin/ft/ft_metadata.ts --contract-id shit-237.factory.v10.meme-cooking.testnet

# view: total supply
bun run bin/ft/ft_total_supply.ts --contract-id shit-237.factory.v10.meme-cooking.testnet

# view: balance of an account
bun run bin/ft/ft_balance_of.ts \
  --contract-id shit-237.factory.v10.meme-cooking.testnet \
  --account-id sleet.testnet

# call: register the signer's storage
bun run bin/ft/ft_storage_deposit.ts --contract-id shit-237.factory.v10.meme-cooking.testnet

# call: transfer tokens
bun run bin/ft/ft_transfer.ts \
  --contract-id shit-237.factory.v10.meme-cooking.testnet \
  --receiver-id sleet.testnet \
  --amount 1000000000000000000000

# call: transfer + invoke the receiver's ft_on_transfer
bun run bin/ft/ft_transfer_call.ts \
  --contract-id shit-237.factory.v10.meme-cooking.testnet \
  --receiver-id ref-finance-101.testnet \
  --amount 1000000000000000000000 \
  --msg ""
```

## rhea_ammv2 — AMM / ref-finance

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

## rhea_dclv2 — concentrated-liquidity DEX

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

## near — registrar + account keys

```sh
# call: create a sub-account through the TLD registrar
bun run bin/near/near_create_account.ts \
  --account-id newaccounttests.testnet \
  --public-key ed25519:56CJx1YrTJ6nBmJb8DoXwBm5HLHZcoyAt8FQDmcvkjFE

# call: delete an account, refunding the balance to a beneficiary
bun run bin/near/near_delete_account.ts \
  --signer-id newaccounttests.testnet \
  --beneficiary sleet.testnet

# call: add a full-access key
bun run bin/near/near_add_key.ts \
  --signer-id sleet.testnet \
  --public-key ed25519:HDaBzemF6CYnQ2A3CgAh8vK7stWp5aXvKMKzKDe6s3QZ \
  --permission full-access

# call: add a function-call key (limited access)
bun run bin/near/near_add_key.ts \
  --signer-id sleet.testnet \
  --public-key ed25519:9vnVSMT1hv2Q1vuZzbjStFieqGbTrwqe4KcvfqYAkb5T \
  --permission function-call \
  --receiver-id ref-finance-101.testnet \
  --method-names "add_simple_pool" \
  --allowance "1 NEAR"

# call: delete a key
bun run bin/near/near_delete_key.ts \
  --signer-id sleet.testnet \
  --public-key ed25519:HDaBzemF6CYnQ2A3CgAh8vK7stWp5aXvKMKzKDe6s3QZ
```

## wrap_near — wNEAR

```sh
# call: wrap NEAR into wNEAR
bun run bin/wrap_near/wrap_near_deposit.ts --amount "2 NEAR"

# call: unwrap wNEAR back into NEAR (amount in yocto)
bun run bin/wrap_near/wrap_near_withdraw.ts --amount 2000000000000000000000000
```

## pool — staking pools

Staking pools are deployed per-validator, so there is no canonical
contract id — pass the pool account explicitly.

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

## pumpopoly_world — world game

```sh
# call: move the player one step
bun run bin/pumpopoly_world/pumpopoly_world_move_player.ts

# call: elite move
bun run bin/pumpopoly_world/pumpopoly_world_elite_move.ts
```

---

## intear_dex_engine — INTEAR DEX engine

The engine (`dex.intear.near`, mainnet only) hosts every INTEAR DEX
sub-dex and keeps the users' and dexes' inner balances. Its own views
are JSON; a sub-dex view is reached through the engine's `dex_view`,
which carries borsh payloads.

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

Asset ids use the INTEAR DEX form: `near`, `nep141:<contract_id>`,
`nep245:<contract_id>:<token_id>` or `nep171:<contract_id>:<token_id>`.

## intear_dex_xyk — INTEAR DEX xyk sub-dex

The constant-product AMM. Its dex id is `<deployer>/<id>` — the
mainnet one is `slimedragon.near/xyk`. Pass `--dex-id` to use another
one.

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

## intear_dex_otc — INTEAR DEX otc sub-dex

The over-the-counter desk. It is not deployed on mainnet, so pass its
dex id explicitly with `--dex-id`.

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

## intear_dex_simple_amm — INTEAR DEX simple-amm sub-dex

The smallest working AMM, one liquidity provider per pool. It is not
deployed on mainnet, so pass its dex id explicitly with `--dex-id`.

```sh
# view: a single pool
bun run bin/intear_dex_simple_amm/intear_dex_simple_amm_get_pool.ts \
  --pool-id 0 --dex-id <deployer>/<id>
```

---

## sputnik_dao — Sputnik DAO factory + daos

There are two kinds of account and they are not interchangeable.

The **factory** is `sputnik-dao.near`. It deploys the daos and lists
them. It answers none of the dao methods.

A **dao** is `<name>.sputnik-dao.near` — `huggies.sputnik-dao.near`,
`onsocial.sputnik-dao.near`, `sleet.sputnik-dao.near`.

> Calling the factory as if it were a dao fails with a misleading
> `MethodResolveError(MethodNotFound)` for every method.

Both exist on mainnet only.

`--dao` takes either the name (`huggies`) or the whole account id
(`huggies.sputnik-dao.near`) — both work.

```sh
# view: a dao's name, purpose and metadata
bun run bin/sputnik_dao/dao_config.ts --dao huggies

# view: a dao's roles and who is in them
bun run bin/sputnik_dao/dao_policy.ts --dao huggies

# view: a dao's proposals
bun run bin/sputnik_dao/dao_proposals.ts --dao huggies --from-index 0 --limit 50

# view: one proposal by its id — a proposal that is not there answers null
bun run bin/sputnik_dao/dao_proposal.ts --dao huggies --proposal-id 0

# view: a dao's balances, version and factory
bun run bin/sputnik_dao/dao_info.ts --dao huggies

# view: a dao's bounties
bun run bin/sputnik_dao/dao_bounties.ts --dao huggies

# view: a dao's actions log
bun run bin/sputnik_dao/dao_actions_log.ts --dao huggies

# view: the factory's daos — the whole list, or a page of it
bun run bin/sputnik_dao/factory_daos.ts --from-index 0 --limit 50

# view: the factory's own settings
bun run bin/sputnik_dao/factory_info.ts
```

---

## layout

```
bin/
  _shared/             # flag parser + env/contract-id helpers (not runnable)
  ft/                  # NEP-141 / NEP-145
  hello/               # greeting contract
  intear_dex_engine/   # INTEAR DEX engine (dex.intear.near)
  intear_dex_otc/      # INTEAR DEX otc sub-dex
  intear_dex_simple_amm/ # INTEAR DEX simple-amm sub-dex
  intear_dex_xyk/      # INTEAR DEX xyk sub-dex
  near/                # registrar + account keys
  pool/                # staking pools
  pumpopoly_world/     # world game
  rhea_ammv2/          # AMM / ref-finance
  rhea_dclv2/          # concentrated-liquidity DEX
  sputnik_dao/        # Sputnik DAO factory + daos
  wrap_near/           # wNEAR
```

---

copyright 2026 by sleet.near
