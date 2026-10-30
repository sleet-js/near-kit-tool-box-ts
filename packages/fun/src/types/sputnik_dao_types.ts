import * as z from "zod";
import {
  AMOUNT_STRING_Z_CONST,
  BOOLEAN_Z_CONST,
  COUNT_NUMBER_Z_CONST,
  OPTIONAL_ACCOUNT_ID_STRING_Z_CONST,
} from "./scalar_type";
// =================================================
// Typed shapes for the Sputnik DAO views.
//
// PROVENANCE
//   contract : `huggies.sputnik-dao.near` (mainnet)
//              sputnikdao2 v2.3.1 — the DAO contract
//              `sputnik-dao.near` (mainnet) — the factory contract
//   methods  : `get_config`, `get_policy`, `get_proposals`,
//              `get_proposal`, `get_actions_log`, `get_bounties`,
//              `get_bounty`, `get_bounty_claims`,
//              `get_bounty_number_of_claims`, `get_factory_info`,
//              `delegation_balance_of`, `delegation_balance_ratio`,
//              and the factory's `get_contracts_metadata`,
//              `get_default_version`, `get_dao_list`, `get_daos`,
//              `get_number_daos`, `get_owner`, `get_default_code_hash`
//   verified : 2026-10-28, against live mainnet responses.
//              2026-10-29, re-swept across the factory's whole DAO
//              list — 2035 DAOs, ~24k proposals read.
//
// The shapes below were read off the live responses, not from the
// contract source. The contract's enums carry every variant, not only
// the ones seen on one DAO, so a caller can pattern-match on them.
//
// Where a variant never showed up live, its payload shape comes from
// the contract's own source —
// `near-daos/sputnik-dao-contract`, `sputnikdao2/src/proposals.rs`,
// `sputnikdao2/src/policy.rs`, `sputnikdao2/src/upgrade.rs` — and the
// comment on that variant says so.
//
// `get_policy` answers with SIX top-level fields:
//   `roles`, `default_vote_policy`, `proposal_bond`, `proposal_period`,
//   `bounty_bond`, `bounty_forgiveness_period`
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
  metadata: string;
}

export const SPUTNIK_DAO_CONFIG_TYPE_Z_CONST = z.object({
  name: z.string(),
  purpose: z.string(),
  metadata: z.string(),
}) satisfies z.ZodType<SPUTNIK_DAO_CONFIG_TYPE>;

// =================================================
// --- POLICY ------------------------------
// How a role is open.
export type SPUTNIK_DAO_ROLE_KIND_TYPE =
  // the role names the accounts in it.
  | { Group: string[] }
  // the role is open to every account, so it names none.
  | "Everyone"
  // the role is open to accounts holding at least this delegated balance.
  | { Member: string };

// The vote policy of ONE ROLE, for one kind of proposal.
//
// Its `threshold` is the contract's `VoteThreshold` variant, and it
// has TWO wire forms:
//
//   threshold: "5"          a plain count — the votes that must come in
//   threshold: [31, 50]     a `[for, against]` pair
//
// Both occur in live DAOs. Over 83 DAOs read on 2026-10-28 the
// per-role threshold was an array 156 times and a string 10 times:
// `continent-dao.sputnik-dao.near` answers `"5"`, while
// `fradao.sputnik-dao.near` answers `[50, 100]` for its "Council"
// role. The two are not a difference between DAOs — a single DAO can
// carry both.
//
// So the threshold is a union. A caller that only wants "does this
// policy have a count or a ratio" checks the variant; a caller that
// wants the number narrows first.
export interface SPUTNIK_DAO_VOTE_POLICY_TYPE {
  // `RoleWeight` or `TokenWeight`.
  weight_kind: string;
  // the quorum, as a string.
  quorum: string;
  // the threshold — a count, or a `[for, against]` pair.
  threshold: string | number[];
}

