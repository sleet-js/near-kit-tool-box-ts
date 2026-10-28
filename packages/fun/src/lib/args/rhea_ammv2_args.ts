// =================================================
// rhea_ammv2_args
//
// Parameter type map for every rhea_ammv2 view/call function exported
// from this package. Each method gets its own slice of the args it
// actually consumes.
// =================================================

// =================================================
export interface rhea_ammv2_args {
  // pagination (get_pools)
  from_index: number;
  limit: number;
  // add_simple_pool
  fee: number;
  tokens: string[];
  // generic
  account_id: string;
  // get_pool_shares_batch
  pool_ids: number[];
  deposit: string;
  token_id: string;
  amount: string;
  referral_id: string;
  // swap actions
  pool_id: number;
  token_in: string;
  amount_in: string;
  token_out: string;
  min_amount_out: string;
}

// =================================================
export type rhea_ammv2_swap_action_type = {
  pool_id: number;
  token_in: string;
  amount_in?: string;
  token_out: string;
  min_amount_out: string;
};

// =================================================
export interface rhea_ammv2_swap_function_args {
  actions: rhea_ammv2_swap_action_type[];
  referral_id: rhea_ammv2_args["referral_id"];
}
// =================================================
// copyright 2026 by sleet.near
