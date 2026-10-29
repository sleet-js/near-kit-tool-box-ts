// =================================================
// bin/ft/ft_metadata.ts
//
// View (NEP-145): reads the token metadata (spec, name, symbol, icon,
// decimals, ...).
//
// usage:
//   bun run bin/ft/ft_metadata.ts --contract-id <id>
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import { log_result, near_kit_env } from "../_shared/env.js";
import { ft_metadata_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage = "bun run bin/ft/ft_metadata.ts --contract-id <id>";
const args = parse_args();
const contract_id = require_string(args, "contract-id", usage);
// =================================================
log_result(
  `ft_metadata @ ${contract_id}`,
  await ft_metadata_fun_json(near_kit_env, contract_id),
);
// =================================================
// copyright 2026 by sleet.near
