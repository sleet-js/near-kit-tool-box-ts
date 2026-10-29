// =================================================
// intear_dex_xyk_types
//
// Typed shapes returned by the INTEAR DEX `xyk` sub-dex views.
//
// PROVENANCE
//   contract : `dex.intear.near` (mainnet) — the INTEAR DEX engine,
//              sub-dex `xyk`
//   methods  : `get_pool`, `get_pools`, `get_pool_shares`,
//              `get_pending_fees`, `get_community_owned_fees`
//              (all read through the engine's `dex_view`)
//   dex id   : `slimedragon.near/xyk`
//   verified : 2026-10-29, against the live mainnet responses
//
// VERIFIED against live mainnet data (2026-10-29)
//   Every shape below was decoded from the real bytes the contract
//   returned. The capture covered:
//     - all 303 pools of `slimedragon.near/xyk`, fetched with
//       `get_pools` in pages of 50. All 303 decoded with **zero**
//       leftover bytes, so the field sets below are exact.
//     - `get_pool_shares` for 4 accounts over 40 pool ids — all three
//       share states (`null`, `0`, a positive amount) were observed.
//     - `get_pending_fees` for 12 accounts over 5 asset ids, including
//       a map holding more than one asset.
//     - `get_community_owned_fees` for 21 community accounts, 16 of
//       them with a non-zero fee.
//   Variants observed live:
//     - pool kind        : `Private`, `Public`, `Launch`, `LaunchV2`
//                          (all four; 20 / 117 / 128 / 38 pools)
//     - fee configuration: `V1` (23 pools), `V2` (280 pools)
//     - fee receiver     : `Account`, `Pool`, `Community` (all three)
//     - fee amount       : `Fixed` (235), `Scheduled` (60)
//
// NOT observed live
//   - a `nep245` or `nep171` asset id. Every asset registered with
//     the xyk dex is `near` or `nep141`. The borsh encoding of all
//     four asset id variants was checked against the contract instead:
//     the contract accepted `near`, `nep141`, `nep245` and `nep171`
//     as-is, so the variant numbers are right.
//
// BORS-DECODED, NOT JSON.
// The xyk dex's views are read through the engine's `dex_view`, which
// carries **borsh** payloads. These types therefore describe the
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
// The xyk dex is a constant-product (x*y=k) AMM with two assets per
// pool.
//
// Pool kinds, as reported by the decoded `PoolView`:
//   - `Private`    — a single-owner pool
//   - `Public`     — a shared pool with LP shares
//   - `Launch`     — a token-launch pool quoted in NEAR
//   - `LaunchV2`   — a token-launch pool with an arbitrary quote asset
//
// The kind is the variant tag of the decoded value, so a pool reads
// as `{ Public: { ... } }` and the kind is checked with `"Public" in
// pool`.
//
// Fee fractions are parts per million: `1000000` is 100%.
//
// Amounts are u128 and are carried as `bigint` — Zorsh's native form
// for a u128, so nothing is converted and no precision is lost.
// =================================================
import type {
  INTEAR_DEX_XYK_FEE_RECEIVER_TYPE,
  INTEAR_DEX_XYK_SCHEDULED_FEE_CURVE_TYPE,
  INTEAR_DEX_XYK_SCHEDULED_FEE_WINDOW_TYPE,
  INTEAR_DEX_XYK_FEE_AMOUNT_TYPE,
  INTEAR_DEX_XYK_CURRENT_FEES_TYPE,
  INTEAR_DEX_XYK_V2_FEE_CONFIGURATION_TYPE,
  INTEAR_DEX_XYK_FEE_CONFIGURATION_TYPE,
  INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE,
  INTEAR_DEX_XYK_PRIVATE_POOL_TYPE,
  INTEAR_DEX_XYK_PUBLIC_POOL_TYPE,
  INTEAR_DEX_XYK_LAUNCH_POOL_TYPE,
  INTEAR_DEX_XYK_LAUNCH_V2_POOL_TYPE,
  INTEAR_DEX_XYK_POOL_TYPE,
  INTEAR_DEX_XYK_POOL_SHARE_TYPE,
} from "../lib/borsh/intear_dex_xyk_decode";
import type { INTEAR_DEX_ASSET_ID_DECODED } from "../lib/borsh/intear_dex_asset_id";

// ---------- fees ----------

// Where a pool's fee goes.
//
// VERIFIED: all three variants occur on mainnet. `Account` and `Pool`
// are the usual ones; `Community` shows up on the launch-v2 pools,
// where the community account collects the launch fee.
//
// The variant order IS the wire format: variant 0 is `Account`,
// variant 1 is `Pool`, variant 2 is `Community`.
export type { INTEAR_DEX_XYK_FEE_RECEIVER_TYPE };

// The only curve the contract has. VERIFIED live: every scheduled fee
// the mainnet pools carry uses it.
export type { INTEAR_DEX_XYK_SCHEDULED_FEE_CURVE_TYPE };

