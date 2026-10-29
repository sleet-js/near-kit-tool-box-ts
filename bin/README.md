# BIN

Runnable examples for every helper in `@near-kit-tool-box/fun`.

One bin per function, grouped into a folder per contract family.
Every bin takes its arguments as CLI flags — nothing is hardcoded.

Each folder has its own README with the examples and the flags for
that family. Start there.

## setup

```sh
cp .env.example .env
# no `source` needed — dotenv loads .env from the cwd automatically
```

`.env` needs `NEAR_KIT_NETWORK` (`mainnet` | `testnet`). View bins
work without a signer; call bins need `NEAR_KIT_ACCOUNT_ID` and
`NEAR_KIT_PRIVATE_KEY`.

## conventions

- `--flag value` and `--flag=value` both work.
- Contract ids default to the per-network id for that contract
  (`ref-finance-101.testnet`, `wrap.testnet`, `hello.sleet.testnet`, ...).
  Pass `--contract-id` to override, or `--tld-contract-id` for the
  registrar in `near/`.
- Amounts are `"<n> NEAR"`, `"<n> yocto"`, or a raw yocto integer.
- A missing flag or an unconfigured signer exits with code `1` and
  prints the usage line.

---

## folders

| folder                    | what it covers                                     | readme                                    |
| ------------------------- | -------------------------------------------------- | ----------------------------------------- |
| `ft/`                     | NEP-141 / NEP-145 fungible tokens                  | [ft/README.md](./ft/README.md)             |
| `hello/`                  | greeting contract                                  | [hello/README.md](./hello/README.md)       |
| `intear_dex_engine/`      | INTEAR DEX engine (`dex.intear.near`)              | [intear_dex_engine/README.md](./intear_dex_engine/README.md) |
| `intear_dex_otc/`         | INTEAR DEX otc sub-dex                            | [intear_dex_otc/README.md](./intear_dex_otc/README.md) |
| `intear_dex_simple_amm/`  | INTEAR DEX simple-amm sub-dex                     | [intear_dex_simple_amm/README.md](./intear_dex_simple_amm/README.md) |
| `intear_dex_xyk/`         | INTEAR DEX xyk sub-dex                            | [intear_dex_xyk/README.md](./intear_dex_xyk/README.md) |
| `near/`                   | registrar + account keys                          | [near/README.md](./near/README.md)         |
| `pool/`                   | staking pools                                     | [pool/README.md](./pool/README.md)         |
| `pumpopoly_world/`        | world game                                        | [pumpopoly_world/README.md](./pumpopoly_world/README.md) |
| `rhea_ammv2/`             | AMM / ref-finance                                 | [rhea_ammv2/README.md](./rhea_ammv2/README.md) |
| `rhea_dclv2/`             | concentrated-liquidity DEX                        | [rhea_dclv2/README.md](./rhea_dclv2/README.md) |
| `sputnik_dao/`            | Sputnik DAO factory + daos                        | [sputnik_dao/README.md](./sputnik_dao/README.md) |
| `wrap_near/`              | wNEAR                                             | [wrap_near/README.md](./wrap_near/README.md) |



==========================
<br/>
copyright 2026 by sleet.near
