import * as z from "zod";
// =================================================
// Shared scalar schemas.
//
// Most contract views answer with a bare scalar rather than an
// object: an amount, an account id, a count, a flag. These four
// schemas cover all of them, so the per-contract type files do not
// each carry their own copy.
//
// A scalar schema earns its place because it knows the FORMAT, not
// just the JavaScript type. `z.string()` alone would accept any
// string; `AMOUNT_STRING` only accepts a decimal amount, so a
// contract that answered with an id where an amount was expected is
// caught instead of flowing through as a string.
//
// PROVENANCE
//   contract : none — these are shapes, not contract answers
//   methods  : none
//   verified : 2026-10-28, against the live mainnet responses that
//              use them (see DOCS/live_responses.md)
// =================================================

// ---------- amounts ----------

// A `u128` amount in the token's smallest unit, as a decimal string.
//
// Every 128-bit amount on NEAR crosses the JSON boundary as a string,
// because JSON numbers cannot hold them. The live answers look like
// `"35109618577187596008899577099685"` — digits only, no sign, no
// decimal point.
export const AMOUNT_STRING_Z_CONST = z.string().regex(/^\d+$/);

// ---------- account ids ----------

// An account id, e.g. `"sleet.near"`.
//
// The contract accepts any account id it can resolve, so the schema
// only rejects the empty string.
//
// NOTE: some views answer with `""` to mean "there is none" — the
// Sputnik DAO's `get_staking_contract` does. Use
// `OPTIONAL_ACCOUNT_ID_STRING` for those.
export const ACCOUNT_ID_STRING_Z_CONST = z.string().min(1);

// An account id that may be empty — `""` means "there is none".
export const OPTIONAL_ACCOUNT_ID_STRING_Z_CONST = z.string();

// ---------- counts ----------

// A `u64` count, as a plain JSON number.
//
// The live answers are small (`3` proposals, `8991` pools), so they
// fit a JSON number exactly.
export const COUNT_NUMBER_Z_CONST = z.number().int().nonnegative();

// ---------- flags ----------

// A boolean flag, e.g. `is_paused` or `has_blob`.
export const BOOLEAN_Z_CONST = z.boolean();
// =================================================
// copyright 2026 by sleet.near
