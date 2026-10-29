# SETUP

## Install

```bash
bun install
```

## Build

```bash
# All packages (deterministic — each package uses `tsc --build --force`)
bun run build

# Individual packages
bun run build:web
bun run build:env
bun run build:fun
```

## Environment

The `env` package and the bins read their config from a `.env` file in the
repo root:

```bash
cp .env.example .env
```

No `source` needed — dotenv loads `.env` from the cwd automatically.

| var                    | needed for          | values                          |
| ---------------------- | ------------------- | ------------------------------- |
| `NEAR_KIT_NETWORK`     | everything          | `mainnet` or `testnet`          |
| `NEAR_KIT_ACCOUNT_ID`  | the signing bins    | your account id                 |
| `NEAR_KIT_PRIVATE_KEY` | the signing bins    | your full access key            |

The `NEAR_KIT_` prefix keeps these from colliding with the generic `NEAR_*`
vars that the `near-kit` library reads on its own.

## Type Check

```bash
# All packages
bun run typecheck:bin

# One package
cd packages/web && bun run tsc --noEmit
cd packages/env && bun run tsc --noEmit
cd packages/fun && bun run tsc --noEmit
```

## Where things live

The repo layout lives in the [`tree`](../tree) file at the repo root — see
that for the folder map and the file naming conventions.

---

==========================
<br/>
copyright 2026 by sleet.near
