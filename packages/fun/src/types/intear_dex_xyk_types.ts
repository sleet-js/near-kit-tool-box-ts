// =================================================
// Typed shapes returned by the INTEAR DEX `xyk` sub-dex views.
//
// The xyk dex is a constant-product (x*y=k) AMM with two assets per
// pool. Its views are read through the engine's `dex_view`, which
// carries **borsh** payloads, so these types describe the decoded
// borsh values.
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

export type INTEAR_DEX_XYK_FEE_RECEIVER_TYPE =
  { Account: string } | "Pool" | { Community: string };

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
        curve: "Linear";
      };
    }
  | { Dynamic: { min: number; max: number } };

export interface INTEAR_DEX_XYK_CURRENT_FEES_TYPE {
  receivers: [INTEAR_DEX_XYK_FEE_RECEIVER_TYPE, number][];
}

export interface INTEAR_DEX_XYK_V2_FEE_CONFIGURATION_TYPE {
  receivers: [
    INTEAR_DEX_XYK_FEE_RECEIVER_TYPE,
    INTEAR_DEX_XYK_FEE_AMOUNT_TYPE,
  ][];
}

export type INTEAR_DEX_XYK_FEE_CONFIGURATION_TYPE =
  | { V1: INTEAR_DEX_XYK_CURRENT_FEES_TYPE }
  | { V2: INTEAR_DEX_XYK_V2_FEE_CONFIGURATION_TYPE };

// ---------- assets ----------

export interface INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE {
  asset_id: string;
  balance: string;
}

// ---------- pools ----------

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

export interface INTEAR_DEX_XYK_LAUNCH_POOL_TYPE {
  kind: "Launch";
  near_amount: string;
  launched_asset: INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE;
  fees: INTEAR_DEX_XYK_CURRENT_FEES_TYPE;
  fee_configuration: INTEAR_DEX_XYK_FEE_CONFIGURATION_TYPE;
  phantom_liquidity_near: string;
}

export interface INTEAR_DEX_XYK_LAUNCH_V2_POOL_TYPE {
  kind: "LaunchV2";
  quote_asset: INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE;
  launched_asset: INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE;
  fees: INTEAR_DEX_XYK_CURRENT_FEES_TYPE;
  fee_configuration: INTEAR_DEX_XYK_FEE_CONFIGURATION_TYPE;
  phantom_liquidity: string;
}

export type INTEAR_DEX_XYK_POOL_TYPE =
  | INTEAR_DEX_XYK_PRIVATE_POOL_TYPE
  | INTEAR_DEX_XYK_PUBLIC_POOL_TYPE
  | INTEAR_DEX_XYK_LAUNCH_POOL_TYPE
  | INTEAR_DEX_XYK_LAUNCH_V2_POOL_TYPE;

// ---------- LP shares ----------

// The LP share of one account in one pool.
// The xyk dex answers with one `Option` per pool:
//   - `null`        — the pool is not a public pool, so it has no
//                     per-account share map at all
//   - `{ "0" }`     — the account has no entry in the pool's share
//                     map, so it holds nothing
//   - `{ "123456" }` — the account holds that many shares
export interface INTEAR_DEX_XYK_POOL_SHARE_TYPE {
  shares: string | null;
}

// The LP shares of one account across a list of pools, in the order
// the pools were asked for.
export type INTEAR_DEX_XYK_POOL_SHARES_TYPE = INTEAR_DEX_XYK_POOL_SHARE_TYPE[];

// ---------- pending fees ----------

// The fees an account has collected but not withdrawn yet, per asset.
export type INTEAR_DEX_XYK_PENDING_FEES_TYPE = Record<string, string>;
// =================================================
// copyright 2026 by sleet.near
