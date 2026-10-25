// =================================================
// intear_dex_view
//
// Shared plumbing for reading a sub-dex view through the INTEAR DEX
// engine.
//
// The engine's `dex_view` view takes a JSON envelope:
//   { "dex_id": "<deployer>/<id>", "method": "<name>", "args": "<base64>" }
//
// where `args` are the sub-dex's **borsh**-encoded arguments, and it
// returns a base64 string holding the sub-dex's **borsh**-encoded
// response.
//
// `dex_view` refuses the method name `swap` — that one goes through
// the engine's `swap_simple` / `dex_call` paths instead.
// =================================================
import type { Near } from "near-kit";
import { BorshReader, base64ToBytes, bytesToBase64 } from "./intear_dex_borsh";
import { intear_dex_engine_methods_const } from "../methods/methods_intear_dex_engine";

// =================================================
/**
 * Calls a sub-dex view through the engine and returns the raw borsh
 * bytes of the response.
 *
 * @param near - the NEAR client
 * @param engineContractId - the engine account id (`dex.intear.near`)
 * @param dexId - the sub-dex id, `<deployer>/<id>`
 * @param method - the sub-dex view method name
 * @param args - the borsh-encoded sub-dex arguments
 */
export async function intearDexViewRaw(
  near: Near,
  engineContractId: string,
  dexId: string,
  method: string,
  args: Uint8Array,
): Promise<Uint8Array> {
  if (method === "swap") {
    throw new Error(
      "intear dex: the method name 'swap' is reserved by the engine and cannot be called through dex_view",
    );
  }
  const result = await near.view(engineContractId, intear_dex_engine_methods_const.dex_view, {
    dex_id: dexId,
    method,
    args: bytesToBase64(args),
  });
  if (typeof result !== "string") {
    throw new Error(
      `intear dex: expected a base64 string from dex_view for ${dexId} ${method}, got ${typeof result}`,
    );
  }
  return base64ToBytes(result);
}

// =================================================
/**
 * Calls a sub-dex view through the engine and decodes the borsh
 * response with `decode`.
 */
export async function intearDexView<T>(
  near: Near,
  engineContractId: string,
  dexId: string,
  method: string,
  args: Uint8Array,
  decode: (reader: BorshReader) => T,
): Promise<T> {
  const bytes = await intearDexViewRaw(near, engineContractId, dexId, method, args);
  return decode(new BorshReader(bytes));
}
// =================================================
// copyright 2026 by sleet.near
