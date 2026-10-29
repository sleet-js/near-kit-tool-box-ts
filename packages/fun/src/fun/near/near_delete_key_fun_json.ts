// =================================================
// near_delete_key_fun_json
//
// Local NEAR account action: delete access key `public_key` from
// `signer_id`. The transaction is signed and submitted through the
// supplied `near` client.
import type { Near } from "near-kit";
import type { FinalExecutionOutcome } from "near-kit";
// =================================================
export async function near_delete_key_fun_json(
  near: Near,
  signer_id: string,
  public_key: string,
): Promise<FinalExecutionOutcome> {
  const result = await near
    .transaction(signer_id)
    .deleteKey(signer_id, public_key)
    .send();
  return result;
}
// =================================================
// copyright 2026 by sleet.near