// The DAO's DEFAULT vote policy, the one that applies to a proposal
// kind no role has an opinion about.
//
// It is a DIFFERENT contract type from the per-role vote policy, and
// the difference is visible in the live answer:
//
//   default_vote_policy.threshold  ->  [1, 2]   (an array)
//   roles[i].vote_policy[k].threshold -> "1"    (a string)
//
// The default threshold is a two-number pair — the votes that count
// for and the votes that count against — while the per-role threshold
// is a single count.
//
// Because the two shapes are genuinely different contract types,
// they get two types here instead of one type with a widened
// `threshold: string | number[]`. A split keeps each type honest:
// a caller reading a per-role policy does not have to narrow the
// threshold, and a caller reading the default policy always knows it
// is the array form.
//
// The two types still share their `weight_kind` and `quorum` fields,
// so those stay a shared base interface.
//
// ONE EXCEPTION, found on live mainnet: the default threshold is not
// always the pair. `hos-root.sputnik-dao.near` answers `"3"` — a
// plain count — for both `get_policy` and every `ChangePolicy`
// proposal it carries. `hos-root-staging.sputnik-dao.near` answers
// `"3"` the same way. The contract's `WeightOrRatio` is untagged, so
// a single `Weight` serializes as a bare number and a `Ratio` as a
// pair; the default vote policy simply happened to be set to a
// weight on those two DAOs.
//
// So the default threshold is a union too. The split between the two
// types stays — they are still different contract types — but each
// threshold is narrowed only where the live data actually narrows it.
export interface SPUTNIK_DAO_DEFAULT_VOTE_POLICY_TYPE {
  // `RoleWeight` or `TokenWeight`.
  weight_kind: string;
  // the quorum, as a string.
  quorum: string;
  // the threshold — a `[for, against]` pair, or a plain count on the
  // DAOs that set the default policy to a weight.
  threshold: number[] | string;
}

export const SPUTNIK_DAO_VOTE_POLICY_TYPE_Z_CONST = z.object({
  weight_kind: z.string(),
  quorum: z.string(),
  threshold: z.union([z.string(), z.array(z.number())]),
}) satisfies z.ZodType<SPUTNIK_DAO_VOTE_POLICY_TYPE>;

export const SPUTNIK_DAO_DEFAULT_VOTE_POLICY_TYPE_Z_CONST = z.object({
  weight_kind: z.string(),
  quorum: z.string(),
  threshold: z.union([z.string(), z.array(z.number())]),
}) satisfies z.ZodType<SPUTNIK_DAO_DEFAULT_VOTE_POLICY_TYPE>;

// One role in the DAO's policy.
export interface SPUTNIK_DAO_ROLE_TYPE {
  // the role's name, e.g. `Requestor`, `Admin`, `Approver`.
  name: string;
  // who may act in the role.
  kind: SPUTNIK_DAO_ROLE_KIND_TYPE;
  // what the role may do, e.g. `call:AddProposal`.
  permissions: string[];
  // the vote policy per kind of proposal, keyed by the kind.
  // absent on some DAOs, and empty (`{}`) on others.
  vote_policy?: Record<string, SPUTNIK_DAO_VOTE_POLICY_TYPE>;
}

// The DAO's whole policy, from `get_policy`.
// Six top-level fields, all verified live on 2026-10-28.
export interface SPUTNIK_DAO_POLICY_TYPE {
  // the DAO's roles, and who is in them.
  roles: SPUTNIK_DAO_ROLE_TYPE[];
  // the vote policy that applies where no role has an opinion.
  default_vote_policy: SPUTNIK_DAO_DEFAULT_VOTE_POLICY_TYPE;
  // the bond a proposal has to carry, as a string.
  proposal_bond: string;
  // how long a proposal stays open, in nanoseconds, as a string.
  proposal_period: string;
  // the bond a bounty has to carry, as a string.
  bounty_bond: string;
  // how long a bounty stays claimable, in nanoseconds, as a string.
  bounty_forgiveness_period: string;
}

export const SPUTNIK_DAO_ROLE_KIND_TYPE_Z_CONST = z.union([
  z.object({ Group: z.array(z.string()) }),
  z.literal("Everyone"),
  z.object({ Member: AMOUNT_STRING_Z_CONST }),
]) satisfies z.ZodType<SPUTNIK_DAO_ROLE_KIND_TYPE>;

