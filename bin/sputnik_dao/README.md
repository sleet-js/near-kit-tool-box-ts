# SPUTNIK_DAO

Sputnik DAO factory + daos bins.

there are two kinds of account and they are not interchangeable.

the **factory** is `sputnik-dao.near`. it deploys the daos and lists
them. it answers none of the dao methods.

a **dao** is `<name>.sputnik-dao.near` — `huggies.sputnik-dao.near`,
`onsocial.sputnik-dao.near`, `sleet.sputnik-dao.near`.

> calling the factory as if it were a dao fails with a misleading
> `MethodResolveError(MethodNotFound)` for every method.

both exist on mainnet only.

`--dao` takes either the name (`huggies`) or the whole account id
(`huggies.sputnik-dao.near`) — both work.

---

#### CONTRACT ID PER NETWORK

- MAINNET: sputnik-dao.near (factory), `<name>.sputnik-dao.near` (a dao)
- TESTNET: (none — mainnet only)

#### EXAMPLES

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

#### FLAGS

| bin                     | flags                                                        |
| ----------------------- | ------------------------------------------------------------ |
| `dao_config.ts`         | `--dao` (required)                                           |
| `dao_policy.ts`         | `--dao` (required)                                           |
| `dao_proposals.ts`      | `--dao` (required), `--from-index`, `--limit` (optional)      |
| `dao_proposal.ts`       | `--dao`, `--proposal-id` (both required)                     |
| `dao_info.ts`           | `--dao` (required)                                           |
| `dao_bounties.ts`       | `--dao` (required), `--from-index`, `--limit` (optional)      |
| `dao_actions_log.ts`    | `--dao` (required)                                           |
| `factory_daos.ts`       | `--from-index`, `--limit` (both optional), `--contract-id` (optional) |
| `factory_info.ts`       | `--contract-id` (optional)                                   |

==========================
<br/>
copyright 2026 by sleet.near
