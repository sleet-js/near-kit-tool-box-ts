// =================================================
// Contract id constants for the app.chess-game.near contract.
//
// The chess contract is mainnet only — there is no testnet deployment,
// so the testnet id is the mainnet id too.
// =================================================
import type {
  CONTRACT_ID_CONST_TYPE,
  NETWORK_ID,
} from "./contract_id_const_type";

// =================================================
export const CHESS_GAME_CONTRACT_ID_CONST: CONTRACT_ID_CONST_TYPE = {
  testnet: "app.chess-game.near",
  mainnet: "app.chess-game.near",
};

// =================================================
// Returns the app.chess-game.near contract id for the given network.
export function chess_game_contractid(network: NETWORK_ID): string {
  return CHESS_GAME_CONTRACT_ID_CONST[network];
}
// =================================================
// copyright 2026 by sleet.near
