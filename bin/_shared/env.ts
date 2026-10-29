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
import { fail_missing_signer } from "./args.js";
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
export function has_signer(): boolean {
  return NEAR_KIT_ACCOUNT_ID.length > 0 && !!NEAR_KIT_PRIVATE_KEY;
}

// =================================================
// Exits with a clear message when no signer is configured.
export function require_signer(usage: string): void {
  if (!has_signer()) fail_missing_signer(usage);
}

// =================================================
// Resolves a contract id for the active network.
// `explicit` (from a CLI flag) wins; otherwise the per-network default
// for that contract is used.
export function resolve_contract_id(
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
//
// A Map is not JSON-serializable either — `JSON.stringify` turns one
// into `{}` — so it is turned into an object of entries first. Its
// keys are turned into their string form, because the decoded asset
// id is an object.
export function log_result(label: string, value: unknown): void {
  console.log(`--- ${label} ---`);
  console.log(
    JSON.stringify(
      value,
      (_key, item) => {
        if (typeof item === "bigint") return item.toString();
        if (item instanceof Map)
          return Object.fromEntries(
            [...item.entries()].map(([key, entry]) => [
              log_key(key),
              typeof entry === "bigint" ? entry.toString() : entry,
            ]),
          );
        return item;
      },
      2,
    ),
  );
}

// =================================================
// Turns a Map key into something readable.
//
// The decoded asset id is an object like `{ Nep141: "ft.near" }`, so
// it reads best as `nep141:ft.near`.
function log_key(key: unknown): string {
  if (typeof key === "string") return key;
  if (key && typeof key === "object") {
    const [tag, payload] = Object.entries(
      key as Record<string, unknown>,
    )[0] as [string, unknown];
    if (tag === "Near") return "near";
    if (tag === "Nep141") return `nep141:${payload as string}`;
    if (tag === "Nep245" || tag === "Nep171") {
      const body = payload as { contract_id: string; token_id: string };
      return `${tag.toLowerCase()}:${body.contract_id}:${body.token_id}`;
    }
  }
  return String(key);
}
// =================================================
// copyright 2026 by sleet.near
