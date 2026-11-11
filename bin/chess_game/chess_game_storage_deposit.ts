// =================================================
// bin/chess_game/chess_game_storage_deposit.ts
//
// Call: registers the signer on the chess contract, or tops up the
// storage balance of one that is already registered.
//
// The deposit is the storage cost — at least 0.05 NEAR.
//
// usage:
//   bun run bin/chess_game/chess_game_storage_deposit.ts \
//     [--account-id <id>] [--registration-only] [--contract-id <id>]
// =================================================
import { parse_args } from "../_shared/args.js";
import {
  chess_game_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  require_signer,
  resolve_contract_id,
} from "../_shared/env.js";
import { chess_game_storage_deposit_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_storage_deposit.ts [--account-id <id>] [--registration-only] [--contract-id <id>]";
const args = parse_args();
require_signer(usage);
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
const account_id =
  typeof args["account-id"] === "string" ? args["account-id"] : undefined;
const registration_only = args["registration-only"] === true ? true : undefined;
// =================================================
log_result(
  `storage_deposit @ ${contract_id}`,
  await chess_game_storage_deposit_fun_json(
    near_kit_env,
    contract_id,
    account_id,
    registration_only,
  ),
);
// =================================================
// copyright 2026 by sleet.near
