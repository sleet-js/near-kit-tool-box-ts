import * as z from "zod";
import { AMOUNT_STRING_Z_CONST, COUNT_NUMBER_Z_CONST } from "./scalar_type";
// =================================================
// Typed shapes for Rhea AMM v2 account, LP, and metadata views.
//
// PROVENANCE
//   contract : `v2.ref-finance.near` (mainnet) — the Rhea AMM v2
//   methods  : `get_account_basic_info`, `get_pool_shares`,
//              `get_pool_shares_batch`, `get_pool_total_shares`,
//              `metadata`, `get_number_of_pools`, `get_deposit`,
//              `get_return`, `get_pool_share_price`
//   verified : 2026-10-28, against the live mainnet responses
//
// The AMM contract has evolved several pool kinds. These schemas keep
// the stable fields strict while preserving pool-specific and future
// fields in `extra`.
//
// The `metadata` view answers with 11 fields:
//   `version`, `owner`, `boost_farm_id`, `burrowland_id`, `guardians`,
//   `pool_count`, `state`, `admin_fee_bps`,
//   `cumulative_info_record_interval_sec`, `wnear_id`,
//   `auto_whitelisted_postfix`
// `pool_count` is a JSON number there. `get_number_of_pools` answers
// with a JSON number too.
// =================================================

// The account registration view. The contract answers with the
// storage deposit the account has paid and the storage it uses,
// both as decimal strings in yoctoNEAR.
//
// The contract answers with `null` for an account that has never
// registered, so the schema accepts `null` too.
export interface RHEA_AMMV2_ACCOUNT_BASIC_INFO_TYPE {
  near_amount?: string;
  storage_used?: string;
  extra: Record<string, unknown>;
}

export const RHEA_AMMV2_ACCOUNT_BASIC_INFO_TYPE_Z_CONST = z
  .object({
    near_amount: z.string().optional(),
    storage_used: z.string().optional(),
  })
  .loose()
  .transform((value) => ({
    near_amount: value.near_amount,
    storage_used: value.storage_used,
    extra: Object.fromEntries(
      Object.entries(value).filter(
        ([key]) => !["near_amount", "storage_used"].includes(key),
      ),
    ),
  })) satisfies z.ZodType<RHEA_AMMV2_ACCOUNT_BASIC_INFO_TYPE>;

// The nullable form — what the view actually answers for an account
// that has not registered with the contract.
export const RHEA_AMMV2_ACCOUNT_BASIC_INFO_OR_NULL_Z_CONST = z.union([
  RHEA_AMMV2_ACCOUNT_BASIC_INFO_TYPE_Z_CONST,
  z.null(),
]);

// The LP shares of one account in one pool. The contract answers
// with the LP token balance as a decimal string — `"0"` when the
// account holds nothing in that pool.
export interface RHEA_AMMV2_POOL_SHARES_TYPE {
  shares?: string;
  extra: Record<string, unknown>;
}

export const RHEA_AMMV2_POOL_SHARES_TYPE_Z_CONST = z
  .object({
    shares: z.string().optional(),
  })
  .loose()
  .transform((value) => ({
    shares: value.shares,
    extra: Object.fromEntries(
      Object.entries(value).filter(([key]) => key !== "shares"),
    ),
  })) satisfies z.ZodType<RHEA_AMMV2_POOL_SHARES_TYPE>;

// The LP shares of one account in a batch of pools, in the order the
// pools were asked for.
// Each entry is the same string `get_pool_shares` returns for one
// pool — the LP token balance, or `"0"` when the account holds
// nothing in that pool.
export type RHEA_AMMV2_POOL_SHARES_BATCH_TYPE = string[];

// The total LP shares of one pool, as a decimal string.
export interface RHEA_AMMV2_POOL_TOTAL_SHARES_TYPE {
  total_shares?: string;
  extra: Record<string, unknown>;
}

export const RHEA_AMMV2_POOL_TOTAL_SHARES_TYPE_Z_CONST = z
  .object({
    total_shares: z.string().optional(),
  })
  .loose()
  .transform((value) => ({
    total_shares: value.total_shares,
    extra: Object.fromEntries(
      Object.entries(value).filter(([key]) => key !== "total_shares"),
    ),
  })) satisfies z.ZodType<RHEA_AMMV2_POOL_TOTAL_SHARES_TYPE>;

// The contract metadata view. The contract answers with its version,
// its owner, the ids it is wired to, its guardians, the pool count,
// the running state, the admin fee, and the cumulative info record
// interval. Only the version is stable enough to name — every other
// field is kept in `extra`.
export interface RHEA_AMMV2_METADATA_TYPE {
  version?: string;
  extra: Record<string, unknown>;
}

export const RHEA_AMMV2_METADATA_TYPE_Z_CONST = z
  .object({
    version: z.string().optional(),
  })
  .loose()
  .transform((value) => ({
    version: value.version,
    extra: Object.fromEntries(
      Object.entries(value).filter(([key]) => key !== "version"),
    ),
  })) satisfies z.ZodType<RHEA_AMMV2_METADATA_TYPE>;

// The views that answer with a bare `U128` — a decimal string in the
// token's smallest unit. `get_pool_shares` and `get_pool_total_shares`
// answer with one, `get_pool_shares_batch` with one per pool in the
// order the pools were asked for.
const RHEA_AMMV2_U128_Z_CONST = AMOUNT_STRING_Z_CONST;

export { RHEA_AMMV2_U128_Z_CONST };

export const RHEA_AMMV2_U128_LIST_Z_CONST = z.array(RHEA_AMMV2_U128_Z_CONST);

// The pool count view answers with a plain `u64` — a JSON number.
const RHEA_AMMV2_POOL_COUNT_Z_CONST = COUNT_NUMBER_Z_CONST;

export { RHEA_AMMV2_POOL_COUNT_Z_CONST };
// =================================================
// copyright 2026 by sleet.near