export const SPUTNIK_DAO_ROLE_TYPE_Z_CONST = z.object({
  name: z.string(),
  kind: SPUTNIK_DAO_ROLE_KIND_TYPE_Z_CONST,
  permissions: z.array(z.string()),
  vote_policy: z
    .record(z.string(), SPUTNIK_DAO_VOTE_POLICY_TYPE_Z_CONST)
    .optional(),
}) satisfies z.ZodType<SPUTNIK_DAO_ROLE_TYPE>;

export const SPUTNIK_DAO_POLICY_TYPE_Z_CONST = z.object({
  roles: z.array(SPUTNIK_DAO_ROLE_TYPE_Z_CONST),
  default_vote_policy: SPUTNIK_DAO_DEFAULT_VOTE_POLICY_TYPE_Z_CONST,
  proposal_bond: z.string(),
  proposal_period: z.string(),
  bounty_bond: z.string(),
  bounty_forgiveness_period: z.string(),
}) satisfies z.ZodType<SPUTNIK_DAO_POLICY_TYPE>;

// =================================================
// --- MISC --------------------------------
// The factory a DAO belongs to, from `get_factory_info`.
//
// It also rides inside a `FactoryInfoUpdate` proposal, so it sits
// here — before the proposal kinds — and not down in the misc
// section.
export interface SPUTNIK_DAO_FACTORY_INFO_TYPE {
  // the factory's account id.
  factory_id: string;
  // whether the DAO follows the factory's default code.
  auto_update: boolean;
}

export const SPUTNIK_DAO_FACTORY_INFO_TYPE_Z_CONST = z.object({
  factory_id: z.string(),
  auto_update: z.boolean(),
}) satisfies z.ZodType<SPUTNIK_DAO_FACTORY_INFO_TYPE>;

// =================================================
// --- BOUNTIES ----------------------------
// One bounty, from `get_bounties` / `get_bounty`.
//
// The live shape has SIX fields and no more:
//   `id`, `description`, `token`, `amount`, `times`, `max_deadline`
//
// The token field is named `token`, not `token_id`, and the deadline
// is named `max_deadline`, not `deadline`. An empty `token` means
// NEAR.
export interface SPUTNIK_DAO_BOUNTY_TYPE {
  // the bounty's id.
  id: number;
  // what the bounty is for — usually a markdown body.
  description: string;
  // the token the bounty pays out in.
  // an empty string means NEAR.
  token: string;
  // the amount, in the token's smallest unit.
  amount: string;
  // the times the bounty may be claimed.
  times: number;
  // the earliest a claim may happen, in nanoseconds.
  max_deadline: string;
}

// The bounty as it rides inside an `AddBounty` proposal. It carries
// the same fields minus the `id`, which the proposal's own id carries.
export type SPUTNIK_DAO_BOUNTY_IN_PROPOSAL_TYPE = Omit<
  SPUTNIK_DAO_BOUNTY_TYPE,
  "id"
>;

export const SPUTNIK_DAO_BOUNTY_TYPE_Z_CONST = z.object({
  id: z.number(),
  description: z.string(),
  token: z.string(),
  amount: z.string(),
  times: z.number(),
  max_deadline: z.string(),
}) satisfies z.ZodType<SPUTNIK_DAO_BOUNTY_TYPE>;

export const SPUTNIK_DAO_BOUNTIES_TYPE_Z_CONST = z.array(
  SPUTNIK_DAO_BOUNTY_TYPE_Z_CONST,
);

// One claim of a bounty, from `get_bounty_claims`.
//
// The live answer has four fields:
//   `bounty_id`, `start_time`, `deadline`, `completed`
export interface SPUTNIK_DAO_BOUNTY_CLAIM_TYPE {
  // the bounty that was claimed.
  bounty_id: number;
  // when the claim started, in nanoseconds.
  start_time: string;
  // when the claim expires, in nanoseconds.
  deadline: string;
  // whether the claim is finished.
  completed: boolean;
}

export const SPUTNIK_DAO_BOUNTY_CLAIM_TYPE_Z_CONST = z.object({
  bounty_id: z.number(),
  start_time: z.string(),
  deadline: z.string(),
  completed: z.boolean(),
}) satisfies z.ZodType<SPUTNIK_DAO_BOUNTY_CLAIM_TYPE>;

