// ===========================================
// @near-kit-tool-box/web — browser NEAR KIT setup.
//
// The per-network contract id resolver helpers and the method-name
// constants now live in `@near-kit-tool-box/fun` under
// `lib/const_id/*.ts` and `lib/methods/*.ts`. Resolve contract ids
// yourself at the call site, e.g.
//
//   import { get_stored_network_id } from "@near-kit-tool-box/web";
//   import { rhea_ammv2_contractid } from "@near-kit-tool-box/fun";
//   const id = rhea_ammv2_contractid(get_stored_network_id());
// ===========================================

// near_kit_client
export {
  near_kit_client,
  near_connect_client,
  get_stored_network_id,
  NETWORK_STORAGE_KEY,
} from "./new-hot";
// network
export {
  toggle_network,
  set_network_mainnet,
  set_network_testnet,
} from "./network";
// archival
export { near_kit_client_archival } from "./new-archival";
// ===========================================
// copyright 2026 by sleet.near
