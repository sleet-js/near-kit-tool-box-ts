import * as z from "zod";
// =================================================
// Typed shapes returned by Rhea DCL v2 views.
//
// PROVENANCE
//   contract : `dclv2.ref-labs.near` (mainnet)
//   methods  : `get_pool`, `get_pools`, `list_pools`, `get_liquidity`,
//              `list_liquidities`, `get_user_asset`, `list_user_assets`,
//              `get_metadata`
//   verified : 2026-10-28, against the live mainnet response
//
// VERIFIED SHAPES
//   `get_pool` answers with 23 fields. The pool id is a composite
//   string — `<hash>|<token>|<fee>` — e.g.
//   `17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1|wrap.near|100`
//   and `token_x` is the HASH, not an account id. Checked across 4
//   live pools; every field had the type declared below.
//
//   `get_user_asset` answers with a BARE decimal string ("0"), not an
//   object. The token and the account are both in the request.
//
//   `list_user_assets` answers with a `{ token_id: balance }` map.
//
//   `get_metadata` answers with 12 fields:
//   `version`, `owner_id`, `farming_contract_id`, `next_owner_id`,
//   `next_owner_accept_deadline`, `wnear_id`, `state`, `operators`,
//   `protocol_fee_rate`, `pool_count`, `user_count`
//   `pool_count` and `user_count` are JSON STRINGS there ("6275",
//   "7921") and `protocol_fee_rate` is a JSON number. The schema below
//   names only `protocol_fee_rate` and keeps the rest in `extra`.
//
// NOT YET VERIFIED
//   `RHEA_DCLV2_LIQUIDITY_TYPE` — the liquidity views need an `lpt_id`
//   that no known account holds, so its field list is still
//   hand-written.
//
// DCL v2 pool and liquidity responses include optional pool-specific
// fields. The schemas preserve these in `extra`, so new contract fields
// do not make a typed view fail.
// =================================================

export interface RHEA_DCLV2_POOL_TYPE {
  pool_id: string;
  token_x: string;
  token_y: string;
  fee: number;
  point_delta?: number;
  current_point?: number;
  liquidity?: string;
  liquidity_x?: string;
  max_liquidity_per_point?: string;
  total_x: string;
  total_y: string;
  total_liquidity?: string;
  total_order_x?: string;
  total_order_y?: string;
  volume_x_in?: string;
  volume_x_out?: string;
  volume_y_in?: string;
  volume_y_out?: string;
  total_fee_x_charged?: string;
  total_fee_y_charged?: string;
  state?: string;
  // the tokens allowed in the pool, or `null` when it is open.
  whitelist?: string[] | null;
  // the tax the pool charges, or `null` when it charges none.
  tax?: string | null;
  extra: Record<string, unknown>;
}

export const RHEA_DCLV2_POOL_TYPE_Z_CONST = z
  .object({
    pool_id: z.string(),
    token_x: z.string(),
    token_y: z.string(),
    fee: z.number(),
    point_delta: z.number().optional(),
    current_point: z.number().optional(),
    liquidity: z.string().optional(),
    liquidity_x: z.string().optional(),
    max_liquidity_per_point: z.string().optional(),
    total_x: z.string(),
    total_y: z.string(),
    total_liquidity: z.string().optional(),
    total_order_x: z.string().optional(),
    total_order_y: z.string().optional(),
    volume_x_in: z.string().optional(),
    volume_x_out: z.string().optional(),
    volume_y_in: z.string().optional(),
    volume_y_out: z.string().optional(),
    total_fee_x_charged: z.string().optional(),
    total_fee_y_charged: z.string().optional(),
    state: z.string().optional(),
    whitelist: z.array(z.string()).nullable().optional(),
    tax: z.string().nullable().optional(),
  })
  .loose()
  .transform((value) => {
    const stable_keys = [
      "pool_id",
      "token_x",
      "token_y",
      "fee",
      "point_delta",
      "current_point",
      "liquidity",
      "liquidity_x",
      "max_liquidity_per_point",
      "total_x",
      "total_y",
      "total_liquidity",
      "total_order_x",
      "total_order_y",
      "volume_x_in",
      "volume_x_out",
      "volume_y_in",
      "volume_y_out",
      "total_fee_x_charged",
      "total_fee_y_charged",
      "state",
      "whitelist",
      "tax",
    ] as const;
    return {
      ...value,
      extra: Object.fromEntries(
        Object.entries(value).filter(
          ([key]) => !(stable_keys as readonly string[]).includes(key),
        ),
      ),
    };
  }) satisfies z.ZodType<RHEA_DCLV2_POOL_TYPE>;

export const RHEA_DCLV2_POOLS_TYPE_Z_CONST = z.array(
  RHEA_DCLV2_POOL_TYPE_Z_CONST,
);

export interface RHEA_DCLV2_LIQUIDITY_TYPE {
  lpt_id?: string;
  owner_id?: string;
  pool_id: string;
  left_point: number;
  right_point: number;
  amount?: string;
  extra: Record<string, unknown>;
}

export const RHEA_DCLV2_LIQUIDITY_TYPE_Z_CONST = z
  .object({
    lpt_id: z.string().optional(),
    owner_id: z.string().optional(),
    pool_id: z.string(),
    left_point: z.number(),
    right_point: z.number(),
    amount: z.string().optional(),
  })
  .loose()
  .transform((value) => {
    const stable_keys = [
      "lpt_id",
      "owner_id",
      "pool_id",
      "left_point",
      "right_point",
      "amount",
    ] as const;
    return {
      ...value,
      extra: Object.fromEntries(
        Object.entries(value).filter(
          ([key]) => !(stable_keys as readonly string[]).includes(key),
        ),
      ),
    };
  }) satisfies z.ZodType<RHEA_DCLV2_LIQUIDITY_TYPE>;

export const RHEA_DCLV2_LIQUIDITIES_TYPE_Z_CONST = z.array(
  RHEA_DCLV2_LIQUIDITY_TYPE_Z_CONST,
);

// The internal balance ONE account holds of ONE token.
//
// The live answer is a bare decimal string, not an object: the
// `get_user_asset` view on `dclv2.ref-labs.near` answers `"0"` for an
// account with no balance. The token and the account are both in the
// request, so the response needs to repeat neither.
export type RHEA_DCLV2_USER_ASSET_TYPE = string;

export const RHEA_DCLV2_USER_ASSET_TYPE_Z_CONST = z
  .string()
  .regex(/^\d+$/) satisfies z.ZodType<RHEA_DCLV2_USER_ASSET_TYPE>;

export interface RHEA_DCLV2_USER_ASSETS_TYPE {
  [token_id: string]: string;
}

// The `list_user_assets` view answers with a `{ token_id: balance }`
// map, the balances as decimal strings in the token's smallest unit.
export const RHEA_DCLV2_USER_ASSETS_TYPE_Z_CONST = z.record(
  z.string(),
  z.string(),
) satisfies z.ZodType<RHEA_DCLV2_USER_ASSETS_TYPE>;

export interface RHEA_DCLV2_METADATA_TYPE {
  protocol_fee_rate: number;
  extra: Record<string, unknown>;
}

export const RHEA_DCLV2_METADATA_TYPE_Z_CONST = z
  .object({
    protocol_fee_rate: z.number(),
  })
  .loose()
  .transform((value) => ({
    protocol_fee_rate: value.protocol_fee_rate,
    extra: Object.fromEntries(
      Object.entries(value).filter(([key]) => key !== "protocol_fee_rate"),
    ),
  })) satisfies z.ZodType<RHEA_DCLV2_METADATA_TYPE>;
// =================================================
// copyright 2026 by sleet.near
