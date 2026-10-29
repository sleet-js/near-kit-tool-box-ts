// =================================================
// intear_dex_xyk_get_community_owned_fees_fun_json
//
// View: the xyk dex's `get_community_owned_fees`. Returns the NEAR
// (yocto) a community account has collected from launch pools, in
// total.
//
// Community fee receivers are only supported in launch pools, and the
// amount is NEAR even when the pool trades another quote asset.
// =================================================
import type { Near } from "near-kit";
import { borsh_reader, borsh_writer } from "../../lib/borsh/intear_dex_borsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { intear_dex_xyk_methods_const } from "../../lib/methods/methods_intear_dex_xyk";
import type { intear_dex_xyk_args } from "../../lib/args/intear_dex_xyk_args";
// =================================================
export async function intear_dex_xyk_get_community_owned_fees_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
  account_id: intear_dex_xyk_args["community_account_id"],
): Promise<string> {
  const args = new borsh_writer().string(account_id).to_bytes();
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_xyk_methods_const.get_community_owned_fees,
    args,
    (reader: borsh_reader) => reader.u128().toString(),
  );
}
// =================================================
// copyright 2026 by sleet.near
