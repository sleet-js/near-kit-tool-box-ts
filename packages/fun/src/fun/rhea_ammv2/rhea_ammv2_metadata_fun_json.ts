// =================================================
// View: `metadata`. Returns Rhea AMM v2 contract metadata.
// =================================================
import type { Near } from "near-kit";
import { rhea_ammv2_methods_const } from "../../lib/methods/methods_rhea_ammv2";
import {
  RHEA_AMMV2_METADATA_TYPE_Z_CONST,
  type RHEA_AMMV2_METADATA_TYPE,
} from "../../types/rhea_ammv2_view_types";
// =================================================
export async function rhea_ammv2_metadata_fun_json(
  near: Near,
  rhea_ammv2_contract_id: string,
): Promise<RHEA_AMMV2_METADATA_TYPE> {
  const result = await near.view(
    rhea_ammv2_contract_id,
    rhea_ammv2_methods_const.metadata,
    {},
  );
  return RHEA_AMMV2_METADATA_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
