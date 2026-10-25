import { describe, expect, test } from "bun:test";
import { NEAR_KIT_NETWORK, near_kit_env } from "../../env/src/index.js";
import {
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
  intear_dex_xyk_get_fee_discount_signer_fun_json,
  intear_dex_xyk_get_pool_count_fun_json,
  intear_dex_xyk_get_pool_fun_json,
  intear_dex_xyk_get_pool_shares_fun_json,
  intear_dex_xyk_get_pending_fees_fun_json,
  intear_dex_xyk_get_pools_fun_json,
  intear_dex_xyk_pool_needs_upgrade_fun_json,
} from "../src/index.js";
// =================================================
// Live mainnet checks for the INTEAR DEX engine and its
// xyk sub-dex.
//
// These hit `dex.intear.near` on mainnet. They are read-only, so
// they are safe to run, but they need network access.
// =================================================

const ENGINE = "dex.intear.near";
const XYK = "slimedragon.near/xyk";

// The INTEAR DEX is deployed on mainnet only, so these live tests
// only run with NEAR_KIT_NETWORK=mainnet.
const ON_MAINNET = NEAR_KIT_NETWORK === "mainnet";
const liveDescribe = ON_MAINNET ? describe : describe.skip;

liveDescribe("INTEAR DEX engine on mainnet", () => {
  test("reads the engine state", async () => {
    expect(await intear_dex_engine_is_paused_fun_json(near_kit_env, ENGINE)).toBe(false);
    expect(
      await intear_dex_engine_get_trusted_code_deployer_fun_json(near_kit_env, ENGINE),
    ).toBe("slimedragon.near");

    const metadata = await intear_dex_engine_contract_source_metadata_fun_json(
      near_kit_env,
      ENGINE,
    );
    expect(metadata.version).toBe("0.1.0");
    expect(metadata.link).toContain("INTEARnear/dex");
  });

  test("reads the custody and storage balances", async () => {
    const custody = await intear_dex_engine_total_in_custody_fun_json(
      near_kit_env,
      ENGINE,
      "near",
    );
    expect(typeof custody).toBe("string");

    const untracked = await intear_dex_engine_untracked_near_fun_json(
      near_kit_env,
      ENGINE,
    );
    expect(typeof untracked).toBe("string");

    const totals = await intear_dex_engine_total_storage_balances_fun_json(
      near_kit_env,
      ENGINE,
    );
    expect(typeof totals.users.total).toBe("string");
    expect(typeof totals.dexes.available).toBe("string");

    const bounds = await intear_dex_engine_storage_balance_bounds_fun_json(
      near_kit_env,
      ENGINE,
    );
    expect(bounds.min).toBe("5000000000000000000000");
  });

  test("reads an account's inner balances", async () => {
    const balance = await intear_dex_engine_asset_balance_of_fun_json(
      near_kit_env,
      ENGINE,
      { Account: "slimedragon.near" },
      "near",
    );
    expect(typeof balance).toBe("string");

    const registered = await intear_dex_engine_registered_assets_of_fun_json(
      near_kit_env,
      ENGINE,
      "slimedragon.near",
      null,
      0,
      5,
    );
    expect(Array.isArray(registered)).toBe(true);
    for (const asset of registered) {
      expect(typeof asset.asset_id).toBe("string");
      expect(typeof asset.balance).toBe("string");
    }

    const areRegistered = await intear_dex_engine_are_assets_registered_fun_json(
      near_kit_env,
      ENGINE,
      ["near"],
      { Account: "slimedragon.near" },
    );
    expect(typeof areRegistered).toBe("boolean");

    const storage = await intear_dex_engine_storage_balance_of_fun_json(
      near_kit_env,
      ENGINE,
      "slimedragon.near",
    );
    expect(storage === null || typeof storage.total === "string").toBe(true);

    const dexStorage = await intear_dex_engine_dex_storage_balance_of_fun_json(
      near_kit_env,
      ENGINE,
      XYK,
    );
    expect(dexStorage === null || typeof dexStorage.total === "string").toBe(true);
  });
});

liveDescribe("INTEAR DEX xyk sub-dex on mainnet", () => {
  test("reads the pool count and the first pools", async () => {
    const count = await intear_dex_xyk_get_pool_count_fun_json(
      near_kit_env,
      ENGINE,
      XYK,
    );
    expect(count).toBeGreaterThan(0);

    const pools = await intear_dex_xyk_get_pools_fun_json(
      near_kit_env,
      ENGINE,
      XYK,
      0,
      5,
    );
    expect(pools.length).toBeGreaterThan(0);
    expect(pools.length).toBeLessThanOrEqual(5);

    for (const pool of pools) {
      expect(["Private", "Public", "Launch", "LaunchV2"]).toContain(pool.kind);
      if (pool.kind === "Private" || pool.kind === "Public") {
        expect(pool.assets).toHaveLength(2);
        expect(typeof pool.assets[0].balance).toBe("string");
        expect(Array.isArray(pool.fees.receivers)).toBe(true);
      }
    }
  });

  test("reads a single pool", async () => {
    const pool = await intear_dex_xyk_get_pool_fun_json(near_kit_env, ENGINE, XYK, 0);
    expect(pool).not.toBeNull();
    expect(pool?.kind).toBeDefined();
  });

  test("reads the LP shares of an account", async () => {
    const shares = await intear_dex_xyk_get_pool_shares_fun_json(
      near_kit_env,
      ENGINE,
      XYK,
      [0, 1, 2],
      "slimedragon.near",
    );
    expect(shares).toHaveLength(3);
    for (const share of shares) {
      expect(share.shares === null || typeof share.shares === "string").toBe(true);
    }
  });

  test("reads the pending fees of an account", async () => {
    const fees = await intear_dex_xyk_get_pending_fees_fun_json(
      near_kit_env,
      ENGINE,
      XYK,
      "slimedragon.near",
      ["near"],
    );
    expect(typeof fees).toBe("object");
    for (const amount of Object.values(fees)) {
      expect(typeof amount).toBe("string");
    }
  });

  test("reads the fee discount signer and the upgrade flags", async () => {
    const signer = await intear_dex_xyk_get_fee_discount_signer_fun_json(
      near_kit_env,
      ENGINE,
      XYK,
    );
    expect(signer === null || signer.startsWith("ed25519:")).toBe(true);

    const needsUpgrade = await intear_dex_xyk_pool_needs_upgrade_fun_json(
      near_kit_env,
      ENGINE,
      XYK,
      0,
    );
    expect(typeof needsUpgrade).toBe("boolean");
  });
});
// =================================================
// copyright 2026 by sleet.near
