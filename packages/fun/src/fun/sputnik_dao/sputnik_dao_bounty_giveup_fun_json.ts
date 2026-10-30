// =================================================
// sputnik_dao_bounty_giveup_fun_json
//
// Call: the DAO's `bounty_giveup`. Gives up the caller's claim.
//
// No deposit is attached. Within the DAO's forgiveness period the
// bounty bond is returned; after it, the bond is forfeited.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
// =================================================
export async function sputnik_dao_bounty_giveup_fun_json(
  near: Near,
  dao_contract_id: string,
  id: sputnik_dao_args["id"],
): Promise<FinalExecutionOutcome> {
  return await near.call(
    dao_contract_id,
    sputnik_dao_methods_const.bounty_giveup,
    { id },
    { attachedDeposit: 0n, gas: "30 Tgas" },
  );
}
// =================================================
// copyright 2026 by sleet.near