export const SPUTNIK_DAO_BOUNTY_CLAIMS_TYPE_Z_CONST = z.array(
  SPUTNIK_DAO_BOUNTY_CLAIM_TYPE_Z_CONST,
);

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

export const SPUTNIK_DAO_FUNCTION_CALL_ACTION_TYPE_Z_CONST = z.object({
  method_name: z.string(),
  args: z.string(),
  deposit: z.string(),
  gas: z.string(),
}) satisfies z.ZodType<SPUTNIK_DAO_FUNCTION_CALL_ACTION_TYPE>;

// The four policy parameters a `ChangePolicyUpdateParameters`
// proposal can move.
//
// Every field is OPTIONAL on the wire. The contract's
// `PolicyParameters` is four `Option`s, and a proposal that changes
// only the proposal period leaves the other three as JSON `null`.
// The live `lesyk-business.sputnik-dao.near` proposal 10 answers
// `{"proposal_bond":null,"proposal_period":"86400000000000",
// "bounty_bond":null,"bounty_forgiveness_period":null}`.
//
// A field that IS set is a decimal string, the same string form the
// policy itself carries: `dao-builders.sputnik-dao.near` proposal 0
// answers `"proposal_bond":"10000000000000000000000"`.
//
// PROVENANCE: live mainnet, and the contract's own `PolicyParameters`
// (near-daos/sputnik-dao-contract, `sputnikdao2/src/proposals.rs`).
export interface SPUTNIK_DAO_POLICY_PARAMETERS_TYPE {
  // the bond a proposal has to carry.
  proposal_bond: string | null;
  // how long a proposal stays open, in nanoseconds.
  proposal_period: string | null;
  // the bond a bounty has to carry.
  bounty_bond: string | null;
  // how long a bounty stays claimable, in nanoseconds.
  bounty_forgiveness_period: string | null;
}

export const SPUTNIK_DAO_POLICY_PARAMETERS_TYPE_Z_CONST = z.object({
  proposal_bond: z.string().nullable(),
  proposal_period: z.string().nullable(),
  bounty_bond: z.string().nullable(),
  bounty_forgiveness_period: z.string().nullable(),
}) satisfies z.ZodType<SPUTNIK_DAO_POLICY_PARAMETERS_TYPE>;

// The policy shape stored in a DAO. It may also be the legacy default
// policy form: a list of council account ids.
export type SPUTNIK_DAO_VERSIONED_POLICY_TYPE =
  SPUTNIK_DAO_POLICY_TYPE | string[];

// The kind of a proposal.
// Every variant the contract knows is listed here. The contract
// answers with the variant name as the key, so the shape is
// externally tagged.
//
// `Vote` is the odd one out: the contract answers with the bare
// string `"Vote"`, not with an object. That is what the live
// `ref-finance` DAO answers for its first proposal, so the type
// carries the string form.
//
// The five `ChangePolicy*` variants are the contract's SHORT CUTS to
// editing the policy — each one patches one part of it instead of
// carrying the whole policy the way `ChangePolicy` does.
export type SPUTNIK_DAO_PROPOSAL_KIND_TYPE =
  | { ChangeConfig: { config: SPUTNIK_DAO_CONFIG_TYPE } }
  | { ChangePolicy: { policy: SPUTNIK_DAO_VERSIONED_POLICY_TYPE } }
  | { AddMemberToRole: { member_id: string; role: string } }
  | { RemoveMemberFromRole: { member_id: string; role: string } }
  | {
      FunctionCall: {
        receiver_id: string;
        actions: SPUTNIK_DAO_FUNCTION_CALL_ACTION_TYPE[];
      };
    }
  | { UpgradeSelf: { hash: string } }
  | {
      UpgradeRemote: { receiver_id: string; method_name: string; hash: string };
    }
  | {
      Transfer: {
        token_id: string;
        receiver_id: string;
        amount: string;
        msg: string | null;
      };
    }
  // PROVENANCE: contract source only — no live proposal carries it.
  | { SetStakingContract: { staking_id: string } }
  | { AddBounty: { bounty: SPUTNIK_DAO_BOUNTY_IN_PROPOSAL_TYPE } }
  | { BountyDone: { bounty_id: number; receiver_id: string } }
  | "Vote"
  // PROVENANCE: live — `neardragons.sputnik-dao.near` proposal 0.
  | { FactoryInfoUpdate: { factory_info: SPUTNIK_DAO_FACTORY_INFO_TYPE } }
  // PROVENANCE: live — `illumaheart.sputnik-dao.near` proposal 2.
  | { ChangePolicyAddOrUpdateRole: { role: SPUTNIK_DAO_ROLE_TYPE } }
  // PROVENANCE: contract source only — no live proposal carries it.
  | { ChangePolicyRemoveRole: { role: string } }
  // PROVENANCE: live — `sweat-multisig.sputnik-dao.near` proposal 4.
  | {
      ChangePolicyUpdateDefaultVotePolicy: {
        vote_policy: SPUTNIK_DAO_DEFAULT_VOTE_POLICY_TYPE;
      };
    }
  // PROVENANCE: live — `lesyk-business.sputnik-dao.near` proposal 10.
  | {
      ChangePolicyUpdateParameters: {
        parameters: SPUTNIK_DAO_POLICY_PARAMETERS_TYPE;
      };
    };

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

