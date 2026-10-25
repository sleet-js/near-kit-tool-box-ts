// =================================================
// View: `get_metadata`. Returns DCL v2 contract metadata.
// =================================================
import type { Near } from "near-kit";
import { rhea_dclv2_methods_const } from "../../lib/methods/methods_rhea_dclv2";
import {
  RHEA_DCLV2_METADATA_TYPE_Z_CONST,
  type RHEA_DCLV2_METADATA_TYPE,
} from "../../types/rhea_dclv2_types";
// =================================================
export async function rhea_dclv2_get_metadata_fun_json(
  near: Near,
  rhea_dclv2_contractId: string,
): Promise<RHEA_DCLV2_METADATA_TYPE> {
  const result = await near.view(
    rhea_dclv2_contractId,
    rhea_dclv2_methods_const.get_metadata,
    {},
  );
  return RHEA_DCLV2_METADATA_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
