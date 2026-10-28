// =================================================
// methods_sputnik_dao
//
// Method name constants for the Sputnik DAO contracts.
//
// There are TWO contracts and they answer different things:
//
//   - the FACTORY (`sputnik-dao.near`) deploys the DAOs and lists
//     them. It has no DAO state of its own.
//   - a DAO (`<name>.sputnik-dao.near`) holds the config, the policy,
//     the proposals and the bounties.
//
// --- WHY --- calling the factory as if it were a DAO fails with a
// misleading `MethodResolveError(MethodNotFound)` for every method,
// because none of the DAO methods exist there. Use the factory
// helpers for the factory and the DAO helpers for a real DAO.
// =================================================

// =================================================
/**
 * Method name constants for the Sputnik DAO **factory**
 * (`sputnik-dao.near`).
 *
 * The factory creates the DAOs and keeps the list of them. Its
 * `get_dao_list` and `get_daos` answer the same thing — the list of
 * DAO account ids — the one unpaginated and the other paged.
 */
export const sputnik_dao_factory_methods_const = {
  // ---- views ----
  get_dao_list: "get_dao_list",
  get_daos: "get_daos",
  get_number_daos: "get_number_daos",
  get_default_version: "get_default_version",
  get_default_code_hash: "get_default_code_hash",
  get_contracts_metadata: "get_contracts_metadata",
  get_owner: "get_owner",
  contract_source_metadata: "contract_source_metadata",
  // ---- calls ----
  set_owner: "set_owner",
  set_default_code_hash: "set_default_code_hash",
  get_code: "get_code",
  delete_contract: "delete_contract",
  store_contract_metadata: "store_contract_metadata",
  on_create: "on_create",
} as const;

// =================================================
/**
 * Method name constants for a Sputnik DAO (`<name>.sputnik-dao.near`).
 *
 * The DAO holds its config, its policy (the roles and who is in
 * them), its proposals and its bounties.
 */
export const sputnik_dao_methods_const = {
  // ---- views: config and policy ----
  get_config: "get_config",
  get_policy: "get_policy",
  version: "version",
  contract_source_metadata: "contract_source_metadata",
  // ---- views: proposals ----
  get_proposals: "get_proposals",
  get_proposal: "get_proposal",
  get_last_proposal_id: "get_last_proposal_id",
  get_actions_log: "get_actions_log",
  // ---- views: bounties ----
  get_bounties: "get_bounties",
  get_bounty: "get_bounty",
  get_bounty_claims: "get_bounty_claims",
  get_bounty_number_of_claims: "get_bounty_number_of_claims",
  get_last_bounty_id: "get_last_bounty_id",
  // ---- views: balances and staking ----
  get_available_amount: "get_available_amount",
  get_locked_storage_amount: "get_locked_storage_amount",
  get_staking_contract: "get_staking_contract",
  get_factory_info: "get_factory_info",
  // ---- views: delegation ----
  delegation_balance_of: "delegation_balance_of",
  delegation_balance_ratio: "delegation_balance_ratio",
  delegation_total_supply: "delegation_total_supply",
  // ---- views: blobs ----
  has_blob: "has_blob",
  // ---- calls ----
  add_proposal: "add_proposal",
  act_proposal: "act_proposal",
  on_proposal_callback: "on_proposal_callback",
  bounty_claim: "bounty_claim",
  bounty_done: "bounty_done",
  bounty_giveup: "bounty_giveup",
  store_blob: "store_blob",
  remove_blob: "remove_blob",
  register_delegation: "register_delegation",
  migrate: "migrate",
} as const;
// =================================================
// copyright 2026 by sleet.near
