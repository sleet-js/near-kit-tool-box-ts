# Session notes — 2026-10-28

Everything from the snake_case sweep through the type audit. Written
up for review — nothing here is committed to a release yet.

Commits (all on `main`, none pushed):

```
76e8ad0 fix(fun): the per-role vote policy threshold is a count OR a pair
191d178 feat(fun): validate every JSON view response and document every type
1db287e fix(fun): correct the rhea_ammv2 response types and validate every view
cdaff88 style: rename types/AmountInput.ts to types/amount_input_type.ts
ca7d493 style: drop the JSDoc blocks and the unused declarations
37d42d6 style: rename every camelCase identifier to snake_case
```

203 files changed. `bunx tsc -p tsconfig.bin.json --noEmit`,
`bun run build` (all three packages) and `prettier --check .` all pass.

---

## 1. The naming sweep (`37d42d6`)

The repo convention is snake_case for functions, variables, parameters
and class members; SCREAMING_SNAKE_CASE for exported types and
constants. The drift was repo-wide, not just in `packages/fun/src/lib/borsh/`.

427 violations across the three packages, the bins and the scripts.
37 of them were exported API names.

**`packages/fun/src/lib/borsh/`** — the folder that started this:

| before | after |
|---|---|
| `BorshReader` / `BorshWriter` | `borsh_reader` / `borsh_writer` |
| `base58Encode` / `bytesToBase64` / `base64ToBytes` | `base58_encode` / `bytes_to_base64` / `base64_to_bytes` |
| `parseIntearDexAssetId` / `readIntearDexAssetId` / `writeIntearDexAssetId` | `parse_intear_dex_asset_id` / `read_intear_dex_asset_id` / `write_intear_dex_asset_id` |
| `intearDexAssetTokenId` / `intearDexAccountOrDexId` | `intear_dex_asset_token_id` / `intear_dex_account_or_dex_id` |
| `intearDexView` / `intearDexViewRaw` | `intear_dex_view` / `intear_dex_view_raw` |
| the seven `decode*` helpers | `decode_*` |
| `chunksPush` / `toBytes` / `publicKey` | `chunks_push` / `to_bytes` / `public_key` |

**Elsewhere**: `packages/web/src` (`toggleNetwork` → `toggle_network`,
`getStoredNetworkId` → `get_stored_network_id`, `setNetwork_*` →
`set_network_*`), `packages/fun/src/types/AmountInput.ts`
(`AmountInput` → `AMOUNT_INPUT`), `bin/_shared/` (`parseArgs` →
`parse_args`, `requireString` → `require_string`, `logResult` →
`log_result`, `Args` → `ARGS`), `scripts/version-sync.ts`.

### Names deliberately NOT renamed

These mirror an external API and must keep their spelling:

| name | owner |
|---|---|
| `attachedDeposit` | near-kit `CallOptions` |
| `receiverId`, `methodNames` | near-kit `AccessKeyPermission` (TS type) |
| `rpcUrl`, `privateKey`, `defaultSignerId` | near-kit `Near` options |
| `footerBranding`, `linkText` | @hot-labs/near-connect options |
| `network`, `wallet` | near-kit `Near` options |
| `Account`, `Dex`, `Pool`, `Community`, `Fixed`, `Scheduled`, `Dynamic`, `V1`, `V2`, `Private`, `Public`, `Launch`, `LaunchV2`, `FunctionCall`, `Transfer`, `UpgradeSelf`, `UpgradeRemote`, `SetStakingContract`, `AddBounty`, `BountyDone`, `Vote`, `FactoryInfoUpdate`, `ChangeConfig`, `ChangePolicy`, `AddMemberToRole`, `RemoveMemberFromRole` | contract wire format |
| `InProgress`, `Approved`, `Rejected`, `Removed`, `Expired`, `Moved`, `Failed`, `Approve`, `Reject`, `Unknown` | contract wire format |

The tricky one: near-kit's **TypeScript type** for `AccessKeyPermission`
uses camelCase (`receiverId`, `methodNames`) while its **zod runtime
schema** uses snake_case (`receiver_id`, `method_names`). The type is
what the compiler checks, so `bin/near/near_add_key.ts` keeps
camelCase on the type members and the object literal keys, while the
local variables are snake_case.

---

## 2. JSDoc removal (`ca7d493`)

The repo does not use `/** ... */` anywhere. All 100 JSDoc blocks
across the three packages, the bins and the scripts are now `//` line
comments.

JSDoc-only constructs were rewritten for the new form:

| JSDoc | now |
|---|---|
| `@param near - the NEAR client` | a `params:` heading with `near: the NEAR client` |
| `@returns the parsed JSON result` | `returns the parsed JSON result` |
| `@remarks` | dropped, its content kept |
| `{@link near_kit_contract_view_fun}` | `near_kit_contract_view_fun` |

