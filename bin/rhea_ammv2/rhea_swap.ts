// =================================================
// bin/rhea_ammv2/rhea_swap.ts
//
// Call: submits a swap to the AMM.
//
// Each swap action is described by a set of flags. Actions are chained
// in the order they appear on the command line; repeat the same flags
// to add another action.
//
//   --pool-id <id>            (required for every action)
//   --token-in <id>           (required for the first action)
//   --token-out <id>          (required for every action)
//   --amount-in <raw>         (optional; the contract forwards the
//                              incoming token amount when omitted)
//   --min-amount-out <raw>    (defaults to "0")
//
// Examples:
//
//   # single hop
//   bun run bin/rhea_ammv2/rhea_swap.ts \
//     --pool-id 2459 \
//     --token-in wrap.testnet \
//     --token-out shit-237.factory.v10.meme-cooking.testnet \
//     --amount-in 1000000000000000000000000 \
//     --min-amount-out 0
//
//   # two hops (out of action 1 feeds the next action)
//   bun run bin/rhea_ammv2/rhea_swap.ts \
//     --pool-id 2459 --token-in wrap.testnet \
//     --token-out shit-237.factory.v10.meme-cooking.testnet --min-amount-out 0 \
//     --pool-id 2459 --token-in shit-237.factory.v10.meme-cooking.testnet \
//     --token-out wrap.testnet --min-amount-out 0 \
//     --referral-id ref.huggies.testnet
// =================================================
import type { rhea_ammv2_swap_action_type } from "../../packages/fun/src/index.js";
import { parse_args } from "../_shared/args.js";
import {
  log_result,
  near_kit_env,
  NEAR_KIT_NETWORK,
  rhea_ammv2_contractid,
  require_signer,
  resolve_contract_id,
} from "../_shared/env.js";
import { rhea_ammv2_swap_fun_json } from "../../packages/fun/src/index.js";
// =================================================
const usage =
  "bun run bin/rhea_ammv2/rhea_swap.ts --pool-id <id> --token-in <id> --token-out <id> [--amount-in <raw>] [--min-amount-out <raw>] [--referral-id <id>]";
const args = parse_args();
require_signer(usage);

// =================================================
// Rebuild the action list from the raw flag order.
//
// The flat `args` map cannot hold repeated flags (a second `--token-in`
// overwrites the first), so the action flags are re-read straight from
// argv and collected into per-flag queues. Those queues are then
// consumed in order, so each `--pool-id` opens a new action and the
// following `--token-in` / `--token-out` / `--amount-in` /
// `--min-amount-out` flags fill in that action.

// =================================================
// Per-flag queue of values, in the order they appeared on the command line.
const queues = new Map<string, string[]>();
let pending_flag: string | undefined;
let pending_value: string | undefined;

for (const argv_item of process.argv.slice(2)) {
  if (argv_item.startsWith("--")) {
    const body = argv_item.slice(2);
    const eq = body.indexOf("=");
    const name = eq === -1 ? body : body.slice(0, eq);
    const inline_value = eq === -1 ? undefined : body.slice(eq + 1);
    pending_flag = name;
    pending_value = inline_value;
    if (inline_value !== undefined) {
      const queue = queues.get(name) ?? [];
      queue.push(inline_value);
      queues.set(name, queue);
      pending_flag = undefined;
      pending_value = undefined;
    }
    continue;
  }
  // A bare value belongs to the flag that came right before it.
  if (pending_flag !== undefined && pending_value === undefined) {
    const queue = queues.get(pending_flag) ?? [];
    queue.push(argv_item);
    queues.set(pending_flag, queue);
    pending_flag = undefined;
    pending_value = undefined;
  }
}

// =================================================
// Reads every queued value for a flag, in order.
const take_all = (flag: string): string[] => {
  const queue = queues.get(flag) ?? [];
  const values = [...queue];
  queue.length = 0;
  return values;
};

const actions: rhea_ammv2_swap_action_type[] = [];

// =================================================
// Actions are driven by the `--pool-id` queue; every other action flag
// is consumed one value per action, in command-line order.
const pool_ids = take_all("pool-id");
const token_ins = take_all("token-in");
const token_outs = take_all("token-out");
const amount_ins = take_all("amount-in");
const min_amount_outs = take_all("min-amount-out");

if (pool_ids.length === 0) {
  console.error("error: --pool-id is required");
  console.error(`usage: ${usage}`);
  process.exit(1);
}

for (let i = 0; i < pool_ids.length; i++) {
  const pool_id = Number(pool_ids[i]);
  if (!Number.isFinite(pool_id)) {
    console.error(`error: --pool-id must be a number (got "${pool_ids[i]}")`);
    console.error(`usage: ${usage}`);
    process.exit(1);
  }
  const token_in = token_ins[i];
  const token_out = token_outs[i];
  if (token_in === undefined || token_out === undefined) {
    console.error(
      "error: every swap action needs --pool-id, --token-in and --token-out",
    );
    console.error(`usage: ${usage}`);
    process.exit(1);
  }
  const action: rhea_ammv2_swap_action_type = {
    pool_id: pool_id,
    token_in: token_in,
    token_out: token_out,
    min_amount_out: min_amount_outs[i] ?? "0",
  };
  if (amount_ins[i] !== undefined) action.amount_in = amount_ins[i];
  actions.push(action);
}

if (actions.length === 0) {
  console.error("error: at least one swap action is required");
  console.error(`usage: ${usage}`);
  process.exit(1);
}

const referral_id =
  typeof args["referral-id"] === "string" ? args["referral-id"] : "";
const contract_id = resolve_contract_id(
  typeof args["contract-id"] === "string" ? args["contract-id"] : undefined,
  rhea_ammv2_contractid(NEAR_KIT_NETWORK),
);
// =================================================
log_result(
  `swap ${actions.length} action(s) @ ${contract_id}`,
  await rhea_ammv2_swap_fun_json(
    near_kit_env,
    contract_id,
    actions,
    referral_id,
  ),
);
// =================================================
// copyright 2026 by sleet.near
