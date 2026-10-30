// =================================================
// Contract id constants for the Sputnik DAO V2 contracts.
//
// There are TWO kinds of account and they are not interchangeable:
//
//   - the FACTORY deploys the DAOs and lists them. It is
//     `sputnik-dao.near` on mainnet and `sputnikv2.testnet` on testnet.
//   - a DAO holds the config, the policy, the proposals and the
//     bounties. It is `<name>.sputnik-dao.near` on mainnet and
//     `<name>.sputnikv2.testnet` on testnet.
//
// Both networks have a deployment, but they are DIFFERENT deployments
// with different method sets. The mainnet factory has
// `contract_source_metadata` and `store`; the testnet factory has
// `store_contract_self`, `remove_contract_self` and
// `on_remove_contract_self`, and no `contract_source_metadata`.
// =================================================
import type {
  CONTRACT_ID_CONST_TYPE,
  NETWORK_ID,
} from "./contract_id_const_type";

// =================================================
// The Sputnik DAO V2 factory.
export const SPUTNIK_DAO_FACTORY_CONTRACT_ID_CONST: CONTRACT_ID_CONST_TYPE = {
  testnet: "sputnikv2.testnet",
  mainnet: "sputnik-dao.near",
};

// =================================================
// Returns the Sputnik DAO V2 factory contract id for the given network.
export function sputnik_dao_factory_contractid(network: NETWORK_ID): string {
  return SPUTNIK_DAO_FACTORY_CONTRACT_ID_CONST[network];
}

// =================================================
// The account id of a Sputnik DAO V2 on the given network.
export function sputnik_dao_account_id_for_network(
  name: string,
  network: NETWORK_ID,
): string {
  return network === "testnet"
    ? sputnik_dao_testnet_account_id(name)
    : sputnik_dao_account_id(name);
}

// =================================================
// The account id of a mainnet Sputnik DAO V2, built from its name.
// A mainnet DAO is `<name>.sputnik-dao.near` — `huggies.sputnik-dao.near`,
// `onsocial.sputnik-dao.near`, `sleet.sputnik-dao.near`.
// params:
//   name: the DAO's name, without the `.sputnik-dao.near` suffix
// returns the DAO's account id
export function sputnik_dao_account_id(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    throw new Error(
      "sputnik dao: the dao name must not be empty (a dao account id looks like <name>.sputnik-dao.near)",
    );
  }
  if (trimmed.endsWith(".sputnik-dao.near")) return trimmed;
  return `${trimmed}.sputnik-dao.near`;
}

// =================================================
// The account id of a testnet Sputnik DAO V2, built from its name.
// A testnet DAO is `<name>.sputnikv2.testnet`.
// params:
//   name: the DAO's name, without the `.sputnikv2.testnet` suffix
// returns the DAO's account id
export function sputnik_dao_testnet_account_id(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    throw new Error(
      "sputnik dao: the dao name must not be empty (a testnet dao account id looks like <name>.sputnikv2.testnet)",
    );
  }
  if (trimmed.endsWith(".sputnikv2.testnet")) return trimmed;
  return `${trimmed}.sputnikv2.testnet`;
}

// =================================================
// The name of a Sputnik DAO V2, taken from its account id.
// The inverse of sputnik_dao_account_id_for_network:
// `huggies.sputnik-dao.near` becomes `huggies` on mainnet and
// `genesis.sputnikv2.testnet` becomes `genesis` on testnet.
// params:
//   account_id: the DAO's account id
//   network: the network whose DAO suffix should be removed
// returns the DAO's name
export function sputnik_dao_name(
  account_id: string,
  network: NETWORK_ID = "mainnet",
): string {
  const suffix =
    network === "testnet" ? ".sputnikv2.testnet" : ".sputnik-dao.near";
  return account_id.endsWith(suffix)
    ? account_id.slice(0, account_id.length - suffix.length)
    : account_id;
}
// =================================================
// copyright 2026 by sleet.near
