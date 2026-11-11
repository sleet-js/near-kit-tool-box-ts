// =================================================
// bin/chess_game/chess_game_storage_withdraw.ts
//
// Call: withdraws the storage balance of the signer.
//
// `amount` is optional and is a yoctoNEAR decimal string. Without it
// the contract withdraws the whole balance.
//
// usage:
//   bun run bin/chess_game/chess_game_storage_withdraw.ts \
//     [--amount <yocto>] [--contract-id <id>]
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
import { chess_game_storage_withdraw_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_storage_withdraw.ts [--amount <yocto>] [--contract-id <id>]";
const args = parse_args();
require_signer(usage);
const amount = typeof args["amount"] === "string" ? args["amount"] : undefined;
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `storage_withdraw @ ${contract_id}`,
  await chess_game_storage_withdraw_fun_json(near_kit_env, contract_id, amount),
);
// =================================================
// copyright 2026 by sleet.near
