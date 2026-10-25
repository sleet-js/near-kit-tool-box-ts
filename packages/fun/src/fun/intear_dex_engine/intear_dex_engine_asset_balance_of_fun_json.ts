// =================================================
// intear_dex_engine_asset_balance_of_fun_json
//
// View: the engine's `asset_balance_of`. Returns the engine's inner
// balance of one asset for one account or one dex, or `null` when
// there is no such balance.
//
// The engine keeps its own inner balances so a swap does not need an
// `ft_transfer_call` round trip. `of` is either
// `{"Account": "alice.near"}` or `{"Dex": {"deployer": "...", "id": "..."}}`.
//
// For the account form the balance is the engine's inner balance of
// that account. For the dex form it is what the sub-dex holds
// internally.
// =================================================
import type { Near } from "near-kit";
import { intear_dex_engine_methods_const } from "../../lib/methods/methods_intear_dex_engine";
import type { intear_dex_engine_args } from "../../lib/args/intear_dex_engine_args";
import type {
  INTEAR_DEX_ACCOUNT_OR_DEX_ID,
  INTEAR_DEX_ASSET_ID_STRING,
} from "../../types/intear_dex_engine_types";
// =================================================
export async function intear_dex_engine_asset_balance_of_fun_json(
  near: Near,
  engineContractId: string,
  of: INTEAR_DEX_ACCOUNT_OR_DEX_ID,
  asset_id: INTEAR_DEX_ASSET_ID_STRING,
): Promise<string | null> {
  const result = await near.view(
    engineContractId,
    intear_dex_engine_methods_const.asset_balance_of,
    { of, asset_id },
  );
  return result as string | null;
}
// =================================================
// copyright 2026 by sleet.near
