// =================================================
// intear_dex_engine_contract_source_metadata_fun_json
//
// View: the engine's `contract_source_metadata`. Returns the
// contract's version, the source repository link it was built from,
// and the standards it implements.
//
// This is the nep330 metadata. The `link` pins the exact commit the
// deployed WASM was built from, so it is the authoritative answer to
// "which version of the INTEAR DEX is this".
// =================================================
import type { Near } from "near-kit";
import { intear_dex_engine_methods_const } from "../../lib/methods/methods_intear_dex_engine";
import {
  INTEAR_DEX_CONTRACT_SOURCE_METADATA_TYPE_Z_CONST,
  type INTEAR_DEX_CONTRACT_SOURCE_METADATA_TYPE,
} from "../../types/intear_dex_engine_types";
// =================================================
export async function intear_dex_engine_contract_source_metadata_fun_json(
  near: Near,
  engineContractId: string,
): Promise<INTEAR_DEX_CONTRACT_SOURCE_METADATA_TYPE> {
  const result = await near.view(
    engineContractId,
    intear_dex_engine_methods_const.contract_source_metadata,
    {},
  );
  return INTEAR_DEX_CONTRACT_SOURCE_METADATA_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
