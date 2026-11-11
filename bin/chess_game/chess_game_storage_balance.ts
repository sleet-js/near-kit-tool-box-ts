// =================================================
// bin/chess_game/chess_game_storage_balance.ts
//
// View: reads the NEP-145 storage balance bounds of the chess contract
// and the storage balance of one account on it.
//
// usage:
//   bun run bin/chess_game/chess_game_storage_balance.ts \
//     [--account-id <id>] [--contract-id <id>]
// =================================================
import { parse_args } from "../_shared/args.js";
import {
  chess_game_contractid,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import {
  chess_game_storage_balance_bounds_fun_json,
  chess_game_storage_balance_of_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/chess_game/chess_game_storage_balance.ts [--account-id <id>] [--contract-id <id>]";
const args = parse_args();
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  chess_game_contractid(NEAR_KIT_NETWORK),
);
const account_id =
  typeof args["account-id"] === "string" ? args["account-id"] : undefined;
// =================================================
log_result(`storage balance bounds @ ${contract_id}`, {
  bounds: await chess_game_storage_balance_bounds_fun_json(
    near_kit_env,
    contract_id,
  ),
  balance:
    account_id === undefined
      ? null
      : await chess_game_storage_balance_of_fun_json(
          near_kit_env,
          contract_id,
          account_id,
        ),
});
// =================================================
// copyright 2026 by sleet.near
