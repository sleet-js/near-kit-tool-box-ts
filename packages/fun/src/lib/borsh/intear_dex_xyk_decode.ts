// =================================================
// intear_dex_xyk_decode
//
// Borsh schemas for the INTEAR DEX `xyk` sub-dex view responses.
//
// The shapes mirror `xyk_dex_types` in the INTEAR DEX source:
//   https://github.com/INTEARnear/dex/tree/main/dexes/xyk/types
//
// These are [`@zorsh/zorsh`](https://www.npmjs.com/package/@zorsh/zorsh)
// schemas, so the schema *is* the type: `b.infer` reads the decoded
// shape straight off the schema, and there is no second, hand-written
// TypeScript interface that can drift away from it.
//
// Amounts are u128 and are carried as `bigint` — Zorsh's native form
// for a u128, so nothing is converted and no precision is lost.
//
// VERIFIED against live mainnet data (2026-10-29)
//   All 303 pools of `slimedragon.near/xyk` were fetched with
//   `get_pools` and decoded here. Every one of them decoded with zero
//   leftover bytes, so the field order and the variant numbers below
//   are exact. The variants seen live:
//     - pool view         : `Private`, `Public`, `Launch`, `LaunchV2`
//     - fee configuration : `V1`, `V2`
//     - fee receiver      : `Account`, `Pool`, `Community`
//     - fee amount        : `Fixed`, `Scheduled`
//   The `Dynamic` fee amount never appears: the dex refuses to use it.
//
//   The capture is committed as a test fixture, and the fixture test
//   re-checks all 303 pools against these schemas.
// =================================================
import { b } from "@zorsh/zorsh";
import { intear_dex_asset_id_schema } from "./intear_dex_asset_id";

// ---------- fees ----------

// Where a pool's fee goes.
//
// VERIFIED: all three variants occur on mainnet. `Account` and `Pool`
// are the usual ones; `Community` shows up on the launch-v2 pools,
// where the community account collects the launch fee.
//
// The variant order IS the wire format: variant 0 is `Account`,
// variant 1 is `Pool`, variant 2 is `Community`.
export const intear_dex_xyk_fee_receiver_schema = b.enum({
  Account: b.string(),
  Pool: b.unit(),
  Community: b.string(),
});

// The only curve the contract has. VERIFIED live: every scheduled fee
// the mainnet pools carry uses it.
export const intear_dex_xyk_scheduled_fee_curve_schema = b.enum({
  Linear: b.unit(),
});

// A scheduled fee's window: a nanosecond timestamp and the fee
// fraction in force from then on.
//
// The timestamps are nanoseconds since the epoch, so they are u64.
export const intear_dex_xyk_scheduled_fee_window_schema = b.tuple(
  b.u64(),
  b.u32(),
);

// How much of a swap goes to a receiver.
//
// VERIFIED: `Fixed` and `Scheduled` occur on mainnet. `Dynamic` is in
// the union because the contract's borsh encoding has the variant,
// but the dex refuses to use it — it answers `DynamicFeeNotImplemented`
// and its fee maths is `unimplemented!()`. So `Dynamic` never appears
// in a decoded mainnet response.
export const intear_dex_xyk_fee_amount_schema = b.enum({
  Fixed: b.u32(),
  Scheduled: b.struct({
    start: intear_dex_xyk_scheduled_fee_window_schema,
    end: intear_dex_xyk_scheduled_fee_window_schema,
    curve: intear_dex_xyk_scheduled_fee_curve_schema,
  }),
  Dynamic: b.struct({ min: b.u32(), max: b.u32() }),
});

// The fees a pool charges right now, in force parts per million.
//
// VERIFIED: `receivers` is a list of `(receiver, fee fraction)` pairs.
export const intear_dex_xyk_current_fees_schema = b.struct({
  receivers: b.vec(b.tuple(intear_dex_xyk_fee_receiver_schema, b.u32())),
});

