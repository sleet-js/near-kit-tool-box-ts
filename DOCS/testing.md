# TESTING

There is no unit test suite. The bins in `bin/` are the test harness — they
call the helpers against the live network, so they double as the integration
tests for each contract family.

Runnable scripts are in `bin/` — one per `fun` helper, grouped by contract
family. Every bin takes CLI flags; see [`bin/README.md`](../bin/README.md) and
the README inside each bin folder.

Run them individually, as needed. View bins are read-only and need no signer.
Call bins submit real transactions — run those only when you intend to.

## Setup

```bash
cp .env.example .env
```

See [setup.md](./setup.md) for the env vars.

## Running the bins

```bash
# View bins need no signer
bun run bin/hello/hello_get.ts
bun run bin/ft/ft_metadata.ts --contract-id shit-237.factory.v10.meme-cooking.testnet
bun run bin/rhea_ammv2/rhea_get_pools.ts --from-index 0 --limit 10

# Call bins need a signer (see .env.example) and send real transactions
bun run bin/hello/hello_set.ts --greeting "Hello from near kit"

# Run a single helper
bun run bin/intear_dex_engine/intear_dex_engine_balances.ts \
  --account-id slimedragon.near --limit 10
```

## Conventions

- `--flag value` and `--flag=value` both work.
- Contract ids default to the per-network id for that contract
  (`ref-finance-101.testnet`, `wrap.testnet`, `hello.sleet.testnet`, ...).
  Pass `--contract-id` to override, or `--tld-contract-id` for the registrar
  in `near/`.
- Amounts are `"<n> NEAR"`, `"<n> yocto"`, or a raw yocto integer.
- A missing flag or an unconfigured signer exits with code `1` and prints the
  usage line.

## Type-checking the bins

```bash
# No network access
bun run typecheck:bin
```

---

==========================
<br/>
copyright 2026 by sleet.near
