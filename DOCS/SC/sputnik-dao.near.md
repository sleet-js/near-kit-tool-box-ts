# sputnik-dao.near

the Sputnik DAO contracts — the **factory** that deploys the daos, and
the **daos** themselves.

---

#### DETAILS

there are two kinds of account and they are not interchangeable.

the **factory** is `sputnik-dao.near` on mainnet and
`sputnikv2.testnet` on testnet. it deploys the daos and keeps the list
of them. it has no dao state of its own.

a **dao** is `<name>.sputnik-dao.near` on mainnet and
`<name>.sputnikv2.testnet` on testnet — `huggies.sputnik-dao.near`,
`onsocial.sputnik-dao.near`, `sleet.sputnik-dao.near`.

calling the factory as if it were a dao fails with a
`MethodResolveError(MethodNotFound)` for every method, because none of
the dao methods exist there. the factory and the dao are also different
contracts with different versions — the factory publishes five builds
of the dao contract, `[2,0]` `[2,1]` `[3,0]` `[3,1]` and `[3,2]`, and a
dao can be pinned to an older one.

**CONTRACT ID PER NETWORK**

- MAINNET: sputnik-dao.near (factory), `<name>.sputnik-dao.near` (a dao)
- TESTNET: sputnikv2.testnet (factory), `<name>.sputnikv2.testnet` (a dao)

```sh
# near cli - get a list of methods
near contract inspect sputnik-dao.near network-config mainnet now
near contract inspect huggies.sputnik-dao.near network-config mainnet now
```

#### THE ARGS ARE JSON

the dao contract is `#[near(serializers=[borsh, json])]` and near-sdk's
json mode is what a view call uses, so the args are JSON and the
numbers are JSON numbers. sending the numbers as borsh strings panics
with `Failed to deserialize input from JSON`.

#### TYPES

a role's `kind` is an enum with three shapes:

- `{ "Group": ["a.near", "b.near"] }` — the accounts in the role
- `"Everyone"` — a bare string, meaning any account may act in the
  role. it names no accounts, so it has no member list
- `{ "Member": "1000000000000000000000000" }` — accounts holding at
  least this much delegated balance

a proposal's `kind` is an enum, one of:

`ChangeConfig` `ChangePolicy` `AddMemberToRole` `RemoveMemberFromRole`
`FunctionCall` `UpgradeSelf` `UpgradeRemote` `Transfer`
`SetStakingContract` `AddBounty` `BountyDone` `Vote`
`FactoryInfoUpdate` `ChangePolicyAddOrUpdateRole`
`ChangePolicyRemoveRole` `ChangePolicyUpdateDefaultVotePolicy`
`ChangePolicyUpdateParameters`

a proposal's `status` is one of:

`InProgress` `Approved` `Rejected` `Removed` `Expired` `Moved` `Failed`

a proposal's `vote_counts` maps a role name to `[yes, no, spam]`, as
strings. `votes` maps an account id to `Approve`, `Reject`, `Remove` or
`Unknown`.

all 128-bit amounts are decimal strings in yocto units.

the amount in a `Transfer` is in the token's own smallest unit, and the
contract does not say how many decimals that is. NEAR is 24 decimals
and most other tokens are 18, so the decimals come from the token
registry — never from a guess. an empty `token_id` means NEAR.

there is no method that lists every member of a dao. the policy only
holds role -> member lists, and the roles that are open to everyone
name no accounts at all. so the member list is the union of the roles'
member lists, and an account in three roles is one member, not three.

#### FILES

- `packages/fun/src/lib/methods/methods_sputnik_dao.ts` — the factory and dao method-name constants
- `packages/fun/src/lib/const_id/sputnik_dao_contract_id_const.ts` — the factory id per network, plus `sputnik_dao_account_id` / `sputnik_dao_testnet_account_id` / `sputnik_dao_name`
- `packages/fun/src/lib/args/sputnik_dao_args.ts` — the parameter type map
- `packages/fun/src/types/sputnik_dao_types.ts` — the response shapes
- `packages/fun/src/fun/sputnik_dao/` — one helper per view
- `bin/sputnik_dao/` — one bin per helper
- `bin/sputnik_dao/README.md` — the examples and the flags for these bins

==========================
<br/>
copyright 2026 by sleet.near
