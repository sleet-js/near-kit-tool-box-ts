// =================================================
// View: reads the Sputnik DAO factory's list of daos.
//
// The factory is `sputnik-dao.near`. It is NOT a dao — it deploys the
// daos and lists them, and it answers none of the dao methods.
//
// usage:
//   bun run bin/sputnik_dao/factory_daos.ts [--from-index <n>] [--limit <n>] [--contract-id <id>]
//
// Without `--from-index` the whole list comes back, which is every dao
// the factory has deployed — over two thousand. Page it with
// `--from-index` and `--limit`.
// =================================================
import { optional_number, parse_args } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  resolve_contract_id,
  sputnik_dao_factory_contractid,
} from "../_shared/env.js";
import {
  sputnik_dao_factory_get_daos_fun_json,
  sputnik_dao_factory_get_number_daos_fun_json,
} from "../../packages/fun/src/index.js";
// =================================================
const args = parse_args();
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  sputnik_dao_factory_contractid(NEAR_KIT_NETWORK),
);
const from_index = optional_number(args, "from-index", 0);
const limit = optional_number(args, "limit", 50);

// the count and the page are two different methods, so they are two
// requests — they run together, so the bin waits for the slower one.
const [number, daos] = await Promise.all([
  sputnik_dao_factory_get_number_daos_fun_json(near_kit_env, contract_id),
  sputnik_dao_factory_get_daos_fun_json(
    near_kit_env,
    contract_id,
    from_index,
    limit,
  ),
]);
// =================================================
log_result(`factory daos @ ${contract_id}`, {
  number_of_daos: number,
  from_index: from_index,
  limit,
  daos,
});
// =================================================
// copyright 2026 by sleet.near
