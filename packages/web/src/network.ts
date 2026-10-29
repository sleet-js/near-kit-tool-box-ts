import { NETWORK_STORAGE_KEY, get_stored_network_id } from "./new-hot";
// ===========================================
// Reads the current network via `get_stored_network_id()`, which normalizes
// the stored value. Using the raw localStorage value here previously let
// a dirty value (e.g. "MainNet") normalize to "mainnet" while the toggle
// compared it against the literal "mainnet", so the toggle was a no-op
// and the UI could show one network while signing for another.
// ===========================================
export function toggle_network() {
  const new_network =
    get_stored_network_id() === "mainnet" ? "testnet" : "mainnet";
  localStorage.setItem(NETWORK_STORAGE_KEY, new_network);
  console.info(new_network);
}
//
export function set_network_mainnet() {
  localStorage.setItem(NETWORK_STORAGE_KEY, "mainnet");
}
export function set_network_testnet() {
  localStorage.setItem(NETWORK_STORAGE_KEY, "testnet");
}
