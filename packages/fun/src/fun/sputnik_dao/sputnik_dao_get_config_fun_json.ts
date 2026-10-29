// =================================================
// sputnik_dao_get_config_fun_json
//
// View: the DAO's `get_config`. Returns the DAO's name, purpose and
// metadata.
//
// The metadata is base64-encoded JSON — it decodes to fields like
// `{ primaryColor, flagLogo }`, the DAO's own site branding.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import {
  SPUTNIK_DAO_CONFIG_TYPE_Z_CONST,
  type SPUTNIK_DAO_CONFIG_TYPE,
} from "../../types/sputnik_dao_types";
// =================================================
export async function sputnik_dao_get_config_fun_json(
  near: Near,
  dao_contract_id: string,
): Promise<SPUTNIK_DAO_CONFIG_TYPE> {
  const result = await near.view(
    dao_contract_id,
    sputnik_dao_methods_const.get_config,
    {},
  );
  return SPUTNIK_DAO_CONFIG_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
