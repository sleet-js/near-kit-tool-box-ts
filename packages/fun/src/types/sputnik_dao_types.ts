// =================================================
// Typed shapes for the Sputnik DAO views.
//
// Every shape here was read off a live mainnet DAO
// (`huggies.sputnik-dao.near`, sputnikdao2 v2.3.1) on 2026-10-28.
//
// The contract's enums carry every variant, not only the ones seen
// on one DAO, so a caller can pattern-match on them.
// =================================================

// =================================================
// --- CONFIG ------------------------------
// The DAO's config, from `get_config`.
export interface SPUTNIK_DAO_CONFIG_TYPE {
  // the DAO's display name, e.g. `HUGGIES`.
  name: string;
  // what the DAO is for.
  purpose: string;
  // the DAO's metadata, base64-encoded JSON.
  // it decodes to things like `{ primaryColor, flagLogo }` — the
  // fields the DAO's own site uses.
  metadata: string | null;
}

// =================================================
// --- POLICY ------------------------------
// How a role is open.
export type SPUTNIK_DAO_ROLE_KIND_TYPE =
  // the role names the accounts in it.
  | { Group: string[] }
  // the role is open to every account, so it names none.
  | "Everyone";

// How votes are weighted in one kind of proposal.
export interface SPUTNIK_DAO_VOTE_POLICY_TYPE {
  // `RoleWeight`, `TokenWeight` or `FixedWeight`.
  weight_kind: string;
  // the quorum, as a string.
  quorum: string;
  // the threshold, as a string.
  threshold: string;
}

// One role in the DAO's policy.
export interface SPUTNIK_DAO_ROLE_TYPE {
  // the role's name, e.g. `Requestor`, `Admin`, `Approver`.
  name: string;
  // who may act in the role.
  kind: SPUTNIK_DAO_ROLE_KIND_TYPE;
  // what the role may do, e.g. `call:AddProposal`.
  permissions: string[];
  // the vote policy per kind of proposal, keyed by the kind.
  vote_policy?: Record<string, SPUTNIK_DAO_VOTE_POLICY_TYPE>;
}

// The DAO's whole policy, from `get_policy`.
export interface SPUTNIK_DAO_POLICY_TYPE {
  roles: SPUTNIK_DAO_ROLE_TYPE[];
}

// =================================================
// --- PROPOSALS ---------------------------
// One action of a `FunctionCall` proposal.
export interface SPUTNIK_DAO_FUNCTION_CALL_ACTION_TYPE {
  method_name: string;
  // the action's arguments, as a JSON string.
  args: string;
  // the attached deposit, as a string.
  deposit: string;
  // the gas, as a string.
  gas: string;
}

// The kind of a proposal.
// Every variant the contract knows is listed here. The contract
// answers with the variant name as the key, so the shape is
// externally tagged.
export type SPUTNIK_DAO_PROPOSAL_KIND_TYPE =
  | { ChangeConfig: { config: SPUTNIK_DAO_CONFIG_TYPE } }
  | { ChangePolicy: unknown }
  | { AddMemberToRole: { member_id: string; role: string } }
  | { RemoveMemberFromRole: { member_id: string; role: string } }
  | {
      FunctionCall: {
        receiver_id: string;
        actions: SPUTNIK_DAO_FUNCTION_CALL_ACTION_TYPE[];
      };
    }
  | { UpgradeSelf: unknown }
  | { UpgradeRemote: unknown }
  | {
      Transfer: {
        token_id: string;
        receiver_id: string;
        amount: string;
        msg: string | null;
      };
    }
  | { SetStakingContract: { staking_id: string } }
  | { AddBounty: { bounty: SPUTNIK_DAO_BOUNTY_TYPE } }
  | { BountyDone: { bounty_id: number } }
  | { Vote: unknown }
  | { FactoryInfoUpdate: { factory_info: unknown } }
  | { ChangePolicyAddOrUpdateRole: unknown }
  | { ChangePolicyRemoveRole: unknown }
  | { ChangePolicyUpdateDefaultVotePolicy: unknown }
  | { ChangePolicyUpdateParameters: unknown };

// The status of a proposal.
export type SPUTNIK_DAO_PROPOSAL_STATUS_TYPE =
  | "InProgress"
  | "Approved"
  | "Rejected"
  | "Removed"
  | "Expired"
  | "Moved"
  | "Failed";

// How an account voted on a proposal.
export type SPUTNIK_DAO_VOTE_TYPE = "Approve" | "Reject" | "Remove" | "Unknown";

// One entry of a proposal's action log.
export interface SPUTNIK_DAO_LAST_ACTION_TYPE {
  block_height: string;
}

// One proposal, from `get_proposals` / `get_proposal`.
export interface SPUTNIK_DAO_PROPOSAL_TYPE {
  // the proposal's id.
  id: number;
  // who submitted it.
  proposer: string;
  // the proposal's description — usually a markdown body.
  description: string;
  // what the proposal does.
  kind: SPUTNIK_DAO_PROPOSAL_KIND_TYPE;
  // where the proposal stands.
  status: SPUTNIK_DAO_PROPOSAL_STATUS_TYPE;
  // the votes per role, as `[yes, no, spam]`.
  // the three counts arrive as strings.
  vote_counts: Record<string, [string, string, string]>;
  // who voted, and how.
  votes: Record<string, SPUTNIK_DAO_VOTE_TYPE>;
  // when it was submitted, in nanoseconds since the epoch.
  submission_time: string;
  // the trail of the proposal's actions.
  last_actions_log?: SPUTNIK_DAO_LAST_ACTION_TYPE[];
}

// =================================================
// --- BOUNTIES ----------------------------
// One bounty, from `get_bounties` / `get_bounty`.
export interface SPUTNIK_DAO_BOUNTY_TYPE {
  id: number;
  proposer: string;
  description: string;
  // the token the bounty pays out in.
  token_id: string;
  // the amount, in the token's smallest unit.
  amount: string;
  // the times the bounty may be claimed.
  times: number;
  // the earliest a claim may happen, in nanoseconds.
  deadline: string;
  // the claim that finished the bounty.
  completed?: string;
}

// =================================================
// --- LOG ---------------------------------
// One entry of the DAO's actions log.
export interface SPUTNIK_DAO_ACTION_LOG_TYPE {
  // who acted.
  account_id: string;
  // the proposal the action belongs to.
  proposal_id: string;
  // what they did, e.g. `AddProposal`, `VoteApprove`.
  action: string;
  // the block the action landed in.
  block_height: string;
}

// =================================================
// --- MISC --------------------------------
// The factory a DAO belongs to, from `get_factory_info`.
export interface SPUTNIK_DAO_FACTORY_INFO_TYPE {
  // the factory's account id.
  factory_id: string;
  // whether the DAO follows the factory's default code.
  auto_update: boolean;
}

// One published version of the DAO contract, from the factory.
export interface SPUTNIK_DAO_CONTRACT_METADATA_TYPE {
  // the code hash of that version.
  version: [number, number];
  // the source commit it was built from.
  commit_id: string;
  // the changelog url, when there is one.
  changelog_url: string | null;
}

// The delegation balance of one account, from `delegation_balance_of`.
export type SPUTNIK_DAO_DELEGATION_BALANCE_TYPE = string;

// The delegation balance and the voting power it carries, from
// `delegation_balance_ratio`.
export type SPUTNIK_DAO_DELEGATION_BALANCE_RATIO_TYPE = [string, string];
// =================================================
// copyright 2026 by sleet.near
