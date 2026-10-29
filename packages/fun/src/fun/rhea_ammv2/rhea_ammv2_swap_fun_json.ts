// =================================================
// rhea_ammv2_swap_fun_json
//
// Call: `swap`. Submits a sequence of swap actions (`pool_id`,
// `token_in`, `token_out`, optional `amount_in` / `min_amount_out`)
// plus an optional `referral_id`, then returns the resulting
// `FinalExecutionOutcome`. The contract enforces a minimum received
// amount per action via `min_amount_out`.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import type {
  rhea_ammv2_args,
  rhea_ammv2_swap_action_type,
} from "../../lib/args/rhea_ammv2_args";
// =================================================
export async function rhea_ammv2_swap_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
  actions: rhea_ammv2_swap_action_type[],
  referral_id: rhea_ammv2_args["referral_id"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.swap,
    { actions, referral_id },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
