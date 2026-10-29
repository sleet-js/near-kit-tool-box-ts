import * as z from "zod";
// =================================================
// STORAGE_BALANCE_OF_RESPONSE_TYPE
//
// NEP-145 storage balance returned by the rhea_ammv2
// `storage_balance_of` view call (and any other storage-standard
// contract).
//
// All amounts are yoctoNEAR decimal strings.
// =================================================

export interface STORAGE_BALANCE_OF_RESPONSE_TYPE {
  total: string;
  available: string;
}

export const STORAGE_BALANCE_OF_RESPONSE_TYPE_Z_CONST = z.object({
  total: z.string(),
  available: z.string(),
}) satisfies z.ZodType<STORAGE_BALANCE_OF_RESPONSE_TYPE>;
// =================================================
// copyright 2026 by sleet.near
