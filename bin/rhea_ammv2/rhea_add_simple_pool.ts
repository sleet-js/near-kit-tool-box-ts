// =================================================
// bin/rhea_ammv2/rhea_add_simple_pool.ts
//
// Call: creates a new simple (constant-product) pool with the given fee
// (basis points) and an ordered list of NEP-141 tokens.
//
// usage:
//   bun run bin/rhea_ammv2/rhea_add_simple_pool.ts --fee <bps> --tokens <id1,id2> [--contract-id <id>]
// =================================================
import { parse_args, require_list, require_number } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  rhea_ammv2_contractid,
  require_signer,
  resolve_contract_id,
} from "../_shared/env.js";
import { rhea_ammv2_add_simple_pool_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_ammv2/rhea_add_simple_pool.ts --fee <bps> --tokens <id1,id2> [--contract-id <id>]";
const args = parse_args();
const fee = require_number(args, "fee", usage);
const tokens = require_list(args, "tokens", usage);
require_signer(usage);
if (tokens.length < 2) {
  console.error("error: --tokens needs at least two token ids");
  console.error(`usage: ${usage}`);
  process.exit(1);
}
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_ammv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `add_simple_pool ${tokens.join(" / ")} @ ${contract_id}`,
  await rhea_ammv2_add_simple_pool_fun_json(
    near_kit_env,
    contract_id,
    fee,
    tokens,
  ),
);
// =================================================
// copyright 2026 by sleet.near
