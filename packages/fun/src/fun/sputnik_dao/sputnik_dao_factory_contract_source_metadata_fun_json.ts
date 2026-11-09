// =================================================
// sputnik_dao_factory_contract_source_metadata_fun_json
//
// View: the factory's `contract_source_metadata`.
//
// The method is not the factory's own — near-sdk 5.24 provides it on
// every contract that carries the `nep330` standard. The answer is
// the factory's build metadata: its version, the link to its source
// and how it was built.
//
// The factory answers with its own crate version, `0.2.1` on mainnet.
// That is the FACTORY's version and says nothing about which build of
// the DAO contract it deploys — `get_default_version` answers that,
// with a `[major, minor]` pair.
//
// The mainnet factory answers this method. The testnet factory does
// not have it.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_factory_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { SPUTNIK_DAO_SOURCE_METADATA_TYPE } from "../../types/sputnik_dao_types";
import { SPUTNIK_DAO_SOURCE_METADATA_TYPE_Z_CONST } from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_factory_contract_source_metadata_fun_json(
  near: Near,
  factory_contract_id: string,
): Promise<SPUTNIK_DAO_SOURCE_METADATA_TYPE> {
  const result = await near.view(
    factory_contract_id,
    sputnik_dao_factory_methods_const.contract_source_metadata,
    {},
  );
  return SPUTNIK_DAO_SOURCE_METADATA_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
