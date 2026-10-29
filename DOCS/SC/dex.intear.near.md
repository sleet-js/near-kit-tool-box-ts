# dex.intear.near

the INTEAR DEX engine smart contract — the host of every INTEAR DEX
sub-dex.

the engine runs each sub-dex as WASM inside itself, keeps the users'
and dexes' inner balances, and exposes the sub-dexes' views through
`dex_view` and their calls through `dex_call`.

---

#### DETAILS

**CONTRACT ID PER NETWORK**

- MAINNET: dex.intear.near
- TESTNET: (none — mainnet only)

```sh
# near cli - get a list of methods
near contract inspect dex.intear.near network-config mainnet now

# the deployed version, pinned to the exact source commit
near contract call-function dex.intear.near contract_source_metadata network-config mainnet now
```

**SOURCE**

- https://github.com/INTEARnear/dex
- the deployed WASM was built from commit
  `fd30f501ec27dbc3239e1529b4ce1d8cf5b5ecff`, version `0.1.0`

**SUB-DEXES**

the sub-dexes are not separate accounts — they are WASM blobs the
engine runs, identified by a `<deployer>/<id>` dex id:

- `slimedragon.near/xyk` — the constant-product AMM (deployed)
- otc — the over-the-counter desk (not deployed)
- simple-amm — the minimal AMM (not deployed)
- minimal — the no-op dex (not deployed)

#### THE `dex_view` ENVELOPE

the engine's own views are plain JSON. a sub-dex view is reached
through `dex_view`, which takes a JSON envelope:

```json
{
  "dex_id": "slimedragon.near/xyk",
  "method": "get_pool_count",
  "args": "<base64 of the borsh-encoded arguments>"
}
```

the response is a base64 string holding the sub-dex's borsh-encoded
result. the method name `swap` is reserved by the engine and rejected
by `dex_view` — swaps go through `swap_simple` or `dex_call`.

#### TYPES

`AssetId` — a string:

- `near` — native NEAR
- `nep141:<contract_id>` — NEP-141 fungible token
- `nep245:<contract_id>:<token_id>` — NEP-245 multi-token
- `nep171:<contract_id>:<token_id>` — NEP-171 NFT

`DexId` — a string, `<deployer>/<id>`.

`AccountOrDexId` — externally tagged:

```json
{ "Account": "alice.near" }
```

```json
{ "Dex": "slimedragon.near/xyk" }
```

all 128-bit amounts are decimal strings in yocto units.

#### FILES

- `packages/fun/src/lib/methods/methods_intear_dex_engine.ts`
- `packages/fun/src/lib/const_id/intear_dex_engine_contract_id_const.ts`
- `packages/fun/src/lib/args/intear_dex_engine_args.ts`
- `packages/fun/src/types/intear_dex_engine_types.ts`
- `packages/fun/src/lib/borsh/` — the borsh codec the sub-dex views use
- `packages/fun/src/fun/intear_dex_engine/` — one file per helper
- `bin/intear_dex_engine/` — one bin per helper
- `bin/intear_dex_engine/README.md`, `bin/intear_dex_xyk/README.md`, `bin/intear_dex_otc/README.md`, `bin/intear_dex_simple_amm/README.md` — the examples and the flags for these bins

==========================
<br/>
copyright 2026 by sleet.near
