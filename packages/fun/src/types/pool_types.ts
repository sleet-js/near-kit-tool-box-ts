import * as z from "zod";
import { COUNT_NUMBER_Z_CONST } from "./scalar_type";
// =================================================
// POOL_GET_ACCOUNTS_ACCOUNTS_TYPE
//
// PROVENANCE
//   contract : `everything.pool.near` (mainnet) — the staking pool
//   methods  : `get_accounts`
//   verified : 2026-10-28, against the live mainnet response
//
// One staking account on the pool. The live answer is:
//   `{ account_id, unstaked_balance, staked_balance, can_withdraw }`
// with both balances as decimal strings in yoctoNEAR.
// =================================================
interface POOL_GET_ACCOUNTS_ACCOUNT_INTERFACE {
  account_id: string;
  unstaked_balance: string;
  staked_balance: string;
  can_withdraw: boolean;
}
// =================================================
export type POOL_GET_ACCOUNTS_ACCOUNTS_TYPE =
  POOL_GET_ACCOUNTS_ACCOUNT_INTERFACE[];

export const POOL_GET_ACCOUNTS_ACCOUNT_INTERFACE_Z_CONST = z.object({
  account_id: z.string(),
  unstaked_balance: z.string(),
  staked_balance: z.string(),
  can_withdraw: z.boolean(),
}) satisfies z.ZodType<POOL_GET_ACCOUNTS_ACCOUNT_INTERFACE>;

export const POOL_GET_ACCOUNTS_ACCOUNTS_TYPE_Z_CONST = z.array(
  POOL_GET_ACCOUNTS_ACCOUNT_INTERFACE_Z_CONST,
);

// The `get_number_of_accounts` view answers with a plain JSON number.
const POOL_COUNT_NUMBER_Z_CONST = COUNT_NUMBER_Z_CONST;

export { POOL_COUNT_NUMBER_Z_CONST };
// =================================================
// copyright 2026 by sleet.near
