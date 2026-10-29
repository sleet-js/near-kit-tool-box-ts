// =================================================
// greeting_get_greeting_fun_json
//
// View: `get_greeting`. Returns the greeting stored on the greeting
// contract as a string.
import type { Near } from "near-kit";
import { greeting_methods_const } from "../../lib/methods/methods_greeting";
import { GREETING_TYPE_Z_CONST } from "../../types/greeting_type";
// =================================================
export async function greeting_get_greeting_fun_json(
  near: Near,
  greeting_contract_id: string,
): Promise<string> {
  const result = await near.view(
    greeting_contract_id,
    greeting_methods_const.get_greeting,
  );
  return GREETING_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
