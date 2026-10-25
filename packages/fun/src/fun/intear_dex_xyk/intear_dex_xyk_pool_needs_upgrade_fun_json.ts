// =================================================
// intear_dex_xyk_pool_needs_upgrade_fun_json
//
// View: the xyk dex's `pool_needs_upgrade`. Returns whether the pool
// at `pool_id` still runs an old pool layout and has to be migrated
// to the current one.
//
// The view panics when there is no pool with that id.
// =================================================
import type { Near } from "near-kit";
import { BorshReader, BorshWriter } from "../../lib/borsh/intear_dex_borsh";
import { intearDexView } from "../../lib/borsh/intear_dex_view";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
import type { intear_dex_xyk_args } from "../../lib/args/intear_dex_xyk_args";
// =================================================
export async function intear_dex_xyk_pool_needs_upgrade_fun_json(
  near: Near,
  engineContractId: string,
  dexId: string,
  pool_id: intear_dex_xyk_args["pool_id"],
): Promise<boolean> {
  const args = new BorshWriter().u32(pool_id).toBytes();
  return intearDexView(
    near,
    engineContractId,
    dexId,
    intear_dex_xyk_methods_const.pool_needs_upgrade,
    args,
    (reader: BorshReader) => reader.u8() === 1,
  );
}
// =================================================
// copyright 2026 by sleet.near
