// =================================================
// bin/intear_dex_otc/intear_dex_otc_get_authorized_key.ts
//
// View: reads the public key an account authorized to sign its own
// trade intents in the INTEAR DEX otc sub-dex.
//
// usage:
//   bun run bin/intear_dex_otc/intear_dex_otc_get_authorized_key.ts \
//     --account-id <id> --dex-id <deployer/id> [--contract-id <id>]
// =================================================
import { parseArgs, requireString } from "../_shared/args.js";
import {
  intear_dex_engine_contractid,
  logResult,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolveContractId,
} from "../_shared/env.js";
import { intear_dex_otc_get_authorized_key_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/intear_dex_otc/intear_dex_otc_get_authorized_key.ts --account-id <id> --dex-id <deployer/id> [--contract-id <id>]";
const args = parseArgs();
const accountId = requireString(args, "account-id", usage);
const contractId = resolveContractId(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  intear_dex_engine_contractid(NEAR_KIT_NETWORK),
);
// The otc dex is not deployed on mainnet — pass its dex id explicitly.
const dexId = requireString(args, "dex-id", usage);
// =================================================
logResult(
  `otc authorized key of ${accountId} @ ${dexId}`,
  await intear_dex_otc_get_authorized_key_fun_json(
    near_kit_env,
    contractId,
    dexId,
    accountId,
  ),
);
// =================================================
// copyright 2026 by sleet.near
