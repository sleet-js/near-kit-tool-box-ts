// =================================================
// pool_get_accounts_fun_json
//
// View: `get_accounts`. Returns the paginated list of accounts on
// the staking pool as a typed `POOL_GET_ACCOUNTS_ACCOUNTS_TYPE` array.
// To get the raw JSON, call `near.view(...)` directly.
// =================================================
import type { Near } from "near-kit";
import { pool_methods_const } from "../../lib/methods/methods_pool";
import {
  POOL_GET_ACCOUNTS_ACCOUNTS_TYPE_Z_CONST,
  type POOL_GET_ACCOUNTS_ACCOUNTS_TYPE,
} from "../../types/pool_types";
// =================================================
export async function pool_get_accounts_fun_json(
  near: Near,
  pool_contract_id: string,
  from_index: number,
  limit: number,
): Promise<POOL_GET_ACCOUNTS_ACCOUNTS_TYPE> {
  const result = await near.view(
    pool_contract_id,
    pool_methods_const.get_accounts,
    { from_index, limit },
  );
  return POOL_GET_ACCOUNTS_ACCOUNTS_TYPE_Z_CONST.parse(result);
}
// =================================================
// copyright 2026 by sleet.near
