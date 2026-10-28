// =================================================
// bin/_shared/env.ts
//
// Shared helpers for resolving the NEAR client, the signer, and the
// per-network contract ids used by the bins.
//
// View bins never need a private key — they only need a readable RPC
// endpoint, which `near_kit_env` provides from `NEAR_KIT_NETWORK`.
// Call bins need `NEAR_KIT_ACCOUNT_ID` + `NEAR_KIT_PRIVATE_KEY`.
// =================================================
import {
  NEAR_KIT_ACCOUNT_ID,
  NEAR_KIT_NETWORK,
  NEAR_KIT_PRIVATE_KEY,
  near_kit_env,
} from "../../packages/env/src/index.js";
import {
  greeting_contractid,
  intear_dex_engine_contractid,
  intear_dex_xyk_dex_id,
  near_tld_contractid,
  pumpopoly_world_contractid,
  rhea_ammv2_contractid,
  rhea_dclv2_contractid,
  sputnik_dao_factory_contractid,
  wrap_near_contractid,
} from "../../packages/fun/src/index.js";
import { failMissingSigner } from "./args.js";
// =================================================
export {
  NEAR_KIT_ACCOUNT_ID,
  NEAR_KIT_NETWORK,
  near_kit_env,
  greeting_contractid,
  intear_dex_engine_contractid,
  intear_dex_xyk_dex_id,
  near_tld_contractid,
  pumpopoly_world_contractid,
  rhea_ammv2_contractid,
  rhea_dclv2_contractid,
  sputnik_dao_factory_contractid,
  wrap_near_contractid,
};

// =================================================
// True when the environment carries a usable signer.
export function hasSigner(): boolean {
  return NEAR_KIT_ACCOUNT_ID.length > 0 && !!NEAR_KIT_PRIVATE_KEY;
}

// =================================================
// Exits with a clear message when no signer is configured.
export function requireSigner(usage: string): void {
  if (!hasSigner()) failMissingSigner(usage);
}

// =================================================
// Resolves a contract id for the active network.
// `explicit` (from a CLI flag) wins; otherwise the per-network default
// for that contract is used.
export function resolveContractId(
  explicit: string | undefined,
  fallback: string,
): string {
  if (explicit && explicit.length > 0) return explicit;
  return fallback;
}

// =================================================
// Pretty-prints any JSON-serializable value before logging it.
//
// BigInt is not JSON-serializable, so it is stringified on the way
// out — a 128-bit amount reads better as a string than as a number
// anyway.
export function logResult(label: string, value: unknown): void {
  console.log(`--- ${label} ---`);
  console.log(
    JSON.stringify(
      value,
      (_key, item) => (typeof item === "bigint" ? item.toString() : item),
      2,
    ),
  );
}
// =================================================
// copyright 2026 by sleet.near