export const SPUTNIK_DAO_LAST_ACTION_TYPE_Z_CONST = z.object({
  block_height: z.string(),
}) satisfies z.ZodType<SPUTNIK_DAO_LAST_ACTION_TYPE>;

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
  //
  // the three counts come back as JSON NUMBERS on the older DAO
  // contracts and as STRINGS on the newer ones — the live answers
  // show both. So each count is a number or a string.
  vote_counts: Record<
    string,
    [number | string, number | string, number | string]
  >;
  // who voted, and how.
  votes: Record<string, SPUTNIK_DAO_VOTE_TYPE>;
  // when it was submitted, in nanoseconds since the epoch.
  submission_time: string;
  // the trail of the proposal's actions.
  // absent on the older contracts.
  last_actions_log?: SPUTNIK_DAO_LAST_ACTION_TYPE[];
}

// The count of one vote bucket. The older DAO contracts answer with
// a JSON number, the newer ones with a string.
const sputnik_dao_vote_count_z_const = z.union([z.number(), z.string()]);

// The kind of a proposal, as the contract answers it. The `Vote`
// variant is the bare string `"Vote"`; the rest are objects keyed by
// the variant name.
const sputnik_dao_proposal_kind_z_const = z.union([
  z.object({
    ChangeConfig: z.object({
      config: SPUTNIK_DAO_CONFIG_TYPE_Z_CONST,
    }),
  }),
  z.object({
    ChangePolicy: z.object({
      policy: z.union([SPUTNIK_DAO_POLICY_TYPE_Z_CONST, z.array(z.string())]),
    }),
  }),
  z.object({
    AddMemberToRole: z.object({
      member_id: z.string(),
      role: z.string(),
    }),
  }),
  z.object({
    RemoveMemberFromRole: z.object({
      member_id: z.string(),
      role: z.string(),
    }),
  }),
  z.object({
    FunctionCall: z.object({
      receiver_id: z.string(),
      actions: z.array(SPUTNIK_DAO_FUNCTION_CALL_ACTION_TYPE_Z_CONST),
    }),
  }),
  z.object({ UpgradeSelf: z.object({ hash: z.string() }) }),
  z.object({
    UpgradeRemote: z.object({
      receiver_id: z.string(),
      method_name: z.string(),
      hash: z.string(),
    }),
  }),
  z.object({
    Transfer: z.object({
      token_id: z.string(),
      receiver_id: z.string(),
      amount: z.string(),
      msg: z.string().nullable(),
    }),
  }),
  z.object({ SetStakingContract: z.object({ staking_id: z.string() }) }),
  z.object({
    AddBounty: z.object({
      bounty: SPUTNIK_DAO_BOUNTY_TYPE_Z_CONST.omit({ id: true }),
    }),
  }),
  z.object({
    BountyDone: z.object({
      bounty_id: z.number(),
      receiver_id: z.string(),
    }),
  }),
  z.literal("Vote"),
  z.object({
    FactoryInfoUpdate: z.object({
      factory_info: SPUTNIK_DAO_FACTORY_INFO_TYPE_Z_CONST,
    }),
  }),
  z.object({
    ChangePolicyAddOrUpdateRole: z.object({
      role: SPUTNIK_DAO_ROLE_TYPE_Z_CONST,
    }),
  }),
  z.object({ ChangePolicyRemoveRole: z.object({ role: z.string() }) }),
  z.object({
    ChangePolicyUpdateDefaultVotePolicy: z.object({
      vote_policy: SPUTNIK_DAO_DEFAULT_VOTE_POLICY_TYPE_Z_CONST,
    }),
  }),
  z.object({
    ChangePolicyUpdateParameters: z.object({
      parameters: SPUTNIK_DAO_POLICY_PARAMETERS_TYPE_Z_CONST,
    }),
  }),
]) satisfies z.ZodType<SPUTNIK_DAO_PROPOSAL_KIND_TYPE>;