Also removed the unused declarations (`noUnusedLocals` is `false` in the
package tsconfigs, so they were invisible by default):

- `near_amount_string` and `yocto_amount_string` in `AmountInput.ts`
- the unused `zod` import in `intear_dex_xyk_types.ts`
- the unused `intear_dex_engine_args` import in
  `intear_dex_engine_asset_balance_of_fun_json.ts`
- the unused `usage` constants in nine bins that take no required flag
- two unused imports in `bin/sputnik_dao/`

---

## 3. The file rename (`cdaff88`)

`packages/fun/src/types/AmountInput.ts` →
`packages/fun/src/types/amount_input_type.ts` (matches the `types/`
folder's `<name>_type.ts` convention).

Left alone on purpose:

- `packages/web/src/new-hot.ts`
- `packages/web/src/new-archival.ts`
- `packages/env/src/new-env.ts`
- `scripts/version-sync.ts`

Note the `new-` prefix on those three is a leftover from the very first
commit (`ai cp and setup`) — there are no "old" counterparts left, so
the prefix no longer distinguishes anything. `version-sync.ts` uses a
hyphen where the repo uses underscores. Both are one-line `git mv` +
reference updates whenever you want them.

---

## 4. The real bugs — the response types (`1db287e`, `191d178`, `76e8ad0`)

**This was the important part, and it should have come first.** The
types were hand-written and had drifted from what the contracts
actually return. The Zod work was only the mechanism that *found* the
drift.

### `rhea_ammv2` — two types were flat wrong

Verified live against `v2.ref-finance.near`:

| view | live response | was |
|---|---|---|
| `get_account_basic_info` | `{ near_amount, storage_used }` | `{ account_id, registered_tokens, storage_usage }` ❌ |
| `metadata` | `version` + 10 more fields, **no** `name`/`symbol` | declared `name`/`symbol` ❌ |
| `get_pool_share_price` | `"101421689"` (one string) | typed `string[]` ❌ |
| `get_account_basic_info` on an unregistered account | `null` | threw ❌ |

Every declared field was landing in `extra` while the named fields were
always `undefined`.

### `sputnik_dao` — the bounty type was wrong in four places

The old type declared `proposer`, `token_id`, `deadline`, `completed`
— **none of which exist on the wire**. The live shape (from
`mochi.sputnik-dao.near`) is `id, description, token, amount, times,
max_deadline`.

To find a DAO with bounties, walk the factory's `get_dao_list` (2034
DAOs) rather than guessing DAO names.

`SPUTNIK_DAO_POLICY_TYPE` declared only `roles`. `get_policy` answers
with six fields:

```
roles, default_vote_policy, proposal_bond, proposal_period,
bounty_bond, bounty_forgiveness_period
```

### The per-role vote threshold — caught after the first commit

`SPUTNIK_DAO_VOTE_POLICY_TYPE.threshold` was typed `string`, but the
contract's `VoteThreshold` is a variant with two wire forms:

```
threshold: "5"        a plain count
threshold: [31, 50]   a [for, against] pair
```

Sweep of 83 live DAOs (2026-10-28):

```
default_vote_policy.threshold:  array=83  string=0
per-role threshold:            array=156  string=10
```

So it is **not** a difference between DAOs — a single DAO can carry
both. `marmaj.sputnik-dao.near` has per-role thresholds that are all
pairs, so `get_policy` would have thrown on it. Now a union
(`string | number[]`), fixed in `76e8ad0`.

### Other verified shapes

- `kind` for a vote proposal is the **bare string** `"Vote"`, not
  `{ Vote: ... }`
- `vote_counts` are **numbers** on older DAOs and **strings** on newer
  ones — the type is a union
- `get_last_proposal_id` / `get_last_bounty_id` return **numbers**, not
  strings (the old cast was lying)
- `get_pools` returns exactly 6 keys, matching the strict schema
  (checked across all 8991 mainnet pools, 4 pool kinds)

### Now: every JSON view validates

68 helpers parse their result instead of casting it. The cast was a
promise to the compiler that nothing checked; a schema catches a
changed field type, a missing field, and a null where a value was
expected.

The borsh-decoded helpers — `intear_dex_xyk`, `intear_dex_simple_amm`
and `intear_dex_otc` — decode bytes rather than JSON, so a JSON schema
is the wrong tool and they keep their casts.

### Shared scalars

Thirteen near-identical `z.string()` / `z.number()` / `z.boolean()`
constants became five shared ones in `packages/fun/src/types/scalar_type.ts`:

```ts
export const AMOUNT_STRING_Z_CONST = z.string().regex(/^\d+$/);
export const ACCOUNT_ID_STRING_Z_CONST = z.string().min(1);
export const OPTIONAL_ACCOUNT_ID_STRING_Z_CONST = z.string();
export const COUNT_NUMBER_Z_CONST = z.number().int().nonnegative();
export const BOOLEAN_Z_CONST = z.boolean();
```

