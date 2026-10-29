import * as z from "zod";
// =================================================
// RHEA_AMMV2_GET_POOL_TYPE
//
// PROVENANCE
//   contract : `v2.ref-finance.near` (mainnet) — the Rhea AMM v2
//   methods  : `get_pool`, `get_pools`
//   verified : 2026-10-28, against the live mainnet responses
//
// Shape returned by the rhea_ammv2 `get_pool` and `get_pools` view
// calls. A pool has exactly SIX keys:
//   `pool_kind`, `token_account_ids`, `amounts`, `total_fee`,
//   `shares_total_supply`, `amp`
// The pool kinds seen live are `SIMPLE_POOL`, `STABLE_SWAP`,
// `RATED_SWAP` and `DEGEN_SWAP`.
// =================================================

export interface RHEA_AMMV2_GET_POOL_TYPE {
  pool_kind: string;
  token_account_ids: string[];
  amounts: string[];
  total_fee: number;
  shares_total_supply: string;
  amp: number;
}

export const RHEA_AMMV2_GET_POOL_TYPE_Z_CONST = z.object({
  pool_kind: z.string(),
  token_account_ids: z.array(z.string()),
  amounts: z.array(z.string()),
  total_fee: z.number(),
  shares_total_supply: z.string(),
  amp: z.number(),
}) satisfies z.ZodType<RHEA_AMMV2_GET_POOL_TYPE>;

export const RHEA_AMMV2_GET_POOLS_TYPE_Z_CONST = z.array(
  RHEA_AMMV2_GET_POOL_TYPE_Z_CONST,
);
// =================================================
// copyright 2026 by sleet.near
