// =================================================
// intear_dex_simple_amm_decode
//
// Borsh schemas for the INTEAR DEX `simple-amm` sub-dex view
// responses.
//
// These are [`@zorsh/zorsh`](https://www.npmjs.com/package/@zorsh/zorsh)
// schemas, so the schema *is* the type: `b.infer` reads the decoded
// shape straight off the schema, and there is no second, hand-written
// TypeScript interface that can drift away from it.
//
// Amounts are u128 and are carried as `bigint`.
//
// NOT VERIFIED against live mainnet data (2026-10-29)
//   The `simple-amm` sub-dex is **not deployed on mainnet**, so there
//   was no live response to check these shapes against. The shapes
//   below come from the dex's own source, and they are ASSUMED, not
//   verified. The source says the pool is:
//     struct SimplePool {
//         assets: (AssetWithBalance, AssetWithBalance),
//         owner_id: AccountId,
//     }
//   which is what these schemas describe.
//
//   When a `simple-amm` dex is deployed on mainnet, check these
//   shapes against its live `get_pool` response and update this
//   header.
// =================================================
import { b } from "@zorsh/zorsh";
import { intear_dex_asset_id_schema } from "./intear_dex_asset_id";

// =================================================
// One asset of a pool, with the balance the pool holds of it.
//
// ASSUMED (see the header): same shape as the xyk dex's asset, so
// `asset_id` is the asset id and `balance` is the balance. The
// balance is a u128, so it is a `bigint`.
export const intear_dex_simple_amm_asset_with_balance_schema = b.struct({
  asset_id: intear_dex_asset_id_schema,
  balance: b.u128(),
});

// =================================================
// A simple-amm pool.
//
// ASSUMED (see the header): the pool's two assets and its single
// liquidity provider.
export const intear_dex_simple_amm_pool_schema = b.struct({
  assets: b.tuple(
    intear_dex_simple_amm_asset_with_balance_schema,
    intear_dex_simple_amm_asset_with_balance_schema,
  ),
  owner_id: b.string(),
});

// =================================================
export type INTEAR_DEX_SIMPLE_AMM_ASSET_WITH_BALANCE_TYPE = b.infer<
  typeof intear_dex_simple_amm_asset_with_balance_schema
>;
export type INTEAR_DEX_SIMPLE_AMM_POOL_TYPE = b.infer<
  typeof intear_dex_simple_amm_pool_schema
>;
// =================================================
// copyright 2026 by sleet.near