A scalar schema earns its place because it knows the **format**, not
just the JavaScript type. `get_staking_contract` answers with `""` to
mean "there is none", hence the optional variant.

### Schemas are exported

So a caller can parse a raw response with the same schema the helpers
use. This is intentional.

### Provenance notes

Every type file now carries a header saying which contract, which
method, and when it was last checked against a live response. Only
`sputnik_dao_types.ts` had one before — that absence is exactly how
the rhea_ammv2 drift survived.

`DOCS/live_responses.md` holds the captured mainnet responses.

---

## 5. Open risks

1. **`RHEA_DCLV2_POOL_TYPE` is unverified.** The field list is
   hand-written and was never confirmed against a live response. Six
   fields are *required* in the schema (`pool_id`, `token_x`,
   `token_y`, `fee`, `total_x`, `total_y`), so if a live pool uses
   different names the helper **throws** rather than degrading. Same
   for `RHEA_DCLV2_LIQUIDITY_TYPE` and `RHEA_DCLV2_USER_ASSET_TYPE`.
   `RHEA_DCLV2_USER_ASSETS_TYPE` was added by analogy with the AMM's
   `get_deposits`, not observed.
   → *Next thing to check.* The factory-list approach worked well for
   finding a DAO with bounties; the same idea may find a live DCL pool.

2. **`RHEA_DCLV2_METADATA_TYPE` is lossy.** Correct, but
   `pool_count` and `user_count` land untyped in `extra`. The live
   `get_metadata` returns 11 fields; the type names one.

3. **Sputnik proposal-kind variants never seen live**:
   `SetStakingContract`, `FactoryInfoUpdate`, `ChangePolicyAddOrUpdateRole`,
   `ChangePolicyRemoveRole`, `ChangePolicyUpdateDefaultVotePolicy`,
   `ChangePolicyUpdateParameters`. All typed `unknown`, so they
   degrade rather than throw.

4. **The borsh types were not re-derived** against a live `dex_view`
   payload — `INTEAR_DEX_XYK_*`, `INTEAR_DEX_OTC_*`,
   `INTEAR_DEX_SIMPLE_AMM_*`.

5. **`near-kit-tool-box-skills`** (the sibling repo) almost certainly
   still references the old names and needs the same treatment.
   `AGENTS.md` says to keep the two in sync.

---

## 6. Breaking changes to note in the release

- `AmountInput` → `AMOUNT_INPUT`
- `BorshReader` / `BorshWriter` → `borsh_reader` / `borsh_writer`
- `parseIntearDexAssetId` and the other renamed borsh exports
- `toggleNetwork`, `getStoredNetworkId`, `setNetwork_*` in `/web`
- `rhea_ammv2_get_pool_share_price_fun_json` now returns
  `Promise<string>` (was `Promise<string[]>`)
- `rhea_ammv2_get_account_basic_info_fun_json` now returns
  `Promise<... | null>`
- `SPUTNIK_DAO_BOUNTY_TYPE` field renames: `token_id` → `token`,
  `deadline` → `max_deadline`; `proposer` and `completed` dropped
- `SPUTNIK_DAO_VOTE_POLICY_TYPE.threshold` widened to
  `string | number[]`
- `sputnik_dao_get_bounty_claims_fun_json` narrowed from
  `Promise<unknown[]>` to `Promise<SPUTNIK_DAO_BOUNTY_CLAIM_TYPE[]>`
- **behaviour change**: a view that today returns a value the schema
  rejects now throws instead. That is the point, but it is a change.

Version is currently 0.2.2. `bun run version:sync` takes it to 0.2.3.

---

## 7. Useful commands

```bash
bunx tsc -p tsconfig.bin.json --noEmit        # bins
bunx tsc -p packages/fun/tsconfig.json --noEmit --noUnusedLocals
bun run build                                  # all three packages
bunx prettier --check .
bun run version:dry-run                        # version sync preview
```

Live contract check (no env needed):

```ts
const res = await fetch("https://rpc.mainnet.fastnear.com", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0", id: 1, method: "query",
    params: {
      request_type: "call_function",
      account_id: "v2.ref-finance.near",
      method_name: "get_account_basic_info",
      args_base64: btoa(JSON.stringify({ account_id: "sleet.near" })),
      finality: "final",
    },
  }),
});
const j = await res.json();
JSON.parse(new TextDecoder().decode(Buffer.from(j.result.result, "base64")));
```

Note `finality: "final"` is required — without it the RPC rejects the
request with a `BlockReference` parse error. And `j.result.result` is
`undefined` on a wasm panic, so guard before decoding.

==========================
<br/>
copyright 2026 by sleet.near
