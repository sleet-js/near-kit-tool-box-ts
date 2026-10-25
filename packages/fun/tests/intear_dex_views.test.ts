import { describe, expect, test } from "bun:test";
import type { Near } from "near-kit";
import {
  BorshReader,
  BorshWriter,
  base64ToBytes,
  bytesToBase64,
  intear_dex_engine_are_assets_registered_fun_json,
  intear_dex_engine_asset_balance_of_fun_json,
  intear_dex_engine_contract_source_metadata_fun_json,
  intear_dex_engine_dex_storage_balance_of_fun_json,
  intear_dex_engine_get_trusted_code_deployer_fun_json,
  intear_dex_engine_is_paused_fun_json,
  intear_dex_engine_registered_assets_of_fun_json,
  intear_dex_engine_storage_balance_bounds_fun_json,
  intear_dex_engine_storage_balance_of_fun_json,
  intear_dex_engine_total_in_custody_fun_json,
  intear_dex_engine_total_storage_balances_fun_json,
  intear_dex_engine_untracked_near_fun_json,
  intear_dex_otc_get_authorized_key_fun_json,
  intear_dex_otc_get_balance_fun_json,
  intear_dex_otc_is_nonce_used_fun_json,
  intear_dex_otc_storage_balance_of_fun_json,
  intear_dex_simple_amm_get_pool_fun_json,
  intear_dex_xyk_get_community_owned_fees_fun_json,
  intear_dex_xyk_get_fee_discount_signer_fun_json,
  intear_dex_xyk_get_pool_count_fun_json,
  intear_dex_xyk_get_pool_fun_json,
  intear_dex_xyk_get_pool_shares_fun_json,
  intear_dex_xyk_get_pending_fees_fun_json,
  intear_dex_xyk_get_pools_fun_json,
  intear_dex_xyk_pool_needs_upgrade_fun_json,
  intearDexAccountOrDexId,
  parseIntearDexAssetId,
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

/**
 * A mock that answers each `dex_view` call with the borsh bytes the
 * sub-dex would return, so the decoders are exercised end to end.
 */
function mockDexView(
  answers: Record<string, Uint8Array>,
): { near: Near; calls: ViewCall[] } {
  const calls: ViewCall[] = [];
  const near = {
    view: async (contractId: string, method: string, args: unknown) => {
      calls.push({ contractId, method, args });
      if (method !== "dex_view") return undefined;
      const envelope = args as { dex_id: string; method: string; args: string };
      const bytes = answers[envelope.method];
      if (!bytes) throw new Error(`no mock answer for ${envelope.method}`);
      return bytesToBase64(bytes);
    },
  } as unknown as Near;
  return { near, calls };
}

/** The `dex_view` envelope a helper sent, decoded back to its parts. */
function envelopeOf(call: ViewCall | undefined): {
  dex_id: string;
  method: string;
  args: Uint8Array;
} {
  const args = call?.args as { dex_id: string; method: string; args: string };
  return {
    dex_id: args.dex_id,
    method: args.method,
    args: base64ToBytes(args.args),
  };
}
// =================================================

describe("INTEAR DEX engine views", () => {
  test("is_paused and get_trusted_code_deployer read the engine directly", async () => {
    const paused = mockNear(false);
    expect(await intear_dex_engine_is_paused_fun_json(paused.near, "dex.intear.near")).toBe(
      false,
    );
    expect(paused.calls[0]).toEqual({
      contractId: "dex.intear.near",
      method: "is_paused",
      args: {},
    });

    const deployer = mockNear("slimedragon.near");
    expect(
      await intear_dex_engine_get_trusted_code_deployer_fun_json(
        deployer.near,
        "dex.intear.near",
      ),
    ).toBe("slimedragon.near");
  });

  test("asset_balance_of uses the externally tagged AccountOrDexId", async () => {
    const { near, calls } = mockNear("42");
    const result = await intear_dex_engine_asset_balance_of_fun_json(
      near,
      "dex.intear.near",
      { Account: "alice.near" },
      "near",
    );
    expect(calls[0]).toEqual({
      contractId: "dex.intear.near",
      method: "asset_balance_of",
      args: { of: { Account: "alice.near" }, asset_id: "near" },
    });
    expect(result).toBe("42");
  });

  test("registered_assets_of passes account and dex ids separately", async () => {
    const { near, calls } = mockNear([
      ["near", "10"],
      ["nep141:wrap.near", "0"],
    ]);
    const result = await intear_dex_engine_registered_assets_of_fun_json(
      near,
      "dex.intear.near",
      "alice.near",
      null,
      0,
      10,
    );
    expect(calls[0]?.args).toEqual({
      account_id: "alice.near",
      dex_id: null,
      from_index: 0,
      limit: 10,
    });
    expect(result).toHaveLength(2);
    expect(result[0]?.asset_id).toBe("near");
    expect(result[0]?.balance).toBe("10");
  });

  test("are_assets_registered passes the `for` key", async () => {
    const { near, calls } = mockNear(true);
    await intear_dex_engine_are_assets_registered_fun_json(
      near,
      "dex.intear.near",
      ["near"],
      { Dex: "slimedragon.near/xyk" },
    );
    expect(calls[0]?.args).toEqual({
      asset_ids: ["near"],
      for: { Dex: "slimedragon.near/xyk" },
    });
  });

  test("total_in_custody and untracked_near read amounts as strings", async () => {
    const custody = mockNear("1000");
    expect(
      await intear_dex_engine_total_in_custody_fun_json(
        custody.near,
        "dex.intear.near",
        "near",
      ),
    ).toBe("1000");

    const untracked = mockNear("5");
    expect(
      await intear_dex_engine_untracked_near_fun_json(untracked.near, "dex.intear.near"),
    ).toBe("5");
  });

  test("storage balances are typed and keep unknown fields in extra", async () => {
    const balance = mockNear({ total: "100", available: "40", extra_field: 1 });
    const result = await intear_dex_engine_storage_balance_of_fun_json(
      balance.near,
      "dex.intear.near",
      "alice.near",
    );
    expect(balance.calls[0]?.args).toEqual({ account_id: "alice.near" });
    expect(result?.total).toBe("100");
    expect(result?.available).toBe("40");
    expect(result?.extra.extra_field).toBe(1);

    const dexBalance = mockNear({ total: "10", available: "10" });
    await intear_dex_engine_dex_storage_balance_of_fun_json(
      dexBalance.near,
      "dex.intear.near",
      "slimedragon.near/xyk",
    );
    expect(dexBalance.calls[0]?.args).toEqual({ dex_id: "slimedragon.near/xyk" });
  });

  test("storage balance bounds and totals are parsed", async () => {
    const bounds = mockNear({ min: "5000000000000000000000", max: null });
    const boundsResult = await intear_dex_engine_storage_balance_bounds_fun_json(
      bounds.near,
      "dex.intear.near",
    );
    expect(boundsResult.min).toBe("5000000000000000000000");
    expect(boundsResult.max).toBeNull();

    const totals = mockNear({
      users: { total: "20", available: "10" },
      dexes: { total: "50", available: "46" },
    });
    const totalsResult = await intear_dex_engine_total_storage_balances_fun_json(
      totals.near,
      "dex.intear.near",
    );
    expect(totalsResult.users.total).toBe("20");
    expect(totalsResult.dexes.available).toBe("46");
  });

  test("contract source metadata exposes the deployed version", async () => {
    const metadata = mockNear({
      version: "0.1.0",
      link: "https://github.com/INTEARnear/dex/tree/abc",
      standards: [{ standard: "nep330", version: "1.3.0" }],
    });
    const result = await intear_dex_engine_contract_source_metadata_fun_json(
      metadata.near,
      "dex.intear.near",
    );
    expect(result.version).toBe("0.1.0");
    expect(result.standards?.[0]?.standard).toBe("nep330");
  });
});

describe("INTEAR DEX xyk sub-dex views", () => {
  test("get_pool_count decodes the pool count", async () => {
    const { near, calls } = mockDexView({
      get_pool_count: new BorshWriter().u32(302).toBytes(),
    });
    const count = await intear_dex_xyk_get_pool_count_fun_json(
      near,
      "dex.intear.near",
      "slimedragon.near/xyk",
    );
    expect(count).toBe(302);
    expect(envelopeOf(calls[0])).toMatchObject({
      dex_id: "slimedragon.near/xyk",
      method: "get_pool_count",
    });
  });

  test("get_pool decodes a private pool", async () => {
    // PoolView::Private { assets, fees, fee_configuration, owner_id, locked }
    const writer = new BorshWriter();
    writer.u8(1); // Option::Some
    writer.u8(0); // PoolView::Private
    // assets: (AssetWithBalance, AssetWithBalance)
    writer.u8(1).string("wrap.near").u128(1000n); // nep141:wrap.near
    writer.u8(0).u128(2000n); // near
    // fees: CurrentFees { receivers: Vec<(FeeReceiver, FeeFraction)> }
    writer.u32(2);
    writer.u8(0).string("slimedragon.near").u32(15000);
    writer.u8(0).string("plach.intear.near").u32(1000);
    // fee_configuration: FeeConfiguration::V2(V2FeeConfiguration)
    writer.u8(1);
    writer.u32(1);
    writer.u8(0).string("slimedragon.near");
    writer.u8(0).u32(15000); // Fixed
    writer.string("slimedragon.near");
    writer.u8(1); // locked = true

    const { near, calls } = mockDexView({ get_pool: writer.toBytes() });
    const pool = await intear_dex_xyk_get_pool_fun_json(
      near,
      "dex.intear.near",
      "slimedragon.near/xyk",
      7,
    );
    expect(pool?.kind).toBe("Private");
    if (pool?.kind !== "Private") throw new Error("expected a private pool");
    expect(pool.owner_id).toBe("slimedragon.near");
    expect(pool.locked).toBe(true);
    expect(pool.assets[0].asset_id).toBe("nep141:wrap.near");
    expect(pool.assets[0].balance).toBe("1000");
    expect(pool.assets[1].asset_id).toBe("near");
    expect(pool.assets[1].balance).toBe("2000");
    expect(pool.fees.receivers).toEqual([
      [{ Account: "slimedragon.near" }, 15000],
      [{ Account: "plach.intear.near" }, 1000],
    ]);

    // the borsh args are the pool id
    expect(envelopeOf(calls[0]).args).toEqual(new Uint8Array([7, 0, 0, 0]));
  });

  test("get_pool returns null for a missing pool", async () => {
    const { near } = mockDexView({ get_pool: new Uint8Array([0]) });
    const pool = await intear_dex_xyk_get_pool_fun_json(
      near,
      "dex.intear.near",
      "slimedragon.near/xyk",
      999,
    );
    expect(pool).toBeNull();
  });

  test("get_pools decodes a scheduled fee with a nanosecond timestamp", async () => {
    const writer = new BorshWriter();
    writer.u32(1);
    // PoolView::Public { assets, fees, fee_configuration, total_shares }
    writer.u8(1);
    writer.u8(0).u128(500n);
    writer.u8(1).string("wrap.near").u128(900n);
    writer.u32(0); // no fee receivers
    // fee_configuration: FeeConfiguration::V2(V2FeeConfiguration)
    writer.u8(1);
    writer.u32(1);
    writer.u8(0).string("slimedragon.near");
    // FeeAmount::Scheduled { start: (Timestamp, FeeFraction), end: ..., curve }
    writer.u8(1);
    writer.u64(1771599694000000000n).u32(60000);
    writer.u64(1771603294000000000n).u32(15000);
    writer.u8(0); // ScheduledFeeCurve::Linear
    writer.u8(0); // total_shares = None

    const { near } = mockDexView({ get_pools: writer.toBytes() });
    const pools = await intear_dex_xyk_get_pools_fun_json(
      near,
      "dex.intear.near",
      "slimedragon.near/xyk",
      0,
      50,
    );
    const pool = pools[0];
    if (pool?.kind !== "Public") throw new Error("expected a public pool");
    const configuration = pool.fee_configuration;
    if (!("V2" in configuration)) throw new Error("expected a V2 fee configuration");
    const amount = configuration.V2.receivers[0]?.[1];
    expect(amount).toEqual({
      Scheduled: {
        start: ["1771599694000000000", 60000],
        end: ["1771603294000000000", 15000],
        curve: "Linear",
      },
    });
  });

  test("get_pools decodes a list of pools", async () => {    const writer = new BorshWriter();
    writer.u32(1);
    // PoolView::Public { assets, fees, fee_configuration, total_shares }
    writer.u8(1); // PoolView::Public
    writer.u8(0).u128(500n);
    writer.u8(1).string("wrap.near").u128(900n);
    writer.u32(0); // no fee receivers
    writer.u8(0); // FeeConfiguration::V1
    writer.u32(0); // no receivers
    writer.u8(1).u128(1234n); // total_shares = Some(1234)

    const { near, calls } = mockDexView({ get_pools: writer.toBytes() });
    const pools = await intear_dex_xyk_get_pools_fun_json(
      near,
      "dex.intear.near",
      "slimedragon.near/xyk",
      0,
      50,
    );
    expect(pools).toHaveLength(1);
    expect(pools[0]?.kind).toBe("Public");
    if (pools[0]?.kind !== "Public") throw new Error("expected a public pool");
    expect(pools[0].total_shares).toBe("1234");
    expect(pools[0].assets[0].asset_id).toBe("near");
    expect(pools[0].assets[1].asset_id).toBe("nep141:wrap.near");

    // args are start_index + limit
    expect(envelopeOf(calls[0]).args).toEqual(
      new Uint8Array([0, 0, 0, 0, 50, 0, 0, 0]),
    );
  });

  test("get_pool_shares decodes the three share states", async () => {
    const writer = new BorshWriter();
    writer.u32(3);
    writer.u8(0); // None — the pool is not a public pool
    writer.u8(1).u128(0n); // Some(0) — no entry in the share map
    writer.u8(1).u128(987654321n); // Some(shares)

    const { near, calls } = mockDexView({ get_pool_shares: writer.toBytes() });
    const shares = await intear_dex_xyk_get_pool_shares_fun_json(
      near,
      "dex.intear.near",
      "slimedragon.near/xyk",
      [1, 2, 3],
      "alice.near",
    );
    expect(shares).toEqual([
      { shares: null },
      { shares: "0" },
      { shares: "987654321" },
    ]);

    // args are pool_ids then account_id
    const argsReader = new BorshReader(envelopeOf(calls[0]).args);
    expect(argsReader.u32()).toBe(3);
    expect(argsReader.u32()).toBe(1);
    expect(argsReader.u32()).toBe(2);
    expect(argsReader.u32()).toBe(3);
    expect(argsReader.string()).toBe("alice.near");
  });

  test("get_pending_fees decodes the asset id to amount map", async () => {
    const writer = new BorshWriter();
    writer.u32(2);
    writer.u8(0).u128(500n); // near
    writer.u8(1).string("wrap.near").u128(700n); // nep141:wrap.near

    const { near, calls } = mockDexView({ get_pending_fees: writer.toBytes() });
    const fees = await intear_dex_xyk_get_pending_fees_fun_json(
      near,
      "dex.intear.near",
      "slimedragon.near/xyk",
      "alice.near",
      ["near", "nep141:wrap.near"],
    );
    expect(fees).toEqual({ near: "500", "nep141:wrap.near": "700" });

    const args = envelopeOf(calls[0]).args;
    const argsReader = new BorshReader(args);
    expect(argsReader.string()).toBe("alice.near");
    expect(argsReader.u32()).toBe(2);
  });

  test("get_fee_discount_signer decodes the public key", async () => {
    // Option<PublicKey> — Some, then the near-crypto borsh bytes of
    // the key (a tag byte plus the raw key) wrapped in a String.
    const key = new Uint8Array(32).fill(7);
    const inner = new BorshWriter();
    inner.u8(0); // ed25519
    inner.chunksPush(key);
    const bytes = new BorshWriter().u8(1).bytes(inner.toBytes()).toBytes();

    const { near } = mockDexView({ get_fee_discount_signer: bytes });
    const signer = await intear_dex_xyk_get_fee_discount_signer_fun_json(
      near,
      "dex.intear.near",
      "slimedragon.near/xyk",
    );
    expect(signer).toMatch(/^ed25519:/);
  });

  test("get_fee_discount_signer returns null when disabled", async () => {
    const { near } = mockDexView({
      get_fee_discount_signer: new Uint8Array([0]),
    });
    expect(
      await intear_dex_xyk_get_fee_discount_signer_fun_json(
        near,
        "dex.intear.near",
        "slimedragon.near/xyk",
      ),
    ).toBeNull();
  });

  test("get_community_owned_fees and pool_needs_upgrade decode scalars", async () => {
    const community = mockDexView({
      get_community_owned_fees: new BorshWriter().u128(12345n).toBytes(),
    });
    expect(
      await intear_dex_xyk_get_community_owned_fees_fun_json(
        community.near,
        "dex.intear.near",
        "slimedragon.near/xyk",
        "community.near",
      ),
    ).toBe("12345");

    const upgrade = mockDexView({
      pool_needs_upgrade: new Uint8Array([1]),
    });
    expect(
      await intear_dex_xyk_pool_needs_upgrade_fun_json(
        upgrade.near,
        "dex.intear.near",
        "slimedragon.near/xyk",
        0,
      ),
    ).toBe(true);
  });
});

describe("INTEAR DEX otc sub-dex views", () => {
  test("get_balance decodes the internal balance", async () => {
    const { near, calls } = mockDexView({
      get_balance: new BorshWriter().u8(1).u128(900n).toBytes(),
    });
    const balance = await intear_dex_otc_get_balance_fun_json(
      near,
      "dex.intear.near",
      "slimedragon.near/otc",
      "alice.near",
      "near",
    );
    expect(balance).toBe("900");

    const args = envelopeOf(calls[0]).args;
    const argsReader = new BorshReader(args);
    expect(argsReader.string()).toBe("alice.near");
    expect(argsReader.u8()).toBe(0); // AssetId::Near
  });

  test("get_balance returns null for an unknown asset", async () => {
    const { near } = mockDexView({ get_balance: new Uint8Array([0]) });
    expect(
      await intear_dex_otc_get_balance_fun_json(
        near,
        "dex.intear.near",
        "slimedragon.near/otc",
        "alice.near",
        "near",
      ),
    ).toBeNull();
  });

  test("get_authorized_key returns null when no key is authorized", async () => {
    const { near } = mockDexView({ get_authorized_key: new Uint8Array([0]) });
    expect(
      await intear_dex_otc_get_authorized_key_fun_json(
        near,
        "dex.intear.near",
        "slimedragon.near/otc",
        "alice.near",
      ),
    ).toBeNull();
  });

  test("is_nonce_used decodes the boolean", async () => {
    const { near, calls } = mockDexView({ is_nonce_used: new Uint8Array([1]) });
    expect(
      await intear_dex_otc_is_nonce_used_fun_json(
        near,
        "dex.intear.near",
        "slimedragon.near/otc",
        "alice.near",
        "42",
      ),
    ).toBe(true);

    const args = envelopeOf(calls[0]).args;
    const argsReader = new BorshReader(args);
    expect(argsReader.u128()).toBe(42n);
    expect(argsReader.string()).toBe("alice.near");
  });

  test("storage_balance_of decodes total and used", async () => {
    const { near } = mockDexView({
      storage_balance_of: new BorshWriter().u8(1).u128(1000n).u128(400n).toBytes(),
    });
    const balance = await intear_dex_otc_storage_balance_of_fun_json(
      near,
      "dex.intear.near",
      "slimedragon.near/otc",
      "alice.near",
    );
    expect(balance).toEqual({ total: "1000", used: "400" });
  });
});

describe("INTEAR DEX simple-amm sub-dex views", () => {
  test("get_pool decodes the pool and its owner", async () => {
    const writer = new BorshWriter();
    writer.u8(1); // Some
    writer.u8(0).u128(100n); // near
    writer.u8(1).string("wrap.near").u128(200n); // nep141:wrap.near
    writer.string("alice.near");

    const { near, calls } = mockDexView({ get_pool: writer.toBytes() });
    const pool = await intear_dex_simple_amm_get_pool_fun_json(
      near,
      "dex.intear.near",
      "slimedragon.near/simple-amm",
      0,
    );
    expect(pool?.owner_id).toBe("alice.near");
    expect(pool?.assets[0].asset_id).toBe("near");
    expect(pool?.assets[0].balance).toBe("100");
    expect(pool?.assets[1].asset_id).toBe("nep141:wrap.near");
    expect(pool?.assets[1].balance).toBe("200");

    // the borsh args are a u64 pool id
    expect(envelopeOf(calls[0]).args).toEqual(new Uint8Array(8));
  });

  test("get_pool returns null for a missing pool", async () => {
    const { near } = mockDexView({ get_pool: new Uint8Array([0]) });
    expect(
      await intear_dex_simple_amm_get_pool_fun_json(
        near,
        "dex.intear.near",
        "slimedragon.near/simple-amm",
        5,
      ),
    ).toBeNull();
  });
});

describe("INTEAR DEX asset id parsing", () => {
  test("intearDexAccountOrDexId splits accounts from dex ids", () => {
    expect(intearDexAccountOrDexId("alice.near")).toEqual({ Account: "alice.near" });
    expect(intearDexAccountOrDexId("slimedragon.near/xyk")).toEqual({
      Dex: "slimedragon.near/xyk",
    });
  });

  test("parses each asset id kind", () => {
    expect(parseIntearDexAssetId("near")).toEqual({ kind: "near" });
    expect(parseIntearDexAssetId("nep141:wrap.near")).toEqual({
      kind: "nep141",
      contractId: "wrap.near",
    });
    expect(parseIntearDexAssetId("nep245:token.near:1")).toEqual({
      kind: "nep245",
      contractId: "token.near",
      tokenId: "1",
    });
    expect(parseIntearDexAssetId("nep171:token.near:7")).toEqual({
      kind: "nep171",
      contractId: "token.near",
      tokenId: "7",
    });
  });

  test("rejects malformed asset ids", () => {
    expect(() => parseIntearDexAssetId("wrap.near")).toThrow();
    expect(() => parseIntearDexAssetId("nep245:token.near")).toThrow();
    expect(() => parseIntearDexAssetId("nep999:token.near:1")).toThrow();
  });
});
// =================================================
// copyright 2026 by sleet.near
