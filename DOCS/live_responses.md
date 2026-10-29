# Live contract responses (verified 2026-10-28, mainnet)

Captured from the NEAR mainnet RPC (`https://rpc.mainnet.fastnear.com`) with
`finality: "final"`. Used to write the type files.

## v2.ref-finance.near (rhea_ammv2)

- `metadata` -> 11 fields:
  `version, owner, boost_farm_id, burrowland_id, guardians, pool_count,
state, admin_fee_bps, cumulative_info_record_interval_sec, wnear_id,
auto_whitelisted_postfix`
  - `pool_count` is a JSON **number** (8991)
- `get_number_of_pools` -> JSON number (8991)
- `get_pools` -> pool objects with exactly 6 keys:
  `pool_kind, token_account_ids, amounts, total_fee, shares_total_supply, amp`
  - pool kinds seen: `SIMPLE_POOL`, `STABLE_SWAP`, `RATED_SWAP`, `DEGEN_SWAP`
- `get_pool` -> same 6 keys
- `get_deposit` -> a decimal string ("0")
- `get_deposits` -> `{ token_id: balance_string }`
- `get_pool_shares` -> a decimal string ("0")
- `get_pool_total_shares` -> a decimal string ("0")
- `get_pool_shares_batch` -> an array of decimal strings (["0","0"])
- `get_account_basic_info` -> `{ near_amount, storage_used }`, both strings
  - `null` for an account that never registered
- `storage_balance_of` -> `{ total, available }`, both strings
- `get_pool_share_price` -> a single decimal string; panics with
  "not implemented" for a SIMPLE_POOL

## dclv2.ref-labs.near (rhea_dclv2)

- `get_metadata` -> 12 fields:
  `version, owner_id, farming_contract_id, next_owner_id,
next_owner_accept_deadline, wnear_id, state, operators,
protocol_fee_rate, pool_count, user_count`
  - `pool_count` and `user_count` are JSON **strings** ("6275", "7921")
  - `protocol_fee_rate` is a JSON number
- `get_pool` / `get_pools` / `get_liquidity` need real ids; not captured

## dex.intear.near (intear_dex_engine)

- `storage_balance_of` -> `{ total, available }`
- `total_storage_balances` -> `{ users: { total, available }, dexes: { total, available } }`
- `contract_source_metadata` -> `{ version, link, standards, build_info }`
  - `build_info` is an extra field the type does not name

## huggies.sputnik-dao.near (sputnik_dao, sputnikdao2 v2.3.1)

- `get_config` -> `{ name, purpose, metadata }`
- `get_policy` -> **6** top-level fields:
  `roles, default_vote_policy, proposal_bond, proposal_period, bounty_bond,
bounty_forgiveness_period`
  - `default_vote_policy` -> `{ weight_kind, quorum, threshold }` where
    `threshold` is an **array** `[1, 2]`
  - `proposal_bond`, `proposal_period`, `bounty_bond`,
    `bounty_forgiveness_period` are all **strings**
  - `roles[i].vote_policy[k].threshold` is a **string** ("1"), not an array
- `get_proposals` -> proposal objects with keys:
  `id, proposer, description, kind, status, vote_counts, votes,
submission_time, last_actions_log`
- `get_factory_info` -> `{ factory_id, auto_update }`
- `get_actions_log` -> `{ account_id, proposal_id, action, block_height }`

Same `default_vote_policy` shape on `ref-finance.sputnik-dao.near` and
`testdao.sputnik-dao.near`.

## everything.pool.near (staking pool)

- `get_accounts` -> `{ account_id, unstaked_balance, staked_balance, can_withdraw }`

## wrap.near (ft / wrap_near)

- `ft_metadata` -> `{ spec, name, symbol, icon, reference, reference_hash, decimals }`
