// =================================================
// bin/near/near_create_account.ts
//
// Call: creates a sub-account on the TLD registrar / linkdrop contract
// and grants `new_public_key` full access on it.
//
// usage:
//   bun run bin/near/near_create_account.ts --account-id <new_account_id> --public-key <ed25519:...>
//     [--tld-contract-id <id>]
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  near_tld_contractid,
  NEAR_KIT_NETWORK,
  require_signer,
  resolve_contract_id,
} from "../_shared/env.js";
import { near_create_account_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/near/near_create_account.ts --account-id <new_account_id> --public-key <ed25519:...> [--tld-contract-id <id>]";
const args = parse_args();
const new_account_id = require_string(args, "account-id", usage);
const new_public_key = require_string(args, "public-key", usage);
require_signer(usage);
const tld_contract_id = resolve_contract_id(
  typeof args["tld-contract-id"] === "string"
    ? args["tld-contract-id"]
    : undefined,
  near_tld_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `create_account ${new_account_id} @ ${tld_contract_id} (${NEAR_KIT_NETWORK})`,
  await near_create_account_fun_json(
    near_kit_env,
    tld_contract_id,
    new_account_id,
    new_public_key,
  ),
);
// =================================================
// copyright 2026 by sleet.near
