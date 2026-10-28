// =================================================
// sputnik_dao_version_fun_json
//
// View: the DAO's `version`. Returns the DAO contract's version, e.g.
// `2.3.1`.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
// =================================================
export async function sputnik_dao_version_fun_json(
  near: Near,
  daoContractId: string,
): Promise<string> {
  const result = await near.view(
    daoContractId,
    sputnik_dao_methods_const.version,
    {},
  );
  return result as string;
}
// =================================================
// copyright 2026 by sleet.near
