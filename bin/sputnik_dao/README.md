# SPUTNIK_DAO

Sputnik DAO factory + daos bins.

there are two kinds of account and they are not interchangeable.

the **factory** is `sputnik-dao.near` on mainnet and
`sputnikv2.testnet` on testnet. it deploys the daos and lists them. it
answers none of the dao methods.

a **dao** is `<name>.sputnik-dao.near` on mainnet and
`<name>.sputnikv2.testnet` on testnet — `huggies.sputnik-dao.near`,
`onsocial.sputnik-dao.near`, `sleet.sputnik-dao.near`.

> calling the factory as if it were a dao fails with a misleading
> `MethodResolveError(MethodNotFound)` for every method.

`--dao` takes either the name (`huggies`) or the whole mainnet account
id (`huggies.sputnik-dao.near`) — both work. For a testnet DAO, pass
its full `<name>.sputnikv2.testnet` account id.

---

#### CONTRACT ID PER NETWORK

- MAINNET: sputnik-dao.near (factory), `<name>.sputnik-dao.near` (a dao)
- TESTNET: sputnikv2.testnet (factory), `<name>.sputnikv2.testnet` (a dao)

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

# call: add a signaling proposal — the deposit must equal the DAO bond
bun run bin/sputnik_dao/dao_add_proposal.ts --dao huggies --description "Signal" --kind '"Vote"' --deposit "1 NEAR"

# call: vote approve — --proposal-kind must match the stored proposal kind
bun run bin/sputnik_dao/dao_act_proposal.ts --dao huggies --proposal-id 0 --action VoteApprove --proposal-kind '"Vote"'

# call: claim, complete, or give up a bounty
bun run bin/sputnik_dao/dao_bounty_claim.ts --dao huggies --bounty-id 0 --deadline 3600000000000 --deposit "1 NEAR"
bun run bin/sputnik_dao/dao_bounty_done.ts --dao huggies --bounty-id 0 --description "Done" --deposit "1 NEAR"
bun run bin/sputnik_dao/dao_bounty_giveup.ts --dao huggies --bounty-id 0

# call: add a FunctionCall proposal — the args are plain JSON here
bun run bin/sputnik_dao/dao_add_function_call_proposal.ts \
  --dao huggies \
  --description "Call the target contract" \
  --receiver-id target.contract.near \
  --method some_method \
  --args '{"foo":"bar"}' \
  --deposit "1 NEAR"
```

> the `FunctionCall` proposal's `--args` is plain JSON. the contract
> stores each action's arguments as raw bytes, so the bin base64
> encodes them for you. `--action-deposit` and `--action-gas` are the
> deposit and gas the DAO attaches to the action, as decimal strings in
> yoctoNEAR and yoctoGas.

#### FLAGS

| bin                                 | flags                                                                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `dao_config.ts`                     | `--dao` (required)                                                                                                                         |
| `dao_policy.ts`                     | `--dao` (required)                                                                                                                         |
| `dao_proposals.ts`                  | `--dao` (required), `--from-index`, `--limit` (optional)                                                                                   |
| `dao_proposal.ts`                   | `--dao`, `--proposal-id` (both required)                                                                                                   |
| `dao_info.ts`                       | `--dao` (required)                                                                                                                         |
| `dao_bounties.ts`                   | `--dao` (required), `--from-index`, `--limit` (optional)                                                                                   |
| `dao_actions_log.ts`                | `--dao` (required)                                                                                                                         |
| `factory_daos.ts`                   | `--from-index`, `--limit` (both optional), `--contract-id` (optional)                                                                      |
| `factory_info.ts`                   | `--contract-id` (optional)                                                                                                                 |
| `dao_add_proposal.ts`               | `--dao`, `--description`, `--kind`, `--deposit` (all required)                                                                             |
| `dao_add_function_call_proposal.ts` | `--dao`, `--description`, `--receiver-id`, `--method`, `--deposit` (all required), `--args`, `--action-deposit`, `--action-gas` (optional) |
| `dao_act_proposal.ts`               | `--dao`, `--proposal-id`, `--action`, `--proposal-kind` (all required)                                                                     |
| `dao_bounty_claim.ts`               | `--dao`, `--bounty-id`, `--deadline`, `--deposit` (all required)                                                                           |
| `dao_bounty_done.ts`                | `--dao`, `--bounty-id`, `--description`, `--deposit` (all required)                                                                        |
| `dao_bounty_giveup.ts`              | `--dao`, `--bounty-id` (both required)                                                                                                     |

==========================
<br/>
copyright 2026 by sleet.near
