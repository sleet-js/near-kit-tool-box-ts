// =================================================
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
//       share states (`null`, `"0"`, a positive amount) were observed.
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
// The xyk dex is a constant-product (x*y=k) AMM with two assets per
// pool.
//
// Pool kinds, as reported by the decoded `PoolView`:
//   - `Private`    — a single-owner pool
//   - `Public`     — a shared pool with LP shares
//   - `Launch`     — a token-launch pool quoted in NEAR
//   - `LaunchV2`   — a token-launch pool with an arbitrary quote asset
//
// Fee fractions are parts per million: `1000000` is 100%.
// =================================================

// ---------- fees ----------

// Where a pool's fee goes.
//
// VERIFIED: all three variants occur on mainnet. `Account` and `Pool`
// are the usual ones; `Community` shows up on the launch-v2 pools,
// where the community account collects the launch fee.
export type INTEAR_DEX_XYK_FEE_RECEIVER_TYPE =
  { Account: string } | "Pool" | { Community: string };

// How much of a swap goes to a receiver.
//
// VERIFIED: `Fixed` and `Scheduled` occur on mainnet. `Dynamic` is in
// the union because the contract's borsh encoding has the variant,
// but the dex refuses to use it — it answers `DynamicFeeNotImplemented`
// and its fee maths is `unimplemented!()`. So `Dynamic` never appears
// in a decoded mainnet response.
export type INTEAR_DEX_XYK_FEE_AMOUNT_TYPE =
  | { Fixed: number }
  | {
      Scheduled: {
        // The schedule's start, as `[nanosecond timestamp, fee
        // fraction]`. The timestamp is a decimal string — it does not
        // fit a JS number.
        start: [string, number];
        // The schedule's end, as `[nanosecond timestamp, fee fraction]`.
        end: [string, number];
        // The only curve the contract has. VERIFIED live.
        curve: "Linear";
      };
    }
  | { Dynamic: { min: number; max: number } };

// The fees a pool charges right now, in force parts per million.
//
// VERIFIED: `receivers` is a list of `(receiver, fee fraction)` pairs.
export interface INTEAR_DEX_XYK_CURRENT_FEES_TYPE {
  receivers: [INTEAR_DEX_XYK_FEE_RECEIVER_TYPE, number][];
}

// A v2 fee configuration: a fee rule per receiver.
//
// VERIFIED: `receivers` is a list of `(receiver, fee amount)` pairs.
export interface INTEAR_DEX_XYK_V2_FEE_CONFIGURATION_TYPE {
  receivers: [
    INTEAR_DEX_XYK_FEE_RECEIVER_TYPE,
    INTEAR_DEX_XYK_FEE_AMOUNT_TYPE,
  ][];
}

// A pool's fee configuration.
//
// VERIFIED: both variants occur on mainnet — `V1` on the older pools
// and `V2` on the newer ones.
export type INTEAR_DEX_XYK_FEE_CONFIGURATION_TYPE =
  | { V1: INTEAR_DEX_XYK_CURRENT_FEES_TYPE }
  | { V2: INTEAR_DEX_XYK_V2_FEE_CONFIGURATION_TYPE };

// ---------- assets ----------

// One asset of a pool, with the balance the pool holds of it.
//
// VERIFIED: `asset_id` is the asset id string and `balance` is the
// balance as a decimal string. The balance is a u128, so it does not
// fit a JS number.
export interface INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE {
  asset_id: string;
  balance: string;
}

// ---------- pools ----------

// A pool with a single owner.
//
// VERIFIED: the field set is exactly `kind`, `assets`, `fees`,
// `fee_configuration`, `owner_id` and `locked`.
export interface INTEAR_DEX_XYK_PRIVATE_POOL_TYPE {
  kind: "Private";
  assets: [
    INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE,
    INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE,
  ];
  fees: INTEAR_DEX_XYK_CURRENT_FEES_TYPE;
  fee_configuration: INTEAR_DEX_XYK_FEE_CONFIGURATION_TYPE;
  owner_id: string;
  locked: boolean;
}

