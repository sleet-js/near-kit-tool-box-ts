// =================================================
// intear_dex_account_or_dex_id
//
// Builds the INTEAR DEX `AccountOrDexId` the engine's JSON API
// expects.
//
// The engine's `AccountOrDexId` is an externally tagged enum:
//   - `{"Account": "alice.near"}`
//   - `{"Dex": "slimedragon.near/xyk"}`
//
// The dex variant carries the dex id in its string form — the
// `<deployer>/<id>` shape — because `DexId` serializes as a string.
// =================================================
import type { INTEAR_DEX_ACCOUNT_OR_DEX_ID } from "../../types/intear_dex_engine_types";

// =================================================
/**
 * Builds an `AccountOrDexId` from a plain string.
 *
 * A string holding a `/` is read as a dex id, anything else as an
 * account id — the same rule the INTEAR DEX management CLI uses.
 */
export function intear_dex_account_or_dex_id(
  value: string,
): INTEAR_DEX_ACCOUNT_OR_DEX_ID {
  if (value.includes("/")) return { Dex: value };
  return { Account: value };
}
// =================================================
// copyright 2026 by sleet.near
