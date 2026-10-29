// =================================================
// AMOUNT_INPUT
//
// PROVENANCE
//   contract : none — this is an INPUT type, not a contract answer
//   methods  : none
//   verified : 2026-10-28, by construction (it never leaves the box)
//
// The amount a caller writes: `"1.5 NEAR"`, `"1000 yocto"`, or a
// `bigint` of yoctoNEAR. It is a template-literal union, not an
// object, so it gets no Zod schema — a schema would add nothing over
// the type itself.
// =================================================
export type AMOUNT_INPUT = `${number} NEAR` | `${bigint} yocto` | bigint;
// =================================================
// copyright 2026 by sleet.near
