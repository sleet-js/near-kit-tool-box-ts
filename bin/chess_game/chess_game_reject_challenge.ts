// =================================================
// bin/chess_game/chess_game_reject_challenge.ts
//
// Call: declines a chess challenge.
//
// `is_challenger` is true for the sender of the challenge and false
// for the receiver. Either party may reject.
//
// usage:
//   bun run bin/chess_game/chess_game_reject_challenge.ts \
//     --challenge-id <id-vs-id> [--is-challenger] [--contract-id <id>]
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import {
  chess_game_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  require_signer,
  resolve_contract_id,
} from "../_shared/env.js";
import { chess_game_reject_challenge_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_reject_challenge.ts --challenge-id <id-vs-id> [--is-challenger] [--contract-id <id>]";
const args = parse_args();
require_signer(usage);
const challenge_id = require_string(args, "challenge-id", usage);
const is_challenger = args["is-challenger"] === true;
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `reject_challenge ${challenge_id} @ ${contract_id}`,
  await chess_game_reject_challenge_fun_json(
    near_kit_env,
    contract_id,
    challenge_id,
    is_challenger,
  ),
);
// =================================================
// copyright 2026 by sleet.near
