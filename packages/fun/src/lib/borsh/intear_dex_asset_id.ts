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
// Borsh form (what the sub-dexes read):
//   - `near`            → variant 0
//   - `nep141:<id>`     → variant 1 + String
//   - `nep245:<id>:<t>` → variant 2 + String + String
//   - `nep171:<id>:<t>` → variant 3 + String + String
// =================================================
import { borsh_reader, borsh_writer } from "./intear_dex_borsh";

// =================================================
export type INTEAR_DEX_ASSET_ID =
  | "near"
  | `nep141:${string}`
  | `nep245:${string}:${string}`
  | `nep171:${string}:${string}`;

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

// Writes an asset id in borsh form.
export function write_intear_dex_asset_id(
  writer: borsh_writer,
  asset_id: string,
): void {
  const parsed = parse_intear_dex_asset_id(asset_id);
  switch (parsed.kind) {
    case "near":
      writer.u8(0);
      return;
    case "nep141":
      writer.u8(1);
      writer.string(parsed.contract_id as string);
      return;
    case "nep245":
      writer.u8(2);
      writer.string(parsed.contract_id as string);
      writer.string(parsed.token_id as string);
      return;
    case "nep171":
      writer.u8(3);
      writer.string(parsed.contract_id as string);
      writer.string(parsed.token_id as string);
      return;
  }
}

// =================================================
// Reads an asset id in borsh form.
export function read_intear_dex_asset_id(reader: borsh_reader): string {
  const variant = reader.u8();
  switch (variant) {
    case 0:
      return "near";
    case 1:
      return `nep141:${reader.string()}`;
    case 2:
      return `nep245:${reader.string()}:${reader.string()}`;
    case 3:
      return `nep171:${reader.string()}:${reader.string()}`;
    default:
      throw new Error(`intear dex: unknown asset id variant ${variant}`);
  }
}
// =================================================
// copyright 2026 by sleet.near