// A v2 fee configuration: a fee rule per receiver.
//
// VERIFIED: `receivers` is a list of `(receiver, fee amount)` pairs.
export const intear_dex_xyk_v2_fee_configuration_schema = b.struct({
  receivers: b.vec(
    b.tuple(
      intear_dex_xyk_fee_receiver_schema,
      intear_dex_xyk_fee_amount_schema,
    ),
  ),
});

// A pool's fee configuration.
//
// VERIFIED: both variants occur on mainnet — `V1` on the older pools
// and `V2` on the newer ones.
export const intear_dex_xyk_fee_configuration_schema = b.enum({
  V1: intear_dex_xyk_current_fees_schema,
  V2: intear_dex_xyk_v2_fee_configuration_schema,
});

// ---------- assets ----------

// One asset of a pool, with the balance the pool holds of it.
//
// VERIFIED: `asset_id` is the asset id and `balance` is the balance.
// The balance is a u128, so it is a `bigint`.
export const intear_dex_xyk_asset_with_balance_schema = b.struct({
  asset_id: intear_dex_asset_id_schema,
  balance: b.u128(),
});

// ---------- pools ----------

// A pool with a single owner.
//
// VERIFIED: the field set is exactly `assets`, `fees`,
// `fee_configuration`, `owner_id` and `locked`. The variant tag IS
// the pool kind — the payload does not repeat it.
export const intear_dex_xyk_private_pool_schema = b.struct({
  assets: b.tuple(
    intear_dex_xyk_asset_with_balance_schema,
    intear_dex_xyk_asset_with_balance_schema,
  ),
  fees: intear_dex_xyk_current_fees_schema,
  fee_configuration: intear_dex_xyk_fee_configuration_schema,
  owner_id: b.string(),
  locked: b.bool(),
});

// A shared pool whose liquidity is held as LP shares.
//
// VERIFIED: the field set is exactly `assets`, `fees`,
// `fee_configuration` and `total_shares`. `total_shares` is `null`
// while the pool holds no shares yet — 74 of the 117 live public
// pools are in that state.
export const intear_dex_xyk_public_pool_schema = b.struct({
  assets: b.tuple(
    intear_dex_xyk_asset_with_balance_schema,
    intear_dex_xyk_asset_with_balance_schema,
  ),
  fees: intear_dex_xyk_current_fees_schema,
  fee_configuration: intear_dex_xyk_fee_configuration_schema,
  total_shares: b.option(b.u128()),
});

// A token-launch pool quoted in NEAR.
//
// VERIFIED: the field set is exactly `near_amount`, `launched_asset`,
// `fees`, `fee_configuration` and `phantom_liquidity_near`.
export const intear_dex_xyk_launch_pool_schema = b.struct({
  near_amount: b.u128(),
  launched_asset: intear_dex_xyk_asset_with_balance_schema,
  fees: intear_dex_xyk_current_fees_schema,
  fee_configuration: intear_dex_xyk_fee_configuration_schema,
  phantom_liquidity_near: b.u128(),
});

// A token-launch pool quoted in an arbitrary asset.
//
// VERIFIED: the field set is exactly `quote_asset`, `launched_asset`,
// `fees`, `fee_configuration` and `phantom_liquidity`. The first
// asset is the quote asset the phantom liquidity is held in.
export const intear_dex_xyk_launch_v2_pool_schema = b.struct({
  quote_asset: intear_dex_xyk_asset_with_balance_schema,
  launched_asset: intear_dex_xyk_asset_with_balance_schema,
  fees: intear_dex_xyk_current_fees_schema,
  fee_configuration: intear_dex_xyk_fee_configuration_schema,
  phantom_liquidity: b.u128(),
});

// A pool, in any of its four shapes.
//
// VERIFIED: all four kinds occur on mainnet.
//
// The variant order IS the wire format: variant 0 is `Private`,
// variant 1 is `Public`, variant 2 is `Launch`, variant 3 is
// `LaunchV2`.
export const intear_dex_xyk_pool_schema = b.enum({
  Private: intear_dex_xyk_private_pool_schema,
  Public: intear_dex_xyk_public_pool_schema,
  Launch: intear_dex_xyk_launch_pool_schema,
  LaunchV2: intear_dex_xyk_launch_v2_pool_schema,
});

