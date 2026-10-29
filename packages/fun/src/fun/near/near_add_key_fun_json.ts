// =================================================
// near_add_key_fun_json
//
// Local NEAR account action: append an access key to `signer_id`.
// `permission` is the NEAR-kit `AccessKeyPermission` enum (full-access
// or function-call). The transaction is signed and submitted through
// the supplied `near` client.
import type { Near } from "near-kit";
import type { FinalExecutionOutcome } from "near-kit";
// =================================================
export async function near_add_key_fun_json(
  near: Near,
  signer_id: string,
  public_key: string,
  permission: Parameters<ReturnType<typeof near.transaction>["addKey"]>[1],
): Promise<FinalExecutionOutcome> {
  const result = await near
    .transaction(signer_id)
    .addKey(public_key, permission)
    .send();
  return result as FinalExecutionOutcome;
}
// =================================================
// copyright 2026 by sleet.near
