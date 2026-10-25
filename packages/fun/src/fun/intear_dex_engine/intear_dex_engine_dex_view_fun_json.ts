// =================================================
// intear_dex_engine_dex_view_fun_json
//
// View: the engine's `dex_view`. Calls a view method of a sub-dex
// and returns its raw **borsh** response bytes.
//
// Use the typed sub-dex helpers (`intear_dex_xyk_*`,
// `intear_dex_otc_*`, `intear_dex_simple_amm_*`) instead whenever
// one covers the method — they decode the response for you.
//
// The method name `swap` is reserved by the engine and is rejected
// here; swaps go through `swap_simple` or `dex_call`.
//
// The `args` are the sub-dex's borsh-encoded arguments. Pass an empty
// `Uint8Array` for methods that take none.
// =================================================
import type { Near } from "near-kit";
import { intearDexViewRaw } from "../../lib/borsh/intear_dex_view";
// =================================================
export async function intear_dex_engine_dex_view_fun_json(
  near: Near,
  engineContractId: string,
  dex_id: string,
  method: string,
  args: Uint8Array,
): Promise<Uint8Array> {
  return intearDexViewRaw(near, engineContractId, dex_id, method, args);
}
// =================================================
// copyright 2026 by sleet.near
