// =================================================
// Contract id constants for the Rhea DCL v2 contract.
// =================================================
import type {
  CONTRACT_ID_CONST_TYPE,
  NETWORK_ID,
} from "./contract_id_const_type";

// =================================================
export const RHEA_DCLV2_CONTRACT_ID_CONST: CONTRACT_ID_CONST_TYPE = {
  testnet: "dclv2.ref-dev.testnet",
  mainnet: "dclv2.ref-labs.near",
};

// =================================================
export function rhea_dclv2_contractid(network: NETWORK_ID): string {
  return RHEA_DCLV2_CONTRACT_ID_CONST[network];
}
// =================================================
// copyright 2026 by sleet.near
