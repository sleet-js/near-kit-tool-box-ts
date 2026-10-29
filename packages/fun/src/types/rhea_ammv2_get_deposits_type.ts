import * as z from "zod";
// =================================================
// RHEA_AMMV2_GET_DEPOSITS_TYPE
//
// PROVENANCE
//   contract : `v2.ref-finance.near` (mainnet) — the Rhea AMM v2
//   methods  : `get_deposits`
//   verified : 2026-10-28, against the live mainnet response
//
// Shape returned by the rhea_ammv2 `get_deposits` view call. The
// contract returns a `{ token_id: balance }` map where `token_id` is
// a NEP-141 contract id (e.g. `wrap.near`,
// `usdt.tether-token.near`, `shit-1170.meme-cooking.near`) and
// `balance` is the user's deposited balance of that NEP-141 token
// held by the rhea_ammv2 contract on the user's behalf, as a decimal
// string in the token's smallest unit.
// =================================================

export interface RHEA_AMMV2_GET_DEPOSITS_TYPE {
  [token_id: string]: string;
}

export const RHEA_AMMV2_GET_DEPOSITS_TYPE_Z_CONST = z.record(
  z.string(),
  z.string(),
) satisfies z.ZodType<RHEA_AMMV2_GET_DEPOSITS_TYPE>;
// =================================================
// copyright 2026 by sleet.near
