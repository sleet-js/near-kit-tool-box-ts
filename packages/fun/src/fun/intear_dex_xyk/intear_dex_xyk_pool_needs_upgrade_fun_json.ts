// =================================================
// intear_dex_xyk_pool_needs_upgrade_fun_json
//
// View: the xyk dex's `pool_needs_upgrade`. Returns whether the pool
// at `pool_id` still runs an old pool layout and has to be migrated
// to the current one.
//
// The view panics when there is no pool with that id.
//
// The contract answers with a `bool`, which borsh writes as one byte.
// =================================================
import type { Near } from "near-kit";
import { b } from "@zorsh/zorsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
import type { intear_dex_xyk_args } from "../../lib/args/intear_dex_xyk_args";
// =================================================
export async function intear_dex_xyk_pool_needs_upgrade_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
  pool_id: intear_dex_xyk_args["pool_id"],
): Promise<boolean> {
  const args = b.u32().serialize(pool_id);
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_xyk_methods_const.pool_needs_upgrade,
    args,
    b.bool(),
  );
}
// =================================================
// copyright 2026 by sleet.near
