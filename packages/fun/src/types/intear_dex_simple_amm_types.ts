// =================================================
// Typed shapes returned by the INTEAR DEX `simple-amm` sub-dex views.
//
// PROVENANCE
//   contract : `dex.intear.near` (mainnet) — the INTEAR DEX engine,
//              sub-dex `simple-amm`
//   methods  : `get_pool` (read through the engine's `dex_view`)
//   verified : 2026-10-28, against the live mainnet response
//
// BORS-DECODED, NOT JSON.
// The simple-amm dex's views are read through the engine's `dex_view`,
// which carries **borsh** payloads. These types therefore describe the
// values AFTER the borsh decoder has run, not the JSON the RPC
// returned. A JSON schema (Zod) is the WRONG tool for these — the
// wire form is a borsh byte string and never a JSON document — so
// these stay plain types and the helpers keep casting.
//
// The simple-amm dex is the smallest working AMM: one liquidity
// provider per pool, constant-product math, no shares.
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
