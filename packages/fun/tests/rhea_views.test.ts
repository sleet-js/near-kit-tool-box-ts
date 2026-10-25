import { describe, expect, test } from "bun:test";
import type { Near } from "near-kit";
import {
  rhea_ammv2_get_account_basic_info_fun_json,
  rhea_ammv2_get_deposit_fun_json,
  rhea_ammv2_get_pool_share_price_fun_json,
  rhea_ammv2_get_pool_shares_fun_json,
  rhea_ammv2_get_pool_total_shares_fun_json,
  rhea_ammv2_metadata_fun_json,
  rhea_dclv2_get_liquidity_fun_json,
  rhea_dclv2_get_metadata_fun_json,
  rhea_dclv2_get_pool_fun_json,
  rhea_dclv2_get_pools_fun_json,
  rhea_dclv2_get_user_asset_fun_json,
  rhea_dclv2_list_liquidities_fun_json,
  rhea_dclv2_list_pools_fun_json,
  rhea_dclv2_list_user_assets_fun_json,
} from "../src/index.js";
// =================================================

type ViewCall = {
  contractId: string;
  method: string;
  args: unknown;
};

function mockNear(result: unknown): { near: Near; calls: ViewCall[] } {
  const calls: ViewCall[] = [];
  const near = {
    view: async (contractId: string, method: string, args: unknown) => {
      calls.push({ contractId, method, args });
      return result;
    },
  } as unknown as Near;
  return { near, calls };
}

const pool = {
  pool_id: "wrap.near|usdc.near|2000",
  token_x: "wrap.near",
  token_y: "usdc.near",
  fee: 2000,
  point_delta: 40,
  current_point: 288900,
  liquidity: "1000",
  liquidity_x: "2000",
  max_liquidity_per_point: "5000",
  total_x: "3000",
  total_y: "4000",
  total_liquidity: "5000",
  total_order_x: "10",
  total_order_y: "20",
  volume_x_in: "30",
  volume_x_out: "40",
  volume_y_in: "50",
  volume_y_out: "60",
  total_fee_x_charged: "1",
  total_fee_y_charged: "2",
  state: "ACTIVE",
  token_x_metadata: { decimals: 24 },
};

const liquidity = {
  lpt_id: "wrap.near|usdc.near|2000#1",
  owner_id: "alice.near",
  pool_id: "wrap.near|usdc.near|2000",
  left_point: 288800,
  right_point: 289000,
  amount: "1000",
  unclaimed_fee_x: "2",
};
// =================================================

