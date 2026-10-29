// =================================================
// rhea_ammv2_withdraw_fun_json
//
// Call: `withdraw`. Withdraws `amount` of `token_id` from the caller's
// deposited balance on the rhea_ammv2 contract. Both `unregister`
// (release NEP-145 storage) and `skip_unwrap_near` (leave as wNEAR
// instead of unwrapping to NEAR) are set to `false` — sensible defaults
// that mirror the existing TS fun package.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type { rhea_ammv2_args } from "../../lib/args/rhea_ammv2_args";
// =================================================
export async function rhea_ammv2_withdraw_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
  amount: rhea_ammv2_args["amount"],
  token_id: rhea_ammv2_args["token_id"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.withdraw,
    {
      amount,
      token_id,
      unregister: false,
      skip_unwrap_near: false,
    },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