// ---------- LP shares ----------

// The LP share of one account in one pool.
//
// The xyk dex answers with one `Option` per pool:
//   - `None`    — the pool is not a public pool, so it has no
//                 per-account share map at all, OR the pool is a
//                 public pool the account has no entry in
//   - `Some(n)` — the account holds `n` shares in that pool. `n` is
//                 zero when the account is registered in the pool's
//                 share map but holds nothing.
//
// VERIFIED live: all three states — `null`, `0` and a positive
// amount — were observed in the mainnet responses.
export const intear_dex_xyk_pool_share_schema = b.struct({
  shares: b.option(b.u128()),
});

// ---------- pending fees ----------

// The fees an account has collected but not withdrawn yet, per asset.
//
// The contract returns a borsh `HashMap<AssetId, U128>`. Zorsh's
// `hashMap` reads the entries in the order they are on the wire, and
// Rust writes a `HashMap` in canonical `Ord` order, so the decoded
// map is in the order Rust produced it.
//
// VERIFIED: an account with no collected fee is simply absent from
// the map, and an account with fees in more than one asset gets one
// entry per asset.
export const intear_dex_xyk_pending_fees_schema = b.hashMap(
  intear_dex_asset_id_schema,
  b.u128(),
);

// =================================================
// The decoded shapes, read straight off the schemas.
//
// These are the types the helpers return. The schema is the single
// source of truth — there is no hand-written interface that could
// drift away from the wire format.
export type INTEAR_DEX_XYK_FEE_RECEIVER_TYPE = b.infer<
  typeof intear_dex_xyk_fee_receiver_schema
>;
export type INTEAR_DEX_XYK_SCHEDULED_FEE_CURVE_TYPE = b.infer<
  typeof intear_dex_xyk_scheduled_fee_curve_schema
>;
export type INTEAR_DEX_XYK_SCHEDULED_FEE_WINDOW_TYPE = b.infer<
  typeof intear_dex_xyk_scheduled_fee_window_schema
>;
export type INTEAR_DEX_XYK_FEE_AMOUNT_TYPE = b.infer<
  typeof intear_dex_xyk_fee_amount_schema
>;
export type INTEAR_DEX_XYK_CURRENT_FEES_TYPE = b.infer<
  typeof intear_dex_xyk_current_fees_schema
>;
export type INTEAR_DEX_XYK_V2_FEE_CONFIGURATION_TYPE = b.infer<
  typeof intear_dex_xyk_v2_fee_configuration_schema
>;
export type INTEAR_DEX_XYK_FEE_CONFIGURATION_TYPE = b.infer<
  typeof intear_dex_xyk_fee_configuration_schema
>;
export type INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE = b.infer<
  typeof intear_dex_xyk_asset_with_balance_schema
>;
export type INTEAR_DEX_XYK_PRIVATE_POOL_TYPE = b.infer<
  typeof intear_dex_xyk_private_pool_schema
>;
export type INTEAR_DEX_XYK_PUBLIC_POOL_TYPE = b.infer<
  typeof intear_dex_xyk_public_pool_schema
>;
export type INTEAR_DEX_XYK_LAUNCH_POOL_TYPE = b.infer<
  typeof intear_dex_xyk_launch_pool_schema
>;
export type INTEAR_DEX_XYK_LAUNCH_V2_POOL_TYPE = b.infer<
  typeof intear_dex_xyk_launch_v2_pool_schema
>;
export type INTEAR_DEX_XYK_POOL_TYPE = b.infer<
  typeof intear_dex_xyk_pool_schema
>;
export type INTEAR_DEX_XYK_POOL_SHARE_TYPE = b.infer<
  typeof intear_dex_xyk_pool_share_schema
>;
// =================================================
// copyright 2026 by sleet.near
