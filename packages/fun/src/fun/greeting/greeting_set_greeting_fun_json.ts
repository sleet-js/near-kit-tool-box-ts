// =================================================
// greeting_set_greeting_fun_json
//
// Call: `set_greeting`. Sets the greeting on the greeting contract to
// `greeting`. Attaches `"3 Tgas"` to cover storage growth.
import type { FinalExecutionOutcome, Near } from "near-kit";
import { greeting_methods_const } from "../../lib/methods/methods_greeting";
import type { greeting_args } from "../../lib/args/greeting_args";
// =================================================
export async function greeting_set_greeting_fun_json(
  near: Near,
  greeting_contract_id: string,
  greeting: greeting_args["greeting"],
): Promise<FinalExecutionOutcome> {
  const result = await near.call(
    greeting_contract_id,
    greeting_methods_const.set_greeting,
    { greeting },
    { gas: "3 Tgas" },
  );
  return result;
}
// =================================================
// copyright 2026 by sleet.near
