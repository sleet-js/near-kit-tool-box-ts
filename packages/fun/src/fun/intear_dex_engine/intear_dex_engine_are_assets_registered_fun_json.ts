// =================================================
// intear_dex_engine_are_assets_registered_fun_json
//
// View: the engine's `are_assets_registered`. Returns whether every
// one of `asset_ids` is registered for an account or a dex.
//
// `for` is either `{"Account": "alice.near"}` or
// `{"Dex": {"deployer": "...", "id": "..."}}`.
//
// An account with no storage at all registers no assets, so the
// answer is `true` only for an empty `asset_ids` in that case.
// =================================================
import type { Near } from "near-kit";
import { intear_dex_engine_methods_const } from "../../lib/methods/methods_intear_dex_engine";
import type {
  INTEAR_DEX_ACCOUNT_OR_DEX_ID,
  INTEAR_DEX_ASSET_ID_STRING,
} from "../../types/intear_dex_engine_types";
// =================================================
export async function intear_dex_engine_are_assets_registered_fun_json(
  near: Near,
  engine_contract_id: string,
  asset_ids: INTEAR_DEX_ASSET_ID_STRING[],
  for_: INTEAR_DEX_ACCOUNT_OR_DEX_ID,
): Promise<boolean> {
  const result = await near.view(
    engine_contract_id,
    intear_dex_engine_methods_const.are_assets_registered,
    { asset_ids, for: for_ },
  );
  return result as boolean;
}
// =================================================
// copyright 2026 by sleet.near
