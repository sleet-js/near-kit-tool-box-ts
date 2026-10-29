// =================================================
// generic_contract_view
//
// Shared plumbing for reading a contract view method.
//
// A view call takes JSON arguments and answers with a JSON value.
// This is the generic, contract-agnostic reader every `fun/` helper
// in this package builds on.
//
// Two helpers live here:
//   - `generic_contract_view_fun`      — the raw reader
//   - `generic_contract_view_fun_json` — the same, with the result
//     typed as JSON
//
// Use a typed `fun/<contract>/<contract>_<method>_fun_json.ts` helper
// instead whenever one covers the method — they validate the shape
// and name the fields. This generic pair is for the methods that have
// no dedicated helper yet, and for contracts that are not in the
// toolbox at all.
// =================================================
import type { Near } from "near-kit";

// =================================================
// Calls one contract view method and returns its result.
// params:
//   near: the NEAR client
//   contract_id: the contract account id
//   method_name: the view method to call
//   args: the JSON arguments; defaults to `{}`
// returns the parsed JSON result
// - The returned type is a type assertion for convenience. No runtime
//   validation is performed against it.
// - A contract that answers with an empty response makes this throw,
//   because an empty response is a broken read, not a value.
export async function generic_contract_view_fun<T>(
  near: Near,
  contract_id: string,
  method_name: string,
  args: Record<string, unknown> = {},
): Promise<T> {
  const result = await near.view<T>(contract_id, method_name, args);
  if (result === undefined) {
    throw new Error(`${contract_id}.${method_name} returned no value`);
  }
  return result;
}

// =================================================
// Calls one contract view method and returns its JSON result.
// The JSON twin of generic_contract_view_fun, for callers
// that think of the result as JSON rather than as a decoded value.
// params:
//   near: the NEAR client
//   contract_id: the contract account id
//   method_name: the view method to call
//   args: the JSON arguments; defaults to `{}`
// returns the parsed JSON result
export async function generic_contract_view_fun_json<T>(
  near: Near,
  contract_id: string,
  method_name: string,
  args: Record<string, unknown> = {},
): Promise<T> {
  return generic_contract_view_fun<T>(near, contract_id, method_name, args);
}
// =================================================
// copyright 2026 by sleet.near