export const SPUTNIK_DAO_PROPOSAL_TYPE_Z_CONST = z.object({
  id: z.number(),
  proposer: z.string(),
  description: z.string(),
  kind: sputnik_dao_proposal_kind_z_const,
  status: z.enum([
    "InProgress",
    "Approved",
    "Rejected",
    "Removed",
    "Expired",
    "Moved",
    "Failed",
  ]),
  vote_counts: z.record(
    z.string(),
    z.tuple([
      sputnik_dao_vote_count_z_const,
      sputnik_dao_vote_count_z_const,
      sputnik_dao_vote_count_z_const,
    ]),
  ),
  votes: z.record(
    z.string(),
    z.enum(["Approve", "Reject", "Remove", "Unknown"]),
  ),
  submission_time: z.string(),
  last_actions_log: z.array(SPUTNIK_DAO_LAST_ACTION_TYPE_Z_CONST).optional(),
}) satisfies z.ZodType<SPUTNIK_DAO_PROPOSAL_TYPE>;

export const SPUTNIK_DAO_PROPOSALS_TYPE_Z_CONST = z.array(
  SPUTNIK_DAO_PROPOSAL_TYPE_Z_CONST,
);

// =================================================
// --- LOG ---------------------------------
// One entry of the DAO's actions log.
export type SPUTNIK_DAO_ACTION_LOG_ACTION_TYPE =
  | "AddProposal"
  | "RemoveProposal"
  | "VoteApprove"
  | "VoteReject"
  | "VoteRemove"
  | "Finalize"
  | "MoveToHub";

export interface SPUTNIK_DAO_ACTION_LOG_TYPE {
  // who acted.
  account_id: string;
  // the proposal the action belongs to.
  proposal_id: string;
  // what they did.
  action: SPUTNIK_DAO_ACTION_LOG_ACTION_TYPE;
  // the block the action landed in.
  block_height: string;
}

export const SPUTNIK_DAO_ACTION_LOG_TYPE_Z_CONST = z.object({
  account_id: z.string(),
  proposal_id: z.string(),
  action: z.enum([
    "AddProposal",
    "RemoveProposal",
    "VoteApprove",
    "VoteReject",
    "VoteRemove",
    "Finalize",
    "MoveToHub",
  ]),
  block_height: z.string(),
}) satisfies z.ZodType<SPUTNIK_DAO_ACTION_LOG_TYPE>;

export const SPUTNIK_DAO_ACTIONS_LOG_TYPE_Z_CONST = z.array(
  SPUTNIK_DAO_ACTION_LOG_TYPE_Z_CONST,
);

// =================================================
// --- MISC --------------------------------
// `SPUTNIK_DAO_FACTORY_INFO_TYPE` and its schema live up in the
// policy section, because a `FactoryInfoUpdate` proposal carries
// one.
// =================================================

// One published version of the DAO contract, from the factory.
export interface SPUTNIK_DAO_CONTRACT_METADATA_TYPE {
  // the code hash of that version.
  version: [number, number];
  // the source commit it was built from.
  commit_id: string;
  // the changelog url, when there is one.
  changelog_url: string | null;
}

