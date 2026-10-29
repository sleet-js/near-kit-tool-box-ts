// =================================================
// intear_dex_xyk_decode
//
// Borsh decoders for the INTEAR DEX `xyk` sub-dex view responses.
//
// The shapes mirror `xyk_dex_types` in the INTEAR DEX source:
//   https://github.com/INTEARnear/dex/tree/main/dexes/xyk/types
// =================================================
import { borsh_reader } from "./intear_dex_borsh";
import { read_intear_dex_asset_id } from "./intear_dex_asset_id";
import type {
  INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE,
  INTEAR_DEX_XYK_CURRENT_FEES_TYPE,
  INTEAR_DEX_XYK_FEE_AMOUNT_TYPE,
  INTEAR_DEX_XYK_FEE_CONFIGURATION_TYPE,
  INTEAR_DEX_XYK_FEE_RECEIVER_TYPE,
  INTEAR_DEX_XYK_POOL_TYPE,
  INTEAR_DEX_XYK_POOL_SHARE_TYPE,
} from "../../types/intear_dex_xyk_types";

// =================================================
// Reads a `FeeReceiver`.
export function decode_fee_receiver(
  reader: borsh_reader,
): INTEAR_DEX_XYK_FEE_RECEIVER_TYPE {
  const variant = reader.u8();
  switch (variant) {
    case 0:
      return { Account: reader.string() };
    case 1:
      return "Pool";
    case 2:
      return { Community: reader.string() };
    default:
      throw new Error(
        `intear dex xyk: unknown fee receiver variant ${variant}`,
      );
  }
}

// =================================================
// Reads a `CurrentFees` — the pool's fees at the current block.
export function decode_current_fees(
  reader: borsh_reader,
): INTEAR_DEX_XYK_CURRENT_FEES_TYPE {
  const receivers = reader.vec(
    (item) =>
      [decode_fee_receiver(item), item.u32()] as [
        INTEAR_DEX_XYK_FEE_RECEIVER_TYPE,
        number,
      ],
  );
  return { receivers };
}

// =================================================
// Reads a `FeeAmount` — the v2 per-receiver fee rule.
export function decode_fee_amount(
  reader: borsh_reader,
): INTEAR_DEX_XYK_FEE_AMOUNT_TYPE {
  const variant = reader.u8();
  switch (variant) {
    case 0:
      return { Fixed: reader.u32() };
    case 1: {
      // The schedule's timestamps are nanoseconds since the epoch. They
      // do not fit a JS number, so they stay decimal strings.
      const start: [string, number] = [reader.u64().toString(), reader.u32()];
      const end: [string, number] = [reader.u64().toString(), reader.u32()];
      const curve = reader.u8();
      return {
        Scheduled: {
          start,
          end,
          curve: curve === 0 ? "Linear" : (String(curve) as "Linear"),
        },
      };
    }
    case 2:
      return { Dynamic: { min: reader.u32(), max: reader.u32() } };
    default:
      throw new Error(`intear dex xyk: unknown fee amount variant ${variant}`);
  }
}

// =================================================
// Reads a `FeeConfiguration`.
export function decode_fee_configuration(
  reader: borsh_reader,
): INTEAR_DEX_XYK_FEE_CONFIGURATION_TYPE {
  const variant = reader.u8();
  switch (variant) {
    case 0:
      return { V1: decode_current_fees(reader) };
    case 1: {
      const receivers = reader.vec(
        (item) =>
          [decode_fee_receiver(item), decode_fee_amount(item)] as [
            INTEAR_DEX_XYK_FEE_RECEIVER_TYPE,
            INTEAR_DEX_XYK_FEE_AMOUNT_TYPE,
          ],
      );
      return { V2: { receivers } };
    }
    default:
      throw new Error(
        `intear dex xyk: unknown fee configuration variant ${variant}`,
      );
  }
}

// =================================================
// Reads an `AssetWithBalance`.
export function decode_asset_with_balance(
  reader: borsh_reader,
): INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE {
  const asset_id = read_intear_dex_asset_id(reader);
  const balance = reader.u128().toString();
  return { asset_id: asset_id, balance };
}

// =================================================
// Reads a `PoolView`.
export function decode_pool_view(
  reader: borsh_reader,
): INTEAR_DEX_XYK_POOL_TYPE {
  const variant = reader.u8();
  switch (variant) {
    case 0: {
      // Private
      const assets = [
        decode_asset_with_balance(reader),
        decode_asset_with_balance(reader),
      ] as [
        INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE,
        INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE,
      ];
      const fees = decode_current_fees(reader);
      const fee_configuration = decode_fee_configuration(reader);
      const owner_id = reader.string();
      const locked = reader.u8() === 1;
      return {
        kind: "Private",
        assets,
        fees,
        fee_configuration: fee_configuration,
        owner_id: owner_id,
        locked,
      };
    }
    case 1: {
      // Public
      const assets = [
        decode_asset_with_balance(reader),
        decode_asset_with_balance(reader),
      ] as [
        INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE,
        INTEAR_DEX_XYK_ASSET_WITH_BALANCE_TYPE,
      ];
      const fees = decode_current_fees(reader);
      const fee_configuration = decode_fee_configuration(reader);
      const total_shares = reader.option((item) => item.u128().toString());
      return {
        kind: "Public",
        assets,
        fees,
        fee_configuration: fee_configuration,
        total_shares: total_shares,
      };
    }
    case 2: {
      // Launch
      const near_amount = reader.u128().toString();
      const launched_asset = decode_asset_with_balance(reader);
      const fees = decode_current_fees(reader);
      const fee_configuration = decode_fee_configuration(reader);
      const phantom_liquidity_near = reader.u128().toString();
      return {
        kind: "Launch",
        near_amount: near_amount,
        launched_asset: launched_asset,
        fees,
        fee_configuration: fee_configuration,
        phantom_liquidity_near: phantom_liquidity_near,
      };
    }
    case 3: {
      // LaunchV2
      const quote_asset = decode_asset_with_balance(reader);
      const launched_asset = decode_asset_with_balance(reader);
      const fees = decode_current_fees(reader);
      const fee_configuration = decode_fee_configuration(reader);
      const phantom_liquidity = reader.u128().toString();
      return {
        kind: "LaunchV2",
        quote_asset: quote_asset,
        launched_asset: launched_asset,
        fees,
        fee_configuration: fee_configuration,
        phantom_liquidity: phantom_liquidity,
      };
    }
    default:
      throw new Error(`intear dex xyk: unknown pool view variant ${variant}`);
  }
}

// =================================================
// Reads one element of the `Vec<Option<U128>>` that
// `get_pool_shares` returns.
// The dex answers with one `Option` per pool:
//   - `None`    — the pool is not a public pool, so it has no
//                 per-account share map at all
//   - `Some(n)` — the account holds `n` shares in that pool. `n` is
//                 zero when the account has no entry in the pool's
//                 share map.
export function decode_pool_share(
  reader: borsh_reader,
): INTEAR_DEX_XYK_POOL_SHARE_TYPE {
  if (reader.u8() === 0) return { shares: null };
  return { shares: reader.u128().toString() };
}
// =================================================
// copyright 2026 by sleet.near
