// =================================================
// View: reads the Sputnik DAO factory's own settings — the version it
// deploys new daos with, the code hash it deploys, the versions it
// knows about, and its owner.
//
// The factory is `sputnik-dao.near`. It is NOT a dao — it deploys the
// daos and lists them, and it answers none of the dao methods.
//
// usage:
//   bun run bin/sputnik_dao/factory_info.ts [--contract-id <id>]
//
// A dao can be pinned to an older version than the factory's default,
// so the factory's defaults and a dao's own `version` are worth
// reading together.
// =================================================
import { parse_args } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
  sputnik_dao_factory_contractid,
} from "../_shared/env.js";
import {
  sputnik_dao_factory_get_contracts_metadata_fun_json,
  sputnik_dao_factory_get_default_code_hash_fun_json,
  sputnik_dao_factory_get_default_version_fun_json,
  sputnik_dao_factory_get_owner_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const usage = "bun run bin/sputnik_dao/factory_info.ts [--contract-id <id>]";
const args = parse_args();
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  sputnik_dao_factory_contractid(NEAR_KIT_NETWORK),
);

const [defaultVersion, defaultCodeHash, contractsMetadata, owner] =
  await Promise.all([
    sputnik_dao_factory_get_default_version_fun_json(near_kit_env, contract_id),
    sputnik_dao_factory_get_default_code_hash_fun_json(
      near_kit_env,
      contract_id,
    ),
    sputnik_dao_factory_get_contracts_metadata_fun_json(
      near_kit_env,
      contract_id,
    ),
    sputnik_dao_factory_get_owner_fun_json(near_kit_env, contract_id),
  ]);
// =================================================
log_result(`factory info @ ${contract_id}`, {
  owner,
  default_version: defaultVersion,
  default_code_hash: defaultCodeHash,
  contracts_metadata: contractsMetadata,
});
// =================================================
// copyright 2026 by sleet.near
