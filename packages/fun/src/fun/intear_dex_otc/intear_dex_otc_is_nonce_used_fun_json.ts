// =================================================
// intear_dex_otc_is_nonce_used_fun_json
//
// View: the otc dex's `is_nonce_used`. Returns whether an account
// has already used a trade-intent nonce.
//
// A nonce makes a signed trade intent single-use. Before submitting a
// `match` with a signed intent, check that its nonce has not been
// used yet.
//
// The contract answers with a `bool`, which borsh writes as one byte.
// =================================================
import type { Near } from "near-kit";
import { b } from "@zorsh/zorsh";
import { intear_dex_view } from "../../lib/borsh/intear_dex_view";
import { intear_dex_otc_methods_const } from "../../lib/methods/methods_intear_dex_otc";
import type { intear_dex_otc_args } from "../../lib/args/intear_dex_otc_args";
// =================================================
export async function intear_dex_otc_is_nonce_used_fun_json(
  near: Near,
  engine_contract_id: string,
  dex_id: string,
  account_id: intear_dex_otc_args["account_id"],
  nonce: intear_dex_otc_args["nonce"],
): Promise<boolean> {
  const args = b
    .struct({
      nonce: b.u128(),
      account_id: b.string(),
    })
    .serialize({
      nonce: BigInt(nonce),
      account_id: account_id,
    });
  return intear_dex_view(
    near,
    engine_contract_id,
    dex_id,
    intear_dex_otc_methods_const.is_nonce_used,
    args,
    b.bool(),
  );
}
// =================================================
// copyright 2026 by sleet.near
