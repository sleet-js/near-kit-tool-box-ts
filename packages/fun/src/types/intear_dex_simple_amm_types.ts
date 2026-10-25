// =================================================
// Typed shapes returned by the INTEAR DEX `simple-amm` sub-dex views.
//
// The simple-amm dex is the smallest working AMM: one liquidity
// provider per pool, constant-product math, no shares.
//
// Its views are read through the engine's `dex_view`, which carries
// **borsh** payloads.
// =================================================

export interface INTEAR_DEX_SIMPLE_AMM_ASSET_WITH_BALANCE_TYPE {
  asset_id: string;
  balance: string;
}

export interface INTEAR_DEX_SIMPLE_AMM_POOL_TYPE {
  assets: [
    INTEAR_DEX_SIMPLE_AMM_ASSET_WITH_BALANCE_TYPE,
    INTEAR_DEX_SIMPLE_AMM_ASSET_WITH_BALANCE_TYPE,
  ];
  owner_id: string;
}
// =================================================
// copyright 2026 by sleet.near
