import * as z from "zod";
import { AMOUNT_STRING_Z_CONST, BOOLEAN_Z_CONST } from "./scalar_type";
// =================================================
// Typed shapes returned by the INTEAR DEX engine views.
//
// PROVENANCE
//   contract : `dex.intear.near` (mainnet) — the INTEAR DEX engine
//   methods  : `storage_balance_of`, `storage_balance_bounds`,
//              `total_storage_balances`, `contract_source_metadata`,
//              `registered_assets_of`, `dex_storage_balance_of`,
//              `dex_storage_balance_bounds`
//   verified : 2026-10-28, against the live mainnet responses
//
// The engine contract (`dex.intear.near`) keeps per-user and per-dex
// balances of many asset kinds at once. Its views are JSON, and every
// 128-bit amount comes back as a decimal string (yocto units).
//
// The schemas keep unknown fields in `extra`, so a new contract field
// does not make a typed view fail.
//
// The `contract_source_metadata` view answers with
// `{ version, link, standards, build_info }` — `build_info` is the
// extra field the type does not name, so it lands in `extra`.
// =================================================

// ---------- AccountOrDexId ----------

// The INTEAR DEX `AccountOrDexId`.
// JSON form (the engine's own JSON API) is externally tagged:
// `{"Account": "alice.near"}` or `{"Dex": "slimedragon.near/xyk"}`.
// The dex variant carries the dex id in its string form — the
// `<deployer>/<id>` shape — because `DexId` serializes as a string.
export type INTEAR_DEX_ACCOUNT_OR_DEX_ID =
  { Account: string } | { Dex: string };

// ---------- AssetId ----------

// The INTEAR DEX `AssetId` string form.
// `near`, `nep141:<contract_id>`, `nep245:<contract_id>:<token_id>`
// or `nep171:<contract_id>:<token_id>`.
export type INTEAR_DEX_ASSET_ID_STRING =
  | "near"
  | `nep141:${string}`
  | `nep245:${string}:${string}`
  | `nep171:${string}:${string}`;

// ---------- storage balances ----------

export interface INTEAR_DEX_STORAGE_BALANCE_TYPE {
  total: string;
  available: string;
  extra: Record<string, unknown>;
}

export const INTEAR_DEX_STORAGE_BALANCE_TYPE_Z_CONST = z
  .object({
    total: z.string(),
    available: z.string(),
  })
  .loose()
  .transform((value) => ({
    ...value,
    extra: Object.fromEntries(
      Object.entries(value).filter(
        ([key]) => !["total", "available"].includes(key),
      ),
    ),
  })) satisfies z.ZodType<INTEAR_DEX_STORAGE_BALANCE_TYPE>;

export interface INTEAR_DEX_STORAGE_BALANCE_BOUNDS_TYPE {
  min: string;
  max: string | null;
  extra: Record<string, unknown>;
}

export const INTEAR_DEX_STORAGE_BALANCE_BOUNDS_TYPE_Z_CONST = z
  .object({
    min: z.string(),
    max: z.string().nullable(),
  })
  .loose()
  .transform((value) => ({
    ...value,
    extra: Object.fromEntries(
      Object.entries(value).filter(([key]) => !["min", "max"].includes(key)),
    ),
  })) satisfies z.ZodType<INTEAR_DEX_STORAGE_BALANCE_BOUNDS_TYPE>;

export interface INTEAR_DEX_TOTAL_STORAGE_BALANCES_TYPE {
  users: INTEAR_DEX_STORAGE_BALANCE_TYPE;
  dexes: INTEAR_DEX_STORAGE_BALANCE_TYPE;
  extra: Record<string, unknown>;
}

export const INTEAR_DEX_TOTAL_STORAGE_BALANCES_TYPE_Z_CONST = z
  .object({
    users: INTEAR_DEX_STORAGE_BALANCE_TYPE_Z_CONST,
    dexes: INTEAR_DEX_STORAGE_BALANCE_TYPE_Z_CONST,
  })
  .loose()
  .transform((value) => ({
    ...value,
    extra: Object.fromEntries(
      Object.entries(value).filter(
        ([key]) => !["users", "dexes"].includes(key),
      ),
    ),
  })) satisfies z.ZodType<INTEAR_DEX_TOTAL_STORAGE_BALANCES_TYPE>;

// ---------- balances ----------

// One registered asset of an account or dex, with its inner balance.
// The engine returns these as `[asset_id, balance]` tuples, so the
// type mirrors that.
export type INTEAR_DEX_REGISTERED_ASSET_TYPE = [
  INTEAR_DEX_ASSET_ID_STRING,
  string,
];

// A registered asset as an object, for callers who prefer named
// fields. Built by the helpers from the tuple the contract returns.
export interface INTEAR_DEX_REGISTERED_ASSET_OBJECT_TYPE {
  asset_id: INTEAR_DEX_ASSET_ID_STRING;
  balance: string;
}

// A zod schema for the INTEAR DEX `AssetId` string form.
// `near`, `nep141:<contract_id>`, `nep245:<contract_id>:<token_id>` or
// `nep171:<contract_id>:<token_id>`.
export const INTEAR_DEX_ASSET_ID_STRING_Z_CONST = z
  .string()
  .refine(
    (value) =>
      value === "near" ||
      value.startsWith("nep141:") ||
      value.startsWith("nep245:") ||
      value.startsWith("nep171:"),
    { message: "not a valid INTEAR DEX asset id" },
  ) as unknown as z.ZodType<INTEAR_DEX_ASSET_ID_STRING>;

export const INTEAR_DEX_REGISTERED_ASSET_TYPE_Z_CONST = z.tuple([
  INTEAR_DEX_ASSET_ID_STRING_Z_CONST,
  z.string(),
]);

export const INTEAR_DEX_REGISTERED_ASSETS_TYPE_Z_CONST = z.array(
  INTEAR_DEX_REGISTERED_ASSET_TYPE_Z_CONST,
);

// ---------- contract metadata ----------

export interface INTEAR_DEX_CONTRACT_SOURCE_METADATA_TYPE {
  version: string;
  link: string;
  standards?: { standard: string; version: string }[];
  extra: Record<string, unknown>;
}

export const INTEAR_DEX_CONTRACT_SOURCE_METADATA_TYPE_Z_CONST = z
  .object({
    version: z.string(),
    link: z.string(),
    standards: z
      .array(z.object({ standard: z.string(), version: z.string() }))
      .optional(),
  })
  .loose()
  .transform((value) => ({
    ...value,
    extra: Object.fromEntries(
      Object.entries(value).filter(
        ([key]) => !["version", "link", "standards"].includes(key),
      ),
    ),
  })) satisfies z.ZodType<INTEAR_DEX_CONTRACT_SOURCE_METADATA_TYPE>;

// ---------- scalars ----------

// A bare decimal string — an amount in yocto units.
const INTEAR_DEX_AMOUNT_STRING_Z_CONST = AMOUNT_STRING_Z_CONST;

export { INTEAR_DEX_AMOUNT_STRING_Z_CONST };

// The same, but the view may answer `null`.
export const INTEAR_DEX_AMOUNT_STRING_OR_NULL_Z_CONST = z.union([
  z.string(),
  z.null(),
]);

// The engine's `is_paused` view answers with a boolean.
const INTEAR_DEX_BOOLEAN_Z_CONST = BOOLEAN_Z_CONST;

export { INTEAR_DEX_BOOLEAN_Z_CONST };

// =================================================
// copyright 2026 by sleet.near
