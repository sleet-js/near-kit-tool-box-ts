// =================================================
// sputnik_dao_remove_blob_fun_json
//
// Call: the DAO's `remove_blob`. Removes a blob previously stored by
// the same account and refunds its storage cost.
//
// `hash` is the base58 hash returned by `store_blob`. Only the account
// that stored the blob can remove it.
// =================================================
import type { FinalExecutionOutcome, Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
// =================================================
export async function sputnik_dao_remove_blob_fun_json(
  near: Near,
  dao_contract_id: string,
  hash: sputnik_dao_args["hash"],
): Promise<FinalExecutionOutcome> {
  return await near.call(
    dao_contract_id,
    sputnik_dao_methods_const.remove_blob,
    { hash },
    { attachedDeposit: 0n },
  );
}
// =================================================
// copyright 2026 by sleet.near
