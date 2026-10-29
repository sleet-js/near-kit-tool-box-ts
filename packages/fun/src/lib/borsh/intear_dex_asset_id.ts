// =================================================
// intear_dex_asset_id
//
// The INTEAR DEX `AssetId` type, in its string form and its borsh
// form.
//
// String form (the form every JSON API of the engine uses):
//   - `near`                            — native NEAR
//   - `nep141:<contract_id>`            — NEP-141 fungible token
//   - `nep245:<contract_id>:<token_id>` — NEP-245 multi-token
//   - `nep171:<contract_id>:<token_id>` — NEP-171 NFT
//
// Borsh form (what the sub-dexes read) — a Rust `enum AssetId`:
//   - `near`            → variant 0
//   - `nep141:<id>`     → variant 1 + String
//   - `nep245:<id>:<t>` → variant 2 + String + String
//   - `nep171:<id>:<t>` → variant 3 + String + String
//
// The schema below is the single source of truth for that encoding:
// the variant numbers come from the order the variants are declared
// in, so a reordering of the schema would be a reordering of the
// wire format.
//
// VERIFIED against live mainnet data (2026-10-29)
//   The variant numbers were checked against the contract itself: the
//   xyk dex's `get_pending_fees` and the otc dex's `get_balance` both
//   take a borsh `Vec<AssetId>` / `AssetId`, and the contract
//   deserialized all four forms without a panic — `near`, `nep141`,
//   `nep245` and `nep171`.
//
//   The *values* a live response carries are a narrower set: every
//   asset registered with the xyk and otc dexes is `near` or
//   `nep141`, and every pool asset is one of those two. So the
//   `nep245` and `nep171` arms are verified as accepted input, but
//   not observed coming back out of the contract.
// =================================================
import { b } from "@zorsh/zorsh";

// =================================================
export type INTEAR_DEX_ASSET_ID =
  | "near"
  | `nep141:${string}`
  | `nep245:${string}:${string}`
  | `nep171:${string}:${string}`;

// =================================================
// The borsh shape of an asset id.
//
// The variant order IS the wire format — variant 0 is `near`,
// variant 1 is `nep141`, and so on.
export const intear_dex_asset_id_schema = b.enum({
  Near: b.unit(),
  Nep141: b.string(),
  Nep245: b.struct({ contract_id: b.string(), token_id: b.string() }),
  Nep171: b.struct({ contract_id: b.string(), token_id: b.string() }),
});

// The decoded form of an asset id.
export type INTEAR_DEX_ASSET_ID_DECODED = b.infer<
  typeof intear_dex_asset_id_schema
>;

// =================================================
// Parses an INTEAR DEX asset id string into its parts.
// Throws when the string is not a valid asset id.
export function parse_intear_dex_asset_id(asset_id: string): {
  kind: "near" | "nep141" | "nep245" | "nep171";
  contract_id?: string;
  token_id?: string;
} {
  if (asset_id === "near") return { kind: "near" };
  const separator = asset_id.indexOf(":");
  if (separator === -1) {
    throw new Error(
      `intear dex: invalid asset id "${asset_id}" (expected "near", "nep141:<id>", "nep245:<id>:<token>" or "nep171:<id>:<token>")`,
    );
  }
  const prefix = asset_id.slice(0, separator);
  if (prefix === "nep141") {
    const contract_id = asset_id.slice(separator + 1);
    if (contract_id.length === 0) {
      throw new Error(
        `intear dex: invalid asset id "${asset_id}" (missing contract id)`,
      );
    }
    return { kind: "nep141", contract_id: contract_id };
  }
  if (prefix === "nep245" || prefix === "nep171") {
    const rest = asset_id.slice(separator + 1);
    const token_separator = rest.indexOf(":");
    if (token_separator === -1) {
      throw new Error(
        `intear dex: invalid asset id "${asset_id}" (missing token id after the contract id)`,
      );
    }
    const contract_id = rest.slice(0, token_separator);
    const token_id = rest.slice(token_separator + 1);
    if (contract_id.length === 0 || token_id.length === 0) {
      throw new Error(
        `intear dex: invalid asset id "${asset_id}" (empty contract id or token id)`,
      );
    }
    return { kind: prefix, contract_id: contract_id, token_id: token_id };
  }
  throw new Error(
    `intear dex: invalid asset id "${asset_id}" (unknown prefix "${prefix}")`,
  );
}

// =================================================
// Returns the contract id used to look up token metadata for an
// INTEAR DEX asset id.
// The asset id names the contract the token lives on:
//   - `near`                            → `near` (native NEAR)
//   - `nep141:<contract_id>`            → `<contract_id>`
//   - `nep245:<contract_id>:<token_id>` → `<contract_id>`
//   - `nep171:<contract_id>:<token_id>` → `<contract_id>`
// This is the id the token registry is asked about, so it is how a
// balance held inside the engine is matched to the token's metadata.
export function intear_dex_asset_token_id(asset_id: string): string {
  const parsed = parse_intear_dex_asset_id(asset_id);
  if (parsed.kind === "near") return "near";
  return parsed.contract_id as string;
}

// =================================================
// Turns an asset id string into the decoded borsh shape.
export function intear_dex_asset_id_to_decoded(
  asset_id: string,
): INTEAR_DEX_ASSET_ID_DECODED {
  const parsed = parse_intear_dex_asset_id(asset_id);
  switch (parsed.kind) {
    case "near":
      return { Near: {} };
    case "nep141":
      return { Nep141: parsed.contract_id as string };
    case "nep245":
      return {
        Nep245: {
          contract_id: parsed.contract_id as string,
          token_id: parsed.token_id as string,
        },
      };
    case "nep171":
      return {
        Nep171: {
          contract_id: parsed.contract_id as string,
          token_id: parsed.token_id as string,
        },
      };
  }
}

// =================================================
// Turns the decoded borsh shape back into the asset id string.
export function intear_dex_asset_id_from_decoded(
  decoded: INTEAR_DEX_ASSET_ID_DECODED,
): string {
  if ("Near" in decoded) return "near";
  if ("Nep141" in decoded) return `nep141:${decoded.Nep141}`;
  if ("Nep245" in decoded)
    return `nep245:${decoded.Nep245.contract_id}:${decoded.Nep245.token_id}`;
  return `nep171:${decoded.Nep171.contract_id}:${decoded.Nep171.token_id}`;
}
// =================================================
// copyright 2026 by sleet.near
