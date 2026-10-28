import * as z from "zod";
// =================================================
// Typed shapes for Rhea AMM v2 account, LP, and metadata views.
//
// The AMM contract has evolved several pool kinds. These schemas keep
// the stable fields strict while preserving pool-specific and future
// fields in `extra`.
// =================================================

export interface RHEA_AMMV2_ACCOUNT_BASIC_INFO_TYPE {
  account_id?: string;
  registered_tokens?: string[];
  storage_usage?: number;
  extra: Record<string, unknown>;
}

export const RHEA_AMMV2_ACCOUNT_BASIC_INFO_TYPE_Z_CONST = z
  .object({
    account_id: z.string().optional(),
    registered_tokens: z.array(z.string()).optional(),
    storage_usage: z.number().optional(),
  })
  .loose()
  .transform((value) => ({
    account_id: value.account_id,
    registered_tokens: value.registered_tokens,
    storage_usage: value.storage_usage,
    extra: Object.fromEntries(
      Object.entries(value).filter(
        ([key]) =>
          !["account_id", "registered_tokens", "storage_usage"].includes(key),
      ),
    ),
  })) satisfies z.ZodType<RHEA_AMMV2_ACCOUNT_BASIC_INFO_TYPE>;

export interface RHEA_AMMV2_POOL_SHARES_TYPE {
  pool_id?: number;
  account_id?: string;
  shares?: string;
  extra: Record<string, unknown>;
}

export const RHEA_AMMV2_POOL_SHARES_TYPE_Z_CONST = z
  .object({
    pool_id: z.number().optional(),
    account_id: z.string().optional(),
    shares: z.string().optional(),
  })
  .loose()
  .transform((value) => ({
    pool_id: value.pool_id,
    account_id: value.account_id,
    shares: value.shares,
    extra: Object.fromEntries(
      Object.entries(value).filter(
        ([key]) => !["pool_id", "account_id", "shares"].includes(key),
      ),
    ),
  })) satisfies z.ZodType<RHEA_AMMV2_POOL_SHARES_TYPE>;

/**
 * The LP shares of one account in a batch of pools, in the order the
 * pools were asked for.
 *
 * Each entry is the same string `get_pool_shares` returns for one
 * pool — the LP token balance, or `"0"` when the account holds
 * nothing in that pool.
 */
export type RHEA_AMMV2_POOL_SHARES_BATCH_TYPE = string[];

export interface RHEA_AMMV2_POOL_TOTAL_SHARES_TYPE {
  pool_id?: number;
  total_shares?: string;
  extra: Record<string, unknown>;
}

export const RHEA_AMMV2_POOL_TOTAL_SHARES_TYPE_Z_CONST = z
  .object({
    pool_id: z.number().optional(),
    total_shares: z.string().optional(),
  })
  .loose()
  .transform((value) => ({
    pool_id: value.pool_id,
    total_shares: value.total_shares,
    extra: Object.fromEntries(
      Object.entries(value).filter(
        ([key]) => !["pool_id", "total_shares"].includes(key),
      ),
    ),
  })) satisfies z.ZodType<RHEA_AMMV2_POOL_TOTAL_SHARES_TYPE>;

export interface RHEA_AMMV2_METADATA_TYPE {
  name?: string;
  symbol?: string;
  version?: string;
  extra: Record<string, unknown>;
}

export const RHEA_AMMV2_METADATA_TYPE_Z_CONST = z
  .object({
    name: z.string().optional(),
    symbol: z.string().optional(),
    version: z.string().optional(),
  })
  .loose()
  .transform((value) => ({
    name: value.name,
    symbol: value.symbol,
    version: value.version,
    extra: Object.fromEntries(
      Object.entries(value).filter(
        ([key]) => !["name", "symbol", "version"].includes(key),
      ),
    ),
  })) satisfies z.ZodType<RHEA_AMMV2_METADATA_TYPE>;
// =================================================
// copyright 2026 by sleet.near
