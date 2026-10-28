// =================================================
// sputnik_dao_factory_get_contracts_metadata_fun_json
//
// View: the FACTORY's `get_contracts_metadata`. Returns the versions
// of the DAO contract the factory knows about — the code hash, the
// version, the source commit and the changelog url of each.
//
// The pairs are `[code_hash, metadata]`, in the order the factory
// lists them.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { SPUTNIK_DAO_CONTRACT_METADATA_TYPE } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_factory_get_contracts_metadata_fun_json(
  near: Near,
  factoryContractId: string,
): Promise<[string, SPUTNIK_DAO_CONTRACT_METADATA_TYPE][]> {
  const result = await near.view(
    factoryContractId,
    sputnik_dao_factory_methods_const.get_contracts_metadata,
    {},
  );
  return result as [string, SPUTNIK_DAO_CONTRACT_METADATA_TYPE][];
}
// =================================================
// copyright 2026 by sleet.near
