// =================================================
// sputnik_dao_contract_source_metadata_fun_json
//
// View: the DAO's `contract_source_metadata`.
//
// The method is not the DAO's own — near-sdk 5.24 provides it on every
// contract that carries the `nep330` standard, so the answer is the
// contract's build metadata: its version, the link to its source and
// how it was built.
//
// The DAO answers with its crate version, e.g. `2.3.1`. That is NOT
// the factory's `[major, minor]` build number — a DAO on the `[3,1]`
// build answers `2.3.1` too. To learn the build, read the DAO's code
// hash and match it against the factory's `get_contracts_metadata`.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { SPUTNIK_DAO_SOURCE_METADATA_TYPE } from "../../types/sputnik_dao_types";
import { SPUTNIK_DAO_SOURCE_METADATA_TYPE_Z_CONST } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_contract_source_metadata_fun_json(
  near: Near,
  dao_contract_id: string,
): Promise<SPUTNIK_DAO_SOURCE_METADATA_TYPE> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.contract_source_metadata,
    {},
  );
  return SPUTNIK_DAO_SOURCE_METADATA_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
