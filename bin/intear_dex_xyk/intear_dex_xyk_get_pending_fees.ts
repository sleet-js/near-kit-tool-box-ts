// =================================================
// bin/intear_dex_xyk/intear_dex_xyk_get_pending_fees.ts
//
// View: reads the fees an account has collected but not withdrawn yet
// in the INTEAR DEX xyk sub-dex.
//
// Pass the asset ids as a comma separated list, in the INTEAR DEX
// asset id form (`near`, `nep141:<contract_id>`, ...).
//
// usage:
//   bun run bin/intear_dex_xyk/intear_dex_xyk_get_pending_fees.ts \
//     --account-id <id> --asset-ids <id,id,...> [--dex-id <deployer/id>] [--contract-id <id>]
// =================================================
import { parse_args, require_list, require_string } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  intear_dex_xyk_dex_id,
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
} from "../_shared/env.js";
import {
  intear_dex_xyk_get_pending_fees_fun_json,
  type INTEAR_DEX_ASSET_ID_STRING,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_xyk/intear_dex_xyk_get_pending_fees.ts --account-id <id> --asset-ids <id,id,...> [--dex-id <deployer/id>] [--contract-id <id>]";
const args = parse_args();
const account_id = require_string(args, "account-id", usage);
const asset_ids = require_list(
  args,
  "asset-ids",
  usage,
) as INTEAR_DEX_ASSET_ID_STRING[];
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
const dex_id = resolve_contract_id(
  typeof args["dex-id"] === "string" ? args["dex-id"] : undefined,
  intear_dex_xyk_dex_id(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `xyk pending fees of ${account_id} @ ${dex_id}`,
  await intear_dex_xyk_get_pending_fees_fun_json(
    near_kit_env,
    contract_id,
    dex_id,
    account_id,
    asset_ids,
  ),
);
// =================================================
// copyright 2026 by sleet.near