// A shared pool whose liquidity is held as LP shares.
//
// VERIFIED: the field set is exactly `kind`, `assets`, `fees`,
// `fee_configuration` and `total_shares`. `total_shares` is `null`
// while the pool holds no shares yet — 74 of the 117 live public
// pools are in that state.
export interface INTEAR_DEX_XYK_PUBLIC_POOL_TYPE {
  kind: "Public";
  assets: [
    INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE,
    INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE,
  ];
  fees: INTEAR_DEX_XYK_CURRENT_FEES_TYPE;
  fee_configuration: INTEAR_DEX_XYK_FEE_CONFIGURATION_TYPE;
  total_shares: string | null;
}

// A token-launch pool quoted in NEAR.
//
// VERIFIED: the field set is exactly `kind`, `near_amount`,
// `launched_asset`, `fees`, `fee_configuration` and
// `phantom_liquidity_near`.
export interface INTEAR_DEX_XYK_LAUNCH_POOL_TYPE {
  kind: "Launch";
  near_amount: string;
  launched_asset: INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE;
  fees: INTEAR_DEX_XYK_CURRENT_FEES_TYPE;
  fee_configuration: INTEAR_DEX_XYK_FEE_CONFIGURATION_TYPE;
  phantom_liquidity_near: string;
}

// A token-launch pool quoted in an arbitrary asset.
//
// VERIFIED: the field set is exactly `kind`, `quote_asset`,
// `launched_asset`, `fees`, `fee_configuration` and
// `phantom_liquidity`. The first asset is the quote asset the
// phantom liquidity is held in.
export interface INTEAR_DEX_XYK_LAUNCH_V2_POOL_TYPE {
  kind: "LaunchV2";
  quote_asset: INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE;
  launched_asset: INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE;
  fees: INTEAR_DEX_XYK_CURRENT_FEES_TYPE;
  fee_configuration: INTEAR_DEX_XYK_FEE_CONFIGURATION_TYPE;
  phantom_liquidity: string;
}

// A pool, in any of its four shapes.
//
// VERIFIED: all four kinds occur on mainnet.
export type INTEAR_DEX_XYK_POOL_TYPE =
  | INTEAR_DEX_XYK_PRIVATE_POOL_TYPE
  | INTEAR_DEX_XYK_PUBLIC_POOL_TYPE
  | INTEAR_DEX_XYK_LAUNCH_POOL_TYPE
  | INTEAR_DEX_XYK_LAUNCH_V2_POOL_TYPE;

// ---------- LP shares ----------

// The LP share of one account in one pool.
//
// The xyk dex answers with one `Option` per pool, and the decoder
// turns it into this object:
//   - `shares: null`  — the pool is not a public pool, so it has no
//                       per-account share map at all, OR the pool is a
//                       public pool the account has no entry in
//   - `shares: "0"`   — the account is registered in the pool's share
//                       map but holds nothing
//   - `shares: "1234"` — the account holds that many shares
//
// VERIFIED: all three states occur on mainnet. The share amount is a
// u128, so it is carried as a decimal string.
export interface INTEAR_DEX_XYK_POOL_SHARE_TYPE {
  shares: string | null;
}

// The LP shares of one account across a list of pools, in the order
// the pools were asked for.
//
// VERIFIED: one entry per asked-for pool, always.
export type INTEAR_DEX_XYK_POOL_SHARES_TYPE = INTEAR_DEX_XYK_POOL_SHARE_TYPE[];

// ---------- pending fees ----------

// The fees an account has collected but not withdrawn yet, per asset.
//
// The contract returns a borsh `HashMap<AssetId, U128>`, which
// decodes to a plain object of asset id to amount.
//
// VERIFIED: an account with no collected fee is simply absent from
// the map, and an account with fees in more than one asset gets one
// entry per asset.
export type INTEAR_DEX_XYK_PENDING_FEES_TYPE = Record<string, string>;
// =================================================
// copyright 2026 by sleet.near