describe("Rhea DCL v2 typed views", () => {
  test("get_pool uses the pool id and preserves extra fields", async () => {
    const { near, calls } = mockNear(pool);
    const result = await rhea_dclv2_get_pool_fun_json(
      near,
      "dcl.testnet",
      pool.pool_id,
    );
    expect(calls[0]).toEqual({
      contractId: "dcl.testnet",
      method: "get_pool",
      args: { pool_id: pool.pool_id },
    });
    expect(result.extra).toEqual({ token_x_metadata: pool.token_x_metadata });
  });

  test("list_pools passes pagination", async () => {
    const { near, calls } = mockNear([pool]);
    const result = await rhea_dclv2_list_pools_fun_json(
      near,
      "dcl.testnet",
      10,
      25,
    );
    expect(calls[0]?.args).toEqual({ from_index: 10, limit: 25 });
    expect(result).toHaveLength(1);
  });

  test("get_pools passes pool ids", async () => {
    const { near, calls } = mockNear([pool]);
    await rhea_dclv2_get_pools_fun_json(near, "dcl.testnet", [pool.pool_id]);
    expect(calls[0]?.args).toEqual({ pool_ids: [pool.pool_id] });
  });

  test("get_liquidity and list_liquidities are typed", async () => {
    const one = mockNear(liquidity);
    const oneResult = await rhea_dclv2_get_liquidity_fun_json(
      one.near,
      "dcl.testnet",
      liquidity.lpt_id,
    );
    expect(one.calls[0]?.args).toEqual({ lpt_id: liquidity.lpt_id });
    expect(oneResult.extra.unclaimed_fee_x).toBe("2");

    const many = mockNear([liquidity]);
    await rhea_dclv2_list_liquidities_fun_json(
      many.near,
      "dcl.testnet",
      "alice.near",
      0,
      100,
    );
    expect(many.calls[0]?.args).toEqual({
      account_id: "alice.near",
      from_index: 0,
      limit: 100,
    });
  });

  test("internal balance views use account and token ids", async () => {
    const one = mockNear({ token_id: "wrap.near", balance: "42" });
    const oneResult = await rhea_dclv2_get_user_asset_fun_json(
      one.near,
      "dcl.testnet",
      "alice.near",
      "wrap.near",
    );
    expect(one.calls[0]?.args).toEqual({
      account_id: "alice.near",
      token_id: "wrap.near",
    });
    expect(oneResult.balance).toBe("42");

    const many = mockNear({ "wrap.near": "42" });
    await rhea_dclv2_list_user_assets_fun_json(
      many.near,
      "dcl.testnet",
      "alice.near",
    );
    expect(many.calls[0]?.args).toEqual({ account_id: "alice.near" });
  });

  test("metadata exposes protocol fee rate", async () => {
    const { near, calls } = mockNear({
      protocol_fee_rate: 1000,
      protocol_fee_receiver: "treasury.near",
    });
    const result = await rhea_dclv2_get_metadata_fun_json(near, "dcl.testnet");
    expect(calls[0]?.method).toBe("get_metadata");
    expect(result.protocol_fee_rate).toBe(1000);
    expect(result.extra.protocol_fee_receiver).toBe("treasury.near");
  });
});
// =================================================

describe("Rhea AMM v2 typed views", () => {
  test("internal balance and LP share views pass expected args", async () => {
    const deposit = mockNear("42");
    await rhea_ammv2_get_deposit_fun_json(
      deposit.near,
      "amm.testnet",
      "alice.near",
      "wrap.near",
    );
    expect(deposit.calls[0]).toEqual({
      contractId: "amm.testnet",
      method: "get_deposit",
      args: { account_id: "alice.near", token_id: "wrap.near" },
    });

    const shares = mockNear("100");
    await rhea_ammv2_get_pool_shares_fun_json(
      shares.near,
      "amm.testnet",
      1,
      "alice.near",
    );
    expect(shares.calls[0]?.args).toEqual({
      pool_id: 1,
      account_id: "alice.near",
    });

    const total = mockNear("1000");
    await rhea_ammv2_get_pool_total_shares_fun_json(
      total.near,
      "amm.testnet",
      1,
    );
    expect(total.calls[0]?.args).toEqual({ pool_id: 1 });

    const price = mockNear(["1", "2"]);
    await rhea_ammv2_get_pool_share_price_fun_json(
      price.near,
      "amm.testnet",
      1,
    );
    expect(price.calls[0]?.args).toEqual({ pool_id: 1 });
  });

  test("account info and metadata preserve contract-specific fields", async () => {
    const info = mockNear({
      account_id: "alice.near",
      registered_tokens: ["wrap.near"],
      storage_usage: 10,
      extra_contract_field: "kept",
    });
    const infoResult = await rhea_ammv2_get_account_basic_info_fun_json(
      info.near,
      "amm.testnet",
      "alice.near",
    );
    expect(infoResult.extra.extra_contract_field).toBe("kept");

    const metadata = mockNear({
      name: "Ref Finance",
      symbol: "REF",
      version: "2.0.0",
      custom: true,
    });
    const metadataResult = await rhea_ammv2_metadata_fun_json(
      metadata.near,
      "amm.testnet",
    );
    expect(metadataResult.name).toBe("Ref Finance");
    expect(metadataResult.extra.custom).toBe(true);
  });
});
// =================================================
// copyright 2026 by sleet.near
