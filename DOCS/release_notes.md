# RELEASE NOTES

The notes for the next release. Every breaking change to the public API of
`@near-kit-tool-box/fun` is listed here.

---

## v0.3.0 — the INTEAR DEX borsh codec moved to `@zorsh/zorsh`

The hand-rolled borsh codec is replaced by
[`@zorsh/zorsh`](https://www.npmjs.com/package/@zorsh/zorsh) — the NEAR org's
(`r-near`) TypeScript-first borsh library, pinned to `0.5.2`.

The schema is now the type: `b.infer` reads the decoded shape straight off the
schema, so there is no hand-written TypeScript interface that can drift away
from the wire format.

### BREAKING — the 128-bit amounts are `bigint`s

The INTEAR DEX sub-dex views carried their u128 amounts as **decimal strings**.
They are now `bigint`s — Zorsh's native form for a u128, so no amount is ever
rounded through a JS number.

```ts
// before
const balance: string = pool.assets[0].balance;

// after
const balance: bigint = pool.assets[0].balance;
```

This affects `INTEAR_DEX_XYK_*`, `INTEAR_DEX_OTC_*` and
`INTEAR_DEX_SIMPLE_AMM_*` types.

### BREAKING — the enum variants are tagged objects

The decoded values report a Rust enum as the variant's payload, without a
repeating `kind` field. The pool kind is the variant tag, so a pool reads as
`{ Public: { ... } }`.

```ts
// before
if (pool.kind === "Public") {
  const total = pool.total_shares;
}

// after
if ("Public" in pool) {
  const total = pool.total_shares;
}
```

The same applies to the fee receiver (`{ Account: "..." }`, `{ Pool: {} }`,
`{ Community: "..." }`), the fee amount (`{ Fixed: 100 }`,
`{ Scheduled: { ... } }`, `{ Dynamic: { ... } }`) and the fee configuration
(`{ V1: { ... } }`, `{ V2: { ... } }`).

The fee receiver's `Pool` variant used to be the bare string `"Pool"`; it is
now `{ Pool: {} }`, so every variant has the same shape.

### BREAKING — the asset id is its decoded form

The asset id used to be the string form (`"near"`, `"nep141:ft.near"`); it is
now the decoded borsh form (`{ Near: {} }`, `{ Nep141: "ft.near" }`).

`intear_dex_asset_id_from_decoded` turns it back into the string form.

### BREAKING — `borsh_reader` and `borsh_writer` are gone

The two hand-rolled codec classes were removed. Use a `@zorsh/zorsh` schema
instead:

```ts
import { b } from "@zorsh/zorsh";

const PoolSchema = b.struct({ name: b.string(), balance: b.u128() });
const bytes = PoolSchema.serialize({ name: "x", balance: 1n });
const value = PoolSchema.deserialize(bytes);
```

`base58_encode`, `base64_to_bytes` and `bytes_to_base64` are unchanged — they
are not borsh and Zorsh does not replace them.

### BREAKING — the pending fees are a `Map`

`INTEAR_DEX_XYK_PENDING_FEES_TYPE` was a `Record<string, string>`. It is now a
`Map<AssetId, bigint>`, keyed by the decoded asset id.

```ts
// before
for (const [asset_id, amount] of Object.entries(fees)) {
  /* ... */
}

// after
for (const [asset_id, amount] of fees) {
  /* ... */
}
```

The map is in the canonical Rust `Ord` order — Rust writes a `HashMap` sorted,
so the entries come back the way Rust produced them.

### BREAKING — the public key is its raw bytes

`INTEAR_DEX_OTC_AUTHORIZED_KEY_TYPE` and
`intear_dex_xyk_get_fee_discount_signer_fun_json` returned the
`ed25519:<base58>` string. They now return the raw borsh bytes of the
near-crypto `PublicKey`.

`intear_dex_public_key_to_string` turns them back into the string form.

### Added

- `intear_dex_public_key_to_string` — the near-crypto public key string form
- `intear_dex_asset_id_to_decoded` and `intear_dex_asset_id_from_decoded` — the
  asset id's string form and its decoded form

### Fixed — a malformed value is now refused

The old codec read the boolean views as `u8() === 1`, so a byte that was
neither `0` nor `1` silently became `false`. Zorsh's `bool` refuses it, and
an unknown enum variant is refused too — the same behaviour the `fee amount`
decoder was already given.

### Added — a dependency

`@near-kit-tool-box/fun` now depends on `@zorsh/zorsh` (`0.5.2`, pinned to an
exact version — the library is young and its API may still move).

---

==========================
<br/>
copyright 2026 by sleet.near
