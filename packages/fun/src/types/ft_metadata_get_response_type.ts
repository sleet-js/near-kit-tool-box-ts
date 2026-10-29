import * as z from "zod";
import { AMOUNT_STRING_Z_CONST } from "./scalar_type";
// =================================================
// FT_METADATA_TYPE
//
// PROVENANCE
//   contract : `wrap.near` (mainnet) — the NEP-141 / NEP-145 token
//   methods  : `ft_metadata`
//   verified : 2026-10-28, against the live mainnet response
//
// The token metadata a NEP-141 contract answers with. The live
// `wrap.near` answer is:
//   `{ spec, name, symbol, icon, reference, reference_hash, decimals }`
// with `icon`, `reference` and `reference_hash` all `null`.
// =================================================
export interface FT_METADATA_TYPE {
  spec: string;
  name: string;
  symbol: string;
  icon: string | null;
  reference: string | null;
  reference_hash: string | null;
  decimals: number;
}
// =================================================
export const FT_METADATA_TYPE_Z_CONST = z.object({
  spec: z.string(),
  name: z.string(),
  symbol: z.string(),
  icon: z.string().nullable(),
  reference: z.string().nullable(),
  reference_hash: z.string().nullable(),
  decimals: z.number(),
}) satisfies z.ZodType<FT_METADATA_TYPE>;

// The NEP-141 amount views — `ft_balance_of` and `ft_total_supply` —
// answer with a bare decimal string in the token's smallest unit.
// The shared `AMOUNT_STRING` schema carries the format check.
const FT_AMOUNT_STRING_Z_CONST = AMOUNT_STRING_Z_CONST;

export { FT_AMOUNT_STRING_Z_CONST };
// =================================================
// copyright 2026 by sleet.near
