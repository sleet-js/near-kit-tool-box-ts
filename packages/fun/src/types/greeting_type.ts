import * as z from "zod";
// =================================================
// GREETING_TYPE
//
// PROVENANCE
//   contract : `hello.near-examples.near` (mainnet) — the NEAR
//              greeting example contract
//   methods  : `get_greeting`
//   verified : 2026-10-28, against the live mainnet response
//
// The greeting the contract stores. The live answer is the bare
// string `"hi"` — the view returns a plain JSON string, not an
// object.
// =================================================
export type GREETING_TYPE = string;

// The live answer is the bare string `"hi"` — there is no object and
// no field to name, so the schema is the plain string.
export const GREETING_TYPE_Z_CONST = z.string();
// =================================================
// copyright 2026 by sleet.near
