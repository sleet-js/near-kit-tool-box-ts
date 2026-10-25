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
import { BorshReader, BorshWriter } from "./intear_dex_borsh";

// =================================================
export type INTEAR_DEX_ASSET_ID =
  | "near"
  | `nep141:${string}`
  | `nep245:${string}:${string}`
  | `nep171:${string}:${string}`;

// =================================================
/**
 * Parses an INTEAR DEX asset id string into its parts.
 * Throws when the string is not a valid asset id.
 */
export function parseIntearDexAssetId(
  assetId: string,
): { kind: "near" | "nep141" | "nep245" | "nep171"; contractId?: string; tokenId?: string } {
  if (assetId === "near") return { kind: "near" };
  const separator = assetId.indexOf(":");
  if (separator === -1) {
    throw new Error(
      `intear dex: invalid asset id "${assetId}" (expected "near", "nep141:<id>", "nep245:<id>:<token>" or "nep171:<id>:<token>")`,
    );
  }
  const prefix = assetId.slice(0, separator);
  if (prefix === "nep141") {
    const contractId = assetId.slice(separator + 1);
    if (contractId.length === 0) {
      throw new Error(`intear dex: invalid asset id "${assetId}" (missing contract id)`);
    }
    return { kind: "nep141", contractId };
  }
  if (prefix === "nep245" || prefix === "nep171") {
    const rest = assetId.slice(separator + 1);
    const tokenSeparator = rest.indexOf(":");
    if (tokenSeparator === -1) {
      throw new Error(
        `intear dex: invalid asset id "${assetId}" (missing token id after the contract id)`,
      );
    }
    const contractId = rest.slice(0, tokenSeparator);
    const tokenId = rest.slice(tokenSeparator + 1);
    if (contractId.length === 0 || tokenId.length === 0) {
      throw new Error(`intear dex: invalid asset id "${assetId}" (empty contract id or token id)`);
    }
    return { kind: prefix, contractId, tokenId };
  }
  throw new Error(
    `intear dex: invalid asset id "${assetId}" (unknown prefix "${prefix}")`,
  );
}

// =================================================
/** Writes an asset id in borsh form. */
export function writeIntearDexAssetId(writer: BorshWriter, assetId: string): void {
  const parsed = parseIntearDexAssetId(assetId);
  switch (parsed.kind) {
    case "near":
      writer.u8(0);
      return;
    case "nep141":
      writer.u8(1);
      writer.string(parsed.contractId as string);
      return;
    case "nep245":
      writer.u8(2);
      writer.string(parsed.contractId as string);
      writer.string(parsed.tokenId as string);
      return;
    case "nep171":
      writer.u8(3);
      writer.string(parsed.contractId as string);
      writer.string(parsed.tokenId as string);
      return;
  }
}

// =================================================
/** Reads an asset id in borsh form. */
export function readIntearDexAssetId(reader: BorshReader): string {
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
