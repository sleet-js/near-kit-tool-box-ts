// =================================================
// sputnik_dao_get_available_amount_fun_json
//
// View: the DAO's `get_available_amount`. Returns the NEAR the DAO
// can spend, in yoctoNEAR, as a string.
//
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_get_available_amount_fun_json(
  near: Near,
  daoContractId: string,
): Promise<string> {
  const result = await near.view(
    daoContractId,
    sputnik_dao_methods_const.get_available_amount,
    {},
  );
  return result as string;
}
// =================================================
// copyright 2026 by sleet.near
