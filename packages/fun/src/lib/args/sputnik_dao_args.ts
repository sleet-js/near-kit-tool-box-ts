// =================================================
// sputnik_dao_args
//
// Parameter type map for every Sputnik DAO view/call function
// exported from this package. Each method gets its own slice of the
// args it actually consumes.
// =================================================

// =================================================
export interface sputnik_dao_args {
  // get_proposals / get_bounties
  from_index: number;
  limit: number;
  // get_proposal / get_bounty / get_bounty_number_of_claims
  id: number;
  // get_bounty_claims / delegation_balance_of
  account_id: string;
  // has_blob
  hash: string;
}
// =================================================
// copyright 2026 by sleet.near
