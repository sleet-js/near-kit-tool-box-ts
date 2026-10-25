// =================================================
// Contract id constants for the INTEAR DEX engine.
//
// The engine hosts every INTEAR DEX sub-dex. It is deployed on
// mainnet only — there is no testnet deployment.
//
//   MAINNET: dex.intear.near
//
// The sub-dexes are not separate accounts: they are WASM blobs the
// engine runs, identified by a `<deployer>/<id>` dex id. The
// mainnet xyk dex is `slimedragon.near/xyk`.
// =================================================
import type {
  CONTRACT_ID_CONST_TYPE,
  NETWORK_ID,
} from "./contract_id_const_type";

// =================================================
export const INTEAR_DEX_ENGINE_CONTRACT_ID_CONST: CONTRACT_ID_CONST_TYPE = {
  testnet: "dex.intear.near",
  mainnet: "dex.intear.near",
};

// =================================================
/**
 * Returns the INTEAR DEX engine contract id for the given network.
 *
 * The engine only exists on mainnet. The testnet slot repeats the
 * mainnet id so the resolver stays total; call sites that care
 * should check `INTEAR_DEX_ENGINE_IS_MAINNET_ONLY` first.
 */
export function intear_dex_engine_contractid(network: NETWORK_ID): string {
  return INTEAR_DEX_ENGINE_CONTRACT_ID_CONST[network];
}

// =================================================
/** The engine has no testnet deployment. */
export const INTEAR_DEX_ENGINE_IS_MAINNET_ONLY = true;

// =================================================
/**
 * The mainnet xyk sub-dex of the INTEAR DEX engine.
 *
 * A dex id is `<deployer>/<id>` — the account that deployed the dex
 * code and the name it was deployed under.
 */
export const INTEAR_DEX_XYK_DEX_ID = "slimedragon.near/xyk";

// =================================================
/**
 * Returns the INTEAR DEX xyk sub-dex id for the given network.
 *
 * The xyk dex is deployed on mainnet only.
 */
export function intear_dex_xyk_dex_id(network: NETWORK_ID): string {
  if (network === "testnet") {
    throw new Error(
      "intear dex: the xyk sub-dex is deployed on mainnet only (dex id slimedragon.near/xyk); there is no testnet deployment",
    );
  }
  return INTEAR_DEX_XYK_DEX_ID;
}
// =================================================
// copyright 2026 by sleet.near
