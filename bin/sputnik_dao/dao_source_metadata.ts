// =================================================
// View: reads a Sputnik DAO's own build metadata — its version, the
// link to its source, the standards it implements and how it was
// built.
//
// The method is not the DAO's own — near-sdk 5.24 provides it on every
// contract carrying the `nep330` standard.
//
// The DAO answers with its crate version, e.g. `2.3.1`. That is NOT
// the factory's `[major, minor]` build number — a DAO on the `[3,1]`
// build answers `2.3.1` too. To learn the build, read the DAO's code
// hash and match it against the factory's `get_contracts_metadata`.
//
// usage:
//   bun run bin/sputnik_dao/dao_source_metadata.ts --dao <name|account-id>
// =================================================
import { parse_args, require_string } from "../_shared/args.js";
import { log_result, near_kit_env, NEAR_KIT_NETWORK } from "../_shared/env.js";
import {
  sputnik_dao_account_id_for_network,
  sputnik_dao_contract_source_metadata_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/sputnik_dao/dao_source_metadata.ts --dao <name|account-id>";
const args = parse_args();
const dao_id = sputnik_dao_account_id_for_network(
  require_string(args, "dao", usage),
  NEAR_KIT_NETWORK,
);

const metadata = await sputnik_dao_contract_source_metadata_fun_json(
  near_kit_env,
  dao_id,
);
// =================================================
log_result(`contract source metadata @ ${dao_id}`, {
  version: metadata.version,
  link: metadata.link,
  standards: metadata.standards,
  contract_path: metadata.build_info.contract_path,
  source_code_snapshot: metadata.build_info.source_code_snapshot,
});
// =================================================
// copyright 2026 by sleet.near
