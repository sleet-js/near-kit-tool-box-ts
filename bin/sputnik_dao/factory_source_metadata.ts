// =================================================
// View: reads the Sputnik DAO factory's own build metadata — its
// version, the link to its source, the standards it implements and how
// it was built.
//
// The method is not the factory's own — near-sdk 5.24 provides it on
// every contract carrying the `nep330` standard.
//
// The factory answers with its own crate version, `0.2.1` on mainnet.
// That says nothing about which build of the DAO contract it deploys —
// `get_default_version` answers that, with a `[major, minor]` pair.
//
// The mainnet factory answers this method. The testnet factory does
// not have it.
//
// usage:
//   bun run bin/sputnik_dao/factory_source_metadata.ts [--contract-id <id>]
// =================================================
import { parse_args } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
  sputnik_dao_factory_contractid,
} from "../_shared/env.js";
import { sputnik_dao_factory_contract_source_metadata_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const args = parse_args();
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  sputnik_dao_factory_contractid(NEAR_KIT_NETWORK),
);

const metadata = await sputnik_dao_factory_contract_source_metadata_fun_json(
  near_kit_env,
  contract_id,
);
// =================================================
log_result(`contract source metadata @ ${contract_id}`, {
  version: metadata.version,
  link: metadata.link,
  standards: metadata.standards,
  contract_path: metadata.build_info.contract_path,
  source_code_snapshot: metadata.build_info.source_code_snapshot,
});
// =================================================
// copyright 2026 by sleet.near
