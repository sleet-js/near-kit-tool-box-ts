// =================================================
// sputnik_dao_has_blob_fun_json
//
// View: the DAO's `has_blob`. Answers whether the DAO holds a blob
// with the given hash.
//
// The hash is a 32-byte crypto hash in **base58** — the contract
// panics with `base58 decoding error` on anything else, and with
// `invalid length of the crypto hash` on the wrong number of bytes.
// =================================================
import type { Near } from "near-kit";
import { sputnik_dao_methods_const } from "../../lib/methods/methods_sputnik_dao";
import type { sputnik_dao_args } from "../../lib/args/sputnik_dao_args";
// =================================================
export async function sputnik_dao_has_blob_fun_json(
  near: Near,
  daoContractId: string,
  hash: sputnik_dao_args["hash"],
): Promise<boolean> {
  const result = await near.view(
    daoContractId,
    sputnik_dao_methods_const.has_blob,
    { hash },
  );
  return result as boolean;
}
// =================================================
// copyright 2026 by sleet.near