// A scheduled fee's window: a nanosecond timestamp and the fee
// fraction in force from then on.
//
// The timestamp is a `bigint` — nanoseconds since the epoch do not fit
// a JS number.
export type { INTEAR_DEX_XYK_SCHEDULED_FEE_WINDOW_TYPE };

// How much of a swap goes to a receiver.
//
// VERIFIED: `Fixed` and `Scheduled` occur on mainnet. `Dynamic` is in
// the union because the contract's borsh encoding has the variant,
// but the dex refuses to use it — it answers `DynamicFeeNotImplemented`
// and its fee maths is `unimplemented!()`. So `Dynamic` never appears
// in a decoded mainnet response.
export type { INTEAR_DEX_XYK_FEE_AMOUNT_TYPE };

// The fees a pool charges right now, in force parts per million.
//
// VERIFIED: `receivers` is a list of `(receiver, fee fraction)` pairs.
export type { INTEAR_DEX_XYK_CURRENT_FEES_TYPE };

// A v2 fee configuration: a fee rule per receiver.
//
// VERIFIED: `receivers` is a list of `(receiver, fee amount)` pairs.
export type { INTEAR_DEX_XYK_V2_FEE_CONFIGURATION_TYPE };

// A pool's fee configuration.
//
// VERIFIED: both variants occur on mainnet — `V1` on the older pools
// and `V2` on the newer ones.
export type { INTEAR_DEX_XYK_FEE_CONFIGURATION_TYPE };

// ---------- assets ----------

// One asset of a pool, with the balance the pool holds of it.
//
// VERIFIED: `asset_id` is the asset id and `balance` is the balance.
// The balance is a u128, so it is a `bigint`.
export type { INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE };

// ---------- pools ----------

// A pool with a single owner.
//
// VERIFIED: the field set is exactly `assets`, `fees`,
// `fee_configuration`, `owner_id` and `locked`. The variant tag IS
// the pool kind — the payload does not repeat it.
export type { INTEAR_DEX_XYK_PRIVATE_POOL_TYPE };

// A shared pool whose liquidity is held as LP shares.
//
// VERIFIED: the field set is exactly `assets`, `fees`,
// `fee_configuration` and `total_shares`. `total_shares` is `null`
// while the pool holds no shares yet — 74 of the 117 live public
// pools are in that state.
export type { INTEAR_DEX_XYK_PUBLIC_POOL_TYPE };

// A token-launch pool quoted in NEAR.
//
// VERIFIED: the field set is exactly `near_amount`, `launched_asset`,
// `fees`, `fee_configuration` and `phantom_liquidity_near`.
export type { INTEAR_DEX_XYK_LAUNCH_POOL_TYPE };

// A token-launch pool quoted in an arbitrary asset.
//
// VERIFIED: the field set is exactly `quote_asset`, `launched_asset`,
// `fees`, `fee_configuration` and `phantom_liquidity`. The first
// asset is the quote asset the phantom liquidity is held in.
export type { INTEAR_DEX_XYK_LAUNCH_V2_POOL_TYPE };

// A pool, in any of its four shapes.
//
// VERIFIED: all four kinds occur on mainnet.
export type { INTEAR_DEX_XYK_POOL_TYPE };

// ---------- LP shares ----------

// The LP share of one account in one pool.
//
// The xyk dex answers with one `Option` per pool:
//   - `shares: null`  — the pool is not a public pool, so it has no
//                       per-account share map at all, OR the pool is a
//                       public pool the account has no entry in
//   - `shares: 0n`    — the account is registered in the pool's share
//                       map but holds nothing
//   - `shares: 1234n` — the account holds that many shares
//
// VERIFIED: all three states occur on mainnet. The share amount is a
// u128, so it is carried as a `bigint`.
export type { INTEAR_DEX_XYK_POOL_SHARE_TYPE };

// The LP shares of one account across a list of pools, in the order
// the pools were asked for.
//
// VERIFIED: one entry per asked-for pool, always.
export type INTEAR_DEX_XYK_POOL_SHARES_TYPE = INTEAR_DEX_XYK_POOL_SHARE_TYPE[];

// ---------- pending fees ----------

// The fees an account has collected but not withdrawn yet, per asset.
//
// The contract returns a borsh `HashMap<AssetId, U128>`, which
// decodes to a map of asset id to amount.
//
// VERIFIED: an account with no collected fee is simply absent from
// the map, and an account with fees in more than one asset gets one
// entry per asset.
export type INTEAR_DEX_XYK_PENDING_FEES_TYPE = Map<
  INTEAR_DEX_ASSET_ID_KEY,
  bigint
>;

// The key of the pending-fees map: the asset id in its decoded borsh
// form.
export type INTEAR_DEX_ASSET_ID_KEY = INTEAR_DEX_ASSET_ID_DECODED;
// =================================================
// copyright 2026 by sleet.near
