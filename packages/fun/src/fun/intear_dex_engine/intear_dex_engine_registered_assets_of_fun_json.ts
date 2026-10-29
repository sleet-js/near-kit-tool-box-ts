// =================================================
// intear_dex_engine_registered_assets_of_fun_json
//
// View: the engine's `registered_assets_of`. Returns the registered
// assets and their inner balances of one account or one dex.
//
// `account_id` and `dex_id` are mutually exclusive — pass exactly one
// of them. `dex_id` is the `<deployer>/<id>` string form.
//
// The contract answers with `[asset_id, balance]` tuples; this helper
// turns them into `{ asset_id, balance }` objects.
//
// The list is paginated: pass `from_index` and `limit`.
// =================================================
import type { Near } from "near-kit";
import { intear_dex_engine_methods_const } from "../../lib/methods/methods_intear_dex_engine";
import {
  INTEAR_DEX_REGISTERED_ASSETS_TYPE_Z_CONST,
  type INTEAR_DEX_REGISTERED_ASSET_OBJECT_TYPE,
} from "../../types/intear_dex_engine_types";
// =================================================
export async function intear_dex_engine_registered_assets_of_fun_json(
  near: Near,
  engine_contract_id: string,
  account_id: string | null,
  dex_id: string | null,
  from_index: number,
  limit: number,
): Promise<INTEAR_DEX_REGISTERED_ASSET_OBJECT_TYPE[]> {
  const result = await near.view(
    engine_contract_id,
    intear_dex_engine_methods_const.registered_assets_of,
    { account_id, dex_id, from_index, limit },
  );
  const tuples = INTEAR_DEX_REGISTERED_ASSETS_TYPE_Z_CONST.parse(result);
  return tuples.map(([asset_id, balance]) => ({ asset_id, balance }));
}
// =================================================
// copyright 2026 by sleet.near
