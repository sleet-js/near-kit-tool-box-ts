// =================================================
// sputnik_dao_version_fun_json
//
// View: the DAO's `version`. Returns the DAO contract's version, e.g.
// `2.3.1`.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import { SPUTNIK_DAO_ID_STRING_Z_CONST } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_version_fun_json(
  near: Near,
  dao_contract_id: string,
): Promise<string> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.version,
    {},
  );
  return SPUTNIK_DAO_ID_STRING_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
