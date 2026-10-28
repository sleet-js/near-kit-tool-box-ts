// =================================================
// sputnik_dao_get_bounty_fun_json
//
// View: the DAO's `get_bounty`. Returns one bounty by its id.
//
// The arg is `id` — the contract panics with
// `missing field 'id'` when it is called with `bounty_id`.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
import type { SPUTNIK_DAO_BOUNTY_TYPE } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_get_bounty_fun_json(
  near: Near,
  daoContractId: string,
  id: sputnik_dao_args["id"],
): Promise<SPUTNIK_DAO_BOUNTY_TYPE | null> {
  try {
    const result = await near.view(
      daoContractId,
      sputnik_dao_methods_const.get_bounty,
      { id },
    );
    return (result as SPUTNIK_DAO_BOUNTY_TYPE | undefined) ?? null;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("ERR_NO_BOUNTY")) return null;
    throw error;
  }
}
// =================================================
// copyright 2026 by sleet.near
