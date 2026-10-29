import { NearConnector } from "@hot-labs/near-connect";
import { Near, fromNearConnect } from "near-kit";
// ==============================================
export const NETWORK_STORAGE_KEY = "network_id"; // used for network toggle
// ==============================================
// Initialize the connector
const near_connect_mainnet = new NearConnector({
  network: "mainnet",
  footerBranding: {
    icon: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%20512%20512%22%20class%3D%22size-7%22%3E%3Crect%20width%3D%22512%22%20height%3D%22512%22%20fill%3D%22%2300ec97%22%20rx%3D%22110%22%2F%3E%3Cpath%20fill%3D%22%23000%22%20d%3D%22M373.89%20106.199a31.95%2031.95%200%200%200-27.213%2015.207l-62.631%2092.979a6.67%206.67%200%200%200-.989%205.001%206.66%206.66%200%200%200%202.837%204.235%206.67%206.67%200%200%200%208.032-.494l61.643-53.47c1.02-.924%202.599-.827%203.523.193.419.473.644%201.074.644%201.697v167.402a2.49%202.49%200%200%201-2.502%202.491%202.48%202.48%200%200%201-1.912-.891L168.976%20117.497a31.93%2031.93%200%200%200-24.356-11.298h-6.508c-17.623%200-31.917%2014.294-31.917%2031.917v235.767c0%2017.623%2014.294%2031.917%2031.917%2031.917a31.94%2031.94%200%200%200%2027.213-15.206l62.631-92.98a6.66%206.66%200%200%200-1.847-9.236%206.67%206.67%200%200%200-8.033.494l-61.643%2053.471c-1.02.923-2.599.826-3.522-.194a2.5%202.5%200%200%201-.634-1.697V173.008a2.49%202.49%200%200%201%202.502-2.492c.731%200%201.439.322%201.912.891l186.313%20223.096a31.95%2031.95%200%200%200%2024.357%2011.297h6.508c17.623%200%2031.927-14.272%2031.938-31.895V138.116c0-17.623-14.294-31.917-31.917-31.917%22%2F%3E%3C%2Fsvg%3E",
    heading: "NEAR Connector",
    link: "https://wallet.near.org",
    linkText: "Don't have a wallet?",
  },
});
const near_connect_testnet = new NearConnector({
  network: "testnet",
  footerBranding: {
    icon: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%20512%20512%22%20class%3D%22size-7%22%3E%3Crect%20width%3D%22512%22%20height%3D%22512%22%20fill%3D%22%2300ec97%22%20rx%3D%22110%22%2F%3E%3Cpath%20fill%3D%22%23000%22%20d%3D%22M373.89%20106.199a31.95%2031.95%200%200%200-27.213%2015.207l-62.631%2092.979a6.67%206.67%200%200%200-.989%205.001%206.66%206.66%200%200%200%202.837%204.235%206.67%206.67%200%200%200%208.032-.494l61.643-53.47c1.02-.924%202.599-.827%203.523.193.419.473.644%201.074.644%201.697v167.402a2.49%202.49%200%200%201-2.502%202.491%202.48%202.48%200%200%201-1.912-.891L168.976%20117.497a31.93%2031.93%200%200%200-24.356-11.298h-6.508c-17.623%200-31.917%2014.294-31.917%2031.917v235.767c0%2017.623%2014.294%2031.917%2031.917%2031.917a31.94%2031.94%200%200%200%2027.213-15.206l62.631-92.98a6.66%206.66%200%200%200-1.847-9.236%206.67%206.67%200%200%200-8.033.494l-61.643%2053.471c-1.02.923-2.599.826-3.522-.194a2.5%202.5%200%200%201-.634-1.697V173.008a2.49%202.49%200%200%201%202.502-2.492c.731%200%201.439.322%201.912.891l186.313%20223.096a31.95%2031.95%200%200%200%2024.357%2011.297h6.508c17.623%200%2031.927-14.272%2031.938-31.895V138.116c0-17.623-14.294-31.917-31.917-31.917%22%2F%3E%3C%2Fsvg%3E",
    heading: "NEAR Connector",
    link: "https://wallet.near.org",
    linkText: "Don't have a wallet?",
  },
});
// ==============================================
// Create a NEAR instance using the connector
// Type assertion needed for near-kit 0.12.0+ compatibility
const near_kit_mainnet = new Near({
  network: "mainnet",
  wallet: fromNearConnect(near_connect_mainnet as any),
});
const near_kit_testnet = new Near({
  network: "testnet",
  wallet: fromNearConnect(near_connect_testnet as any),
});
// ==============================================
// Single source of truth for reading/validating the stored network id.
// Any value that is not exactly "testnet" (after trim + lowercase) is
// treated as "mainnet", so every caller agrees on the current network.
function normalize_network_id(raw: string | null): "mainnet" | "testnet" {
  const value = (raw || "mainnet").trim().toLowerCase();
  return value === "testnet" ? "testnet" : "mainnet";
}
export function get_stored_network_id(): "mainnet" | "testnet" {
  return normalize_network_id(localStorage.getItem(NETWORK_STORAGE_KEY));
}
// ==============================================
// ==============================================
export function near_kit_client() {
  const network_id = get_stored_network_id();
  const client = network_id === "testnet" ? near_kit_testnet : near_kit_mainnet;
  console.log("[near_kit_client] network_id:", network_id);
  console.log(
    "[near_kit_client] client:",
    network_id === "testnet" ? "near_kit_testnet" : "near_kit_mainnet",
  );

  return client;
}
// ==============================================
export function near_connect_client() {
  const network_id = get_stored_network_id();
  const client =
    network_id === "testnet" ? near_connect_testnet : near_connect_mainnet;
  console.log("[near_connect_client] network_id:", network_id);
  console.log(
    "[near_connect_client] client:",
    network_id === "testnet" ? "near_connect_testnet" : "near_connect_mainnet",
  );

  return client;
}
// ==============================================
// ==============================================
// copyright: 2026 by sleet.near