export const SPUTNIK_DAO_CONTRACT_METADATA_TYPE_Z_CONST = z.object({
  version: z.tuple([z.number(), z.number()]),
  commit_id: z.string(),
  changelog_url: z.string().nullable(),
}) satisfies z.ZodType<SPUTNIK_DAO_CONTRACT_METADATA_TYPE>;

// The factory's `get_contracts_metadata` answers with pairs shaped as
// `[code_hash, metadata]`. The current code also exposes the metadata
// as a flat `{ code_hash, metadata }` object in some clients, so keep
// the pair and the object forms distinct.

// The factory answers with `[code_hash, metadata]` pairs.
export const SPUTNIK_DAO_CONTRACT_METADATA_PAIR_TYPE_Z_CONST = z.tuple([
  z.string(),
  SPUTNIK_DAO_CONTRACT_METADATA_TYPE_Z_CONST,
]);

export const SPUTNIK_DAO_CONTRACT_METADATA_PAIRS_TYPE_Z_CONST = z.array(
  SPUTNIK_DAO_CONTRACT_METADATA_PAIR_TYPE_Z_CONST,
);

// The delegation balance of one account, from `delegation_balance_of`.
export type SPUTNIK_DAO_DELEGATION_BALANCE_TYPE = string;

export const SPUTNIK_DAO_DELEGATION_BALANCE_TYPE_Z_CONST =
  AMOUNT_STRING_Z_CONST;
// The delegated voting balance of one account and the DAO's total
// delegated voting power, from `delegation_balance_ratio`.
//
// The contract answers `[balance, total]` — it does not divide them
// into a ratio.
export type SPUTNIK_DAO_DELEGATION_BALANCE_RATIO_TYPE = [string, string];

export const SPUTNIK_DAO_DELEGATION_BALANCE_RATIO_TYPE_Z_CONST = z.tuple([
  AMOUNT_STRING_Z_CONST,
  AMOUNT_STRING_Z_CONST,
]);

// =================================================
// --- SCALARS -----------------------------
// A handful of the DAO's views answer with a bare scalar. They have
// no named type of their own — the helpers return `string`, `number`
// or `boolean` — so these are the matching schemas.
//
//   `delegation_total_supply`   -> a decimal string
//   `get_available_amount`       -> a decimal string
//   `get_locked_storage_amount`  -> a decimal string
//   `get_staking_contract`       -> an account id, `""` when none
//   `version`                    -> the contract version, e.g. "2.3.1"
//   `get_last_proposal_id`       -> a bare JSON number
//   `get_last_bounty_id`         -> a bare JSON number
//   `has_blob`                   -> a boolean
//   `get_bounty_number_of_claims`-> a number
//   `get_number_daos`            -> a number
//   `get_default_version`        -> a `[major, minor]` pair
//   `get_dao_list`, `get_daos`   -> a list of DAO account ids
const SPUTNIK_DAO_AMOUNT_STRING_Z_CONST = AMOUNT_STRING_Z_CONST;

export { SPUTNIK_DAO_AMOUNT_STRING_Z_CONST };

const SPUTNIK_DAO_ID_STRING_Z_CONST = OPTIONAL_ACCOUNT_ID_STRING_Z_CONST;

export { SPUTNIK_DAO_ID_STRING_Z_CONST };

export const SPUTNIK_DAO_ACCOUNT_ID_LIST_Z_CONST = z.array(z.string());

const SPUTNIK_DAO_COUNT_NUMBER_Z_CONST = COUNT_NUMBER_Z_CONST;

export { SPUTNIK_DAO_COUNT_NUMBER_Z_CONST };

const SPUTNIK_DAO_BOOLEAN_Z_CONST = BOOLEAN_Z_CONST;

export { SPUTNIK_DAO_BOOLEAN_Z_CONST };

export const SPUTNIK_DAO_VERSION_PAIR_Z_CONST = z.tuple([
  z.number(),
  z.number(),
]);
// =================================================
// copyright 2026 by sleet.near
