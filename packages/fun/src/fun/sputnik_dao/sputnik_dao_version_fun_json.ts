// =================================================
// sputnik_dao_version_fun_json
//
// View: the DAO's `version`. Returns the DAO contract's version, e.g.
// `2.3.1`.
//
// --- WHY --- the version tells which of the contract's shapes to
// expect. the DAO contract is published in five versions by the
// factory — `[2,0]`, `[2,1]`, `[3,0]`, `[3,1]` and `[3,2]` — and a
// DAO can be pinned to an older one.
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
