# PACKAGES

This is a **Bun workspace monorepo**. All packages share dependencies and
build with TypeScript.

| package                     | what it is                                            |
| --------------------------- | ----------------------------------------------------- |
| `@near-kit-tool-box/web`    | Browser client (Hot Wallet Connect, localStorage)     |
| `@near-kit-tool-box/env`    | Backend client (`.env` configuration)                  |
| `@near-kit-tool-box/fun`    | Reusable contract functions for common NEAR contracts  |

The repo layout lives in the [`tree`](../tree) file at the repo root — see that
for the folder map and the file naming conventions.

## Package Configuration

Each package's `package.json` includes:

- **Entry points**: `dist/index.js` (main/module), `dist/index.d.ts` (types)
- **files**: Only `dist/**/*`, `README.md`, `LICENSE` are published
- **publishConfig**: `access: public`

## Dependencies

Each package is **independent** with its own `package.json`. Add dependencies
to the specific package that needs them:

```bash
# Add to specific package
cd packages/web && bun add <package>
cd packages/env && bun add <package>
cd packages/fun && bun add <package>

# Add dev dependency
cd packages/web && bun add -d <package>

# Update dependencies
bun update
bun update --latest
```

To update every package at once, run it from the repo root with
`--recursive`:

```bash
bun update --latest --recursive
```

Without `--recursive`, a root-level `bun update` only touches the root
`package.json`'s dependencies and leaves the three packages' own
dependencies alone.

### Common Dependencies by Package

| Package | Key Dependencies                                                     |
| ------- | -------------------------------------------------------------------- |
| **web** | `@hot-labs/near-connect`, `near-kit`, `zod`                          |
| **env** | `near-kit`, `dotenv`                                               |
| **fun** | `near-kit`, `zod` (method consts are vendored in `src/lib/methods/`) |

All packages use:

- **peerDependencies**: `typescript ^7.0.2`
- **devDependencies**: `@types/bun`
- **Build tool**: TypeScript 7 (`tsc --build --force`)
- **Each `tsconfig.json`** has `composite: true`, `incremental: true`, and
  `tsBuildInfoFile: "./.tsbuildinfo"` (build cache lives outside `dist/`)

## Package Dependencies Overview

The `fun` package no longer depends on any external `@sleet-js/*-methods-const`
packages — the method constants are vendored inside
`packages/fun/src/lib/methods/`.

- **@hot-labs/near-connect** - Hot Wallet Connect (web only)
- **near-kit** - Core NEAR protocol client
- **zod** - Runtime type validation (fun only)
- **dotenv** - Environment variable loading (env only)

## Key Concepts

- **web** and **env** both export NEAR client instances configured for their
  respective environments
- **fun** exports contract functions that work with either client
- Contract IDs are network-aware (mainnet/testnet) via helper exports
- All functions use `near-kit` for contract calls

---

==========================
<br/>
copyright 2026 by sleet.near
