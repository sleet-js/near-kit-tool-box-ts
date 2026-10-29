// =================================================
// Typed shapes returned by the INTEAR DEX `simple-amm` sub-dex views.
//
// PROVENANCE
//   contract : `dex.intear.near` (mainnet) — the INTEAR DEX engine,
//              sub-dex `simple-amm`
//   methods  : `get_pool` (read through the engine's `dex_view`)
//   verified : 2026-10-29 — NOT verified against live data, see below
//
// NOT VERIFIED against live mainnet data (2026-10-29)
//   The `simple-amm` sub-dex is **not deployed on mainnet**, so there
//   was no live response to check these shapes against. The engine
//   holds exactly two sub-dexes, and both were found:
//     - `slimedragon.near/xyk`
//     - `slimedragon.near/otc`
//   `deploy_dex_code` is the only way to register a sub-dex, and every
//   such call in the engine's whole transaction history named either
//   `xyk` or `otc`. Every other dex id answers the engine's
//   `dex_view` with `Dex code not found`.
//
//   The shapes below therefore come from the dex's own source, and
//   they are ASSUMED, not verified. The source says the pool is:
//     struct SimplePool {
//         assets: (AssetWithBalance, AssetWithBalance),
//         owner_id: AccountId,
//     }
//   which is what these types describe.
//
//   When a `simple-amm` dex is deployed on mainnet, check these
//   shapes against its live `get_pool` response and update this
//   header.
//
// BORS-DECODED, NOT JSON.
// The simple-amm dex's views are read through the engine's `dex_view`,
// which carries **borsh** payloads. These types therefore describe the
// values AFTER the borsh decoder has run, not the JSON the RPC
// returned. A JSON schema (Zod) is the WRONG tool for these — the
// wire form is a borsh byte string and never a JSON document — so
// these stay plain types and the helpers keep casting.
//
// THE SCHEMA IS THE TYPE.
// Every type below is read straight off the borsh schema with
// `b.infer`. There is no hand-written interface that could drift away
// from the wire format — the schema and the type are the same thing.
//
// The simple-amm dex is the smallest working AMM: one liquidity
// provider per pool, constant-product math, no shares.
// =================================================
import type {
  INTEAR_DEX_SIMPLE_AMM_ASSET_WITH_BALANCE_TYPE,
  INTEAR_DEX_SIMPLE_AMM_POOL_TYPE,
} from "../lib/borsh/intear_dex_simple_amm_decode";

// One asset of a pool, with the balance the pool holds of it.
//
// ASSUMED (see the header): same shape as the xyk dex's asset, so
// `asset_id` is the asset id and `balance` is the balance. The balance
// is a u128, so it is a `bigint`.
export type { INTEAR_DEX_SIMPLE_AMM_ASSET_WITH_BALANCE_TYPE };

// A simple-amm pool.
//
// ASSUMED (see the header): the pool's two assets and its single
// liquidity provider.
export type { INTEAR_DEX_SIMPLE_AMM_POOL_TYPE };
// =================================================
// copyright 2026 by sleet.near
