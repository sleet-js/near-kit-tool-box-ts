// =================================================
// sputnik_dao_args
//
// Parameter type map for every Sputnik DAO V2 view/call function
// exported from this package. Each method gets its own slice of the
// args it actually consumes.
// =================================================
import type { SPUTNIK_DAO_PROPOSAL_KIND_TYPE } from "../../types/sputnik_dao_types";

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
  // add_proposal
  description: string;
  kind: SPUTNIK_DAO_PROPOSAL_KIND_TYPE;
  // act_proposal
  action: SPUTNIK_DAO_ACTION_TYPE;
  proposal: SPUTNIK_DAO_PROPOSAL_KIND_TYPE;
  memo: string | null;
  // bounty_claim / bounty_done
  deadline: string;
  // bounty_done
  account_id_optional: string | null;
  // delegate / undelegate
  amount: string;
  // factory store / get_code
  code_hash: string;
}

// The actions accepted by `act_proposal`.
export type SPUTNIK_DAO_ACTION_TYPE =
  | "RemoveProposal"
  | "VoteApprove"
  | "VoteReject"
  | "VoteRemove"
  | "Finalize"
  | "MoveToHub";

// The proposal kinds accepted by `add_proposal` and `act_proposal`.
export type { SPUTNIK_DAO_PROPOSAL_KIND_TYPE };
// =================================================
// copyright 2026 by sleet.near
