// =================================================
// Contract id constants for the Sputnik DAO contracts.
//
// There are TWO kinds of account and they are not interchangeable:
//
//   - the FACTORY (`sputnik-dao.near`) deploys the DAOs and lists
//     them.
//   - a DAO (`<name>.sputnik-dao.near`) holds the config, the policy,
//     the proposals and the bounties.
//
// Both exist on mainnet only — there is no testnet deployment.
// =================================================
import type {
  CONTRACT_ID_CONST_TYPE,
  NETWORK_ID,
} from "./contract_id_const_type";

// =================================================
/** The Sputnik DAO factory. Mainnet only. */
export const SPUTNIK_DAO_FACTORY_CONTRACT_ID_CONST: CONTRACT_ID_CONST_TYPE = {
  testnet: "sputnik-dao.near",
  mainnet: "sputnik-dao.near",
};

// =================================================
/**
 * Returns the Sputnik DAO factory contract id for the given network.
 *
 * The factory exists on mainnet only. The testnet slot repeats the
 * mainnet id so the resolver stays total; call sites that care should
 * check {@link SPUTNIK_DAO_IS_MAINNET_ONLY} first.
 */
export function sputnik_dao_factory_contractid(network: NETWORK_ID): string {
  return SPUTNIK_DAO_FACTORY_CONTRACT_ID_CONST[network];
}

// =================================================
/** The Sputnik DAO contracts have no testnet deployment. */
export const SPUTNIK_DAO_IS_MAINNET_ONLY = true;

// =================================================
/**
 * The account id of a Sputnik DAO, built from its name.
 *
 * A DAO is `<name>.sputnik-dao.near` — `huggies.sputnik-dao.near`,
 * `onsocial.sputnik-dao.near`, `sleet.sputnik-dao.near`.
 *
 * @param name - the DAO's name, without the `.sputnik-dao.near` suffix
 * @returns the DAO's account id
 */
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
/**
 * The name of a Sputnik DAO, taken from its account id.
 *
 * The inverse of {@link sputnik_dao_account_id}: `huggies.sputnik-dao.near`
 * becomes `huggies`.
 *
 * @param account_id - the DAO's account id
 * @returns the DAO's name
 */
export function sputnik_dao_name(account_id: string): string {
  const suffix = ".sputnik-dao.near";
  return account_id.endsWith(suffix)
    ? account_id.slice(0, account_id.length - suffix.length)
    : account_id;
}
// =================================================
// copyright 2026 by sleet.near
