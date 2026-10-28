# sputnik-dao.near

the Sputnik DAO contracts — the **factory** that deploys the daos, and
the **daos** themselves.

---

#### DETAILS

there are two kinds of account and they are not interchangeable.

the **factory** is `sputnik-dao.near`. it deploys the daos and keeps
the list of them. it has no dao state of its own.

a **dao** is `<name>.sputnik-dao.near` — `huggies.sputnik-dao.near`,
`onsocial.sputnik-dao.near`, `sleet.sputnik-dao.near`.

> #### THE TRAP
>
> calling the factory as if it were a dao fails with a misleading
> `MethodResolveError(MethodNotFound)` for **every** method, because
> none of the dao methods exist there. the error says "method not
> found", not "wrong contract".
>
> the factory and the dao are also different contracts with different
> versions: the factory publishes five builds of the dao contract —
> `[2,0]`, `[2,1]`, `[3,0]`, `[3,1]` and `[3,2]` — and a dao can be
> pinned to an older one.

**CONTRACT ID PER NETWORK**

- MAINNET: sputnik-dao.near (factory), `<name>.sputnik-dao.near` (a dao)
- TESTNET: (none — mainnet only)

```sh
# near cli - get a list of methods
near contract inspect sputnik-dao.near network-config mainnet now
near contract inspect huggies.sputnik-dao.near network-config mainnet now
```

#### THE SHAPES

the dao contract is `#[near(serializers=[borsh, json])]` and near-sdk's
json mode is what a view call uses, so the args are **JSON** and the
numbers are **JSON numbers**.

> sending the numbers as borsh strings panics with
> `Failed to deserialize input from JSON`.

**`get_config`**

```json
{ "name": "HUGGIES", "purpose": "managing digital assets", "metadata": "<base64 json>" }
```

the metadata decodes to fields like `{ primaryColor, flagLogo }` — the
dao's own site branding.

**`get_policy`**

```json
{
  "roles": [
    {
      "name": "Requestor",
      "kind": { "Group": ["sleet.near", "huggies.near"] },
      "permissions": ["call:VoteRemove", "transfer:VoteRemove", "call:AddProposal"],
      "vote_policy": { "transfer": { "weight_kind": "RoleWeight", "quorum": "0", "threshold": "1" } }
    }
  ]
}
```

`kind` is an enum with two shapes:

- `{ "Group": ["a.near", "b.near"] }` — the accounts in the role
- `"Everyone"` — a bare string, meaning any account may act in the
  role. it names no accounts, so it has no member list.

> #### THE MEMBERS
>
> there is **no** method that lists every member of a dao. the policy
> only holds role -> member lists, and the roles that are open to
> everyone name no accounts at all.
>
> so the member list is the union of the roles' member lists, and an
> account in three roles is **one** member, not three. summing the
> roles' member counts reads 6 for a dao with 2 people.

**`get_proposals`**

```json
{
  "id": 0,
  "proposer": "greenghost.near",
  "description": "This project was created using ...",
  "kind": { "FunctionCall": { "receiver_id": "social.near", "actions": [{ "method_name": "...", "args": "...", "deposit": "0", "gas": "300000000000000" }] } },
  "status": "Approved",
  "vote_counts": { "council": ["1", "0", "0"] },
  "votes": { "greenghost.near": "Approve" },
  "submission_time": "1727213574427476731",
  "last_actions_log": [{ "block_height": "220003978" }]
}
```

`kind` is an enum, one of:

`ChangeConfig` `ChangePolicy` `AddMemberToRole` `RemoveMemberFromRole`
`FunctionCall` `UpgradeSelf` `UpgradeRemote` `Transfer`
`SetStakingContract` `AddBounty` `BountyDone` `Vote`
`FactoryInfoUpdate` `ChangePolicyAddOrUpdateRole`
`ChangePolicyRemoveRole` `ChangePolicyUpdateDefaultVotePolicy`
`ChangePolicyUpdateParameters`

`status` is one of:

`InProgress` `Approved` `Rejected` `Removed` `Expired` `Moved` `Failed`

`vote_counts` maps a role name to `[yes, no, spam]`, as strings.

#### THE GOTCHAS

1. **the account must be a real dao.** the factory answers none of the
   dao methods, and the error is a misleading `MethodNotFound`.

2. **`get_proposals` on a dao with no proposals answers with an empty
   list.** on some rpc endpoints it answers with a wasm failure that
   carries no result field instead — so a caller must read "no result"
   as "no proposals", not as a failure. the helper in this package
   reads both shapes as an empty list.

3. **`last_proposal_id` is the next id, not a count.** the contract
   starts it at 0 and bumps it on every add. a dao whose proposals were
   all removed still reports a non-zero id.

4. **`get_proposal` and `get_bounty` take `id`.** calling them with
   `proposal_id` or `bounty_id` panics with `missing field 'id'`.

5. **a missing proposal or bounty is a normal answer.** the contract
   panics with `ERR_NO_PROPOSAL` / `ERR_NO_BOUNTY`, so the helpers
   answer `null` for one and throw for every other error.

6. **`get_bounty_claims` takes only `account_id`.** it ignores any
   other field.

7. **`has_blob` takes a base58 hash.** a base64 hash panics with
   `base58 decoding error`, and the wrong number of bytes panics with
   `invalid length of the crypto hash`.

8. **a proposal is not a transaction.** it is a record in the
   contract's storage. `get_actions_log` gives the trail of
   `AddProposal` / `VoteApprove` actions with their block heights, but
   the contract does not store the transaction hashes.

9. **the amount in a Transfer is in the token's own smallest unit, and
   the contract does not say how many decimals that is.** NEAR is 24
   decimals and most other tokens are 18, so the decimals come from
   the token registry — never from a guess. an empty `token_id` means
   NEAR.

#### THE ARCHIVE RPC

the archival rpc returns the result as a **byte array**, not base64:

```js
const raw = response.result.result;
const text = Array.isArray(raw)
  ? new TextDecoder().decode(new Uint8Array(raw))
  : new TextDecoder().decode(
      Uint8Array.from(atob(raw), (c) => c.charCodeAt(0)),
    );
```

the standard `rpc.mainnet.near.org` returns base64. both are handled
by near-kit.

#### FILES

- `packages/fun/src/lib/methods/methods_sputnik_dao.ts` — the factory and dao method-name constants
- `packages/fun/src/lib/const_id/sputnik_dao_contract_id_const.ts` — the factory id, plus `sputnik_dao_account_id` / `sputnik_dao_name`
- `packages/fun/src/lib/args/sputnik_dao_args.ts` — the parameter type map
- `packages/fun/src/types/sputnik_dao_types.ts` — the response shapes
- `packages/fun/src/fun/sputnik_dao/` — one helper per view
- `bin/sputnik_dao/` — one bin per helper

==========================
<br/>
copyright 2026 by sleet.near
