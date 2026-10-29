// =================================================
// contract_view
//
// Shared plumbing for reading a contract view method.
//
// A view call takes JSON arguments and answers with a JSON value.
// This is the generic, contract-agnostic reader every `fun/` helper
// in this package builds on.
//
// Two helpers live here:
//   - `near_kit_contract_view_fun`     — the raw reader
//   - `near_kit_contract_view_fun_json` — the same, with the result
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
/**
 * Calls one contract view method and returns its result.
 *
 * @param near - the NEAR client
 * @param contract_id - the contract account id
 * @param method_name - the view method to call
 * @param args - the JSON arguments; defaults to `{}`
 * @returns the parsed JSON result
 *
 * @remarks
 * - The returned type is a type assertion for convenience. No runtime
 *   validation is performed against it.
 * - A contract that answers with an empty response makes this throw,
 *   because an empty response is a broken read, not a value.
 */
export async function near_kit_contract_view_fun<T>(
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
/**
 * Calls one contract view method and returns its JSON result.
 *
 * The JSON twin of {@link near_kit_contract_view_fun}, for callers
 * that think of the result as JSON rather than as a decoded value.
 *
 * @param near - the NEAR client
 * @param contract_id - the contract account id
 * @param method_name - the view method to call
 * @param args - the JSON arguments; defaults to `{}`
 * @returns the parsed JSON result
 */
export async function near_kit_contract_view_fun_json<T>(
  near: Near,
  contract_id: string,
  method_name: string,
  args: Record<string, unknown> = {},
): Promise<T> {
  return near_kit_contract_view_fun<T>(near, contract_id, method_name, args);
}
// =================================================
// copyright 2026 by sleet.near
