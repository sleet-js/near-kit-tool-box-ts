import * as z from "zod";
// =================================================
// Typed shapes returned by Rhea DCL v2 views.
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
  })
  .loose()
  .transform((value) => {
    const stableKeys = [
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
    ] as const;
    return {
      ...value,
      extra: Object.fromEntries(
        Object.entries(value).filter(([key]) =>
          !(stableKeys as readonly string[]).includes(key),
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
    const stableKeys = [
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
        Object.entries(value).filter(([key]) =>
          !(stableKeys as readonly string[]).includes(key),
        ),
      ),
    };
  }) satisfies z.ZodType<RHEA_DCLV2_LIQUIDITY_TYPE>;

export const RHEA_DCLV2_LIQUIDITIES_TYPE_Z_CONST = z.array(
  RHEA_DCLV2_LIQUIDITY_TYPE_Z_CONST,
);

export interface RHEA_DCLV2_USER_ASSET_TYPE {
  token_id?: string;
  balance?: string;
  extra: Record<string, unknown>;
}

export const RHEA_DCLV2_USER_ASSET_TYPE_Z_CONST = z
  .object({
    token_id: z.string().optional(),
    balance: z.string().optional(),
  })
  .loose()
  .transform((value) => ({
    ...value,
    extra: Object.fromEntries(
      Object.entries(value).filter(
        ([key]) => !["token_id", "balance"].includes(key),
      ),
    ),
  })) satisfies z.ZodType<RHEA_DCLV2_USER_ASSET_TYPE>;

export interface RHEA_DCLV2_USER_ASSETS_TYPE {
  [token_id: string]: string;
}

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
