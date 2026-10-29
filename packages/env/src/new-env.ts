import { Near } from "near-kit";
import type { PrivateKey } from "near-kit";
// ==============================================
// Load environment variables from .env file
import * as dotenv from "dotenv";
dotenv.config();
// ==============================================
// NETWORK_ID values are exactly `mainnet` or `testnet`. To target a
// custom RPC URL, build a `Near` instance yourself with
// `new Near({ rpcUrl, ... })` instead of using `near_kit_env`.
//
// All env vars are prefixed with `NEAR_KIT_` so they never collide with
// the generic `NEAR_*` vars that the `near-kit` library itself reads.
export const NEAR_KIT_NETWORK: "mainnet" | "testnet" =
  (process.env.NEAR_KIT_NETWORK as "mainnet" | "testnet") || "testnet";

export const NEAR_KIT_ACCOUNT_ID: string =
  process.env.NEAR_KIT_ACCOUNT_ID ?? "";

export const NEAR_KIT_PRIVATE_KEY: PrivateKey | undefined = process.env
  .NEAR_KIT_PRIVATE_KEY as PrivateKey | undefined;

// ==============================================
// Initialize for backend/scripts
export const near_kit_env = new Near({
  network: NEAR_KIT_NETWORK,
  privateKey: NEAR_KIT_PRIVATE_KEY,
  defaultSignerId: NEAR_KIT_ACCOUNT_ID,
});
// ==============================================
// copyright 2026 by sleet.near
