# @near-kit-tool-box Development Guide

## Project Structure

```
near-kit-tool-box/
├── packages/
│   ├── web/        # Browser client (Hot Wallet Connect, localStorage)
│   ├── env/        # Backend client (.env configuration)
│   └── fun/        # Reusable contract functions
│       └── src/
│           ├── index.ts                        # Public barrel
│           ├── fun/<contract>/<contract>_<method>_fun_json.ts   # one folder per contract, one file per function
│           ├── lib/methods/methods_<contract>.ts               # method-name constants (one file per contract)
│           ├── lib/const_id/<contract>_contract_id_const.ts    # testnet/mainnet contract id pairs + `*_contractid(network)` resolver
│           ├── lib/args/<contract>_args.ts                     # parameter type maps
│           └── types/<contract>_<response>_type.ts             # response type definitions
├── bin/            # CLI test scripts
├── scripts/        # Development utilities (version sync)
├── DOCS/SC/        # Per-contract documentation, one .md per smart contract
└── package.json    # Root workspace config
```

This is a **Bun workspace monorepo**. All packages share dependencies and build with TypeScript.

---

## Setup

```bash
# Install all dependencies
bun install

# Build all packages
bun run build
```

---

## Development Workflow

### Build

```bash
# All packages (deterministic — each package uses `tsc --build --force`)
bun run build

# Individual packages
bun run build:web
bun run build:env
bun run build:fun
```

### Clean & Rebuild

`tsc` does not delete stale output files when a source file is removed. Use `clean` (or `rebuild`) to guarantee a 1:1 match between `src/` and `dist/` before publishing.

```bash
# Wipe dist/ and .tsbuildinfo in every package
bun run clean

# clean + build — recommended before publish:all
bun run rebuild
```

> **Why `--force`?** TypeScript 7.0's `tsc --build` trusts `.tsbuildinfo` and may
> skip emitting files when the cache is stale (e.g. you deleted `dist/` manually
> or after `clean`). The `--force` flag ignores the cache and re-emits everything.
> Each package's `build` script prepends `rm -f .tsbuildinfo` for extra safety,
> so `bun run rebuild` always produces fresh, complete output.
>
> The `.tsbuildinfo` file lives at each package root (not inside `dist/`), so it
> is **not** included in the published npm tarball — only the `dist/` content
> is shipped.

### Verifying `src/` matches `dist/`

After any change, confirm no orphan files remain:

```bash
for p in packages/*/; do
  cd "$p"
  diff <(find src -type f \( -name "*.ts" -o -name "*.tsx" \) | sed -E 's|^src/||; s/\.(ts|tsx)$//' | sort -u) \
       <(find dist -type f \( -name "*.js" -o -name "*.d.ts" \) ! -name "*.map" | sed -E 's|^dist/||; s/\.(js|d\.ts)$//' | sort -u) \
    && echo "$p OK" || echo "$p MISMATCH"
  cd -
done
```

A non-empty diff means something in `dist/` no longer has a source. Run `bun
run rebuild` to fix.

### Type Check

```bash
cd packages/web && bun run tsc --noEmit
cd packages/env && bun run tsc --noEmit
cd packages/fun && bun run tsc --noEmit
```

---

## Version Synchronization

Keep all packages at the same version with the version sync utility.

### Check Version Status (Dry Run)

```bash
# See which packages need version updates (no files modified)
bun run version:dry-run
```

### Sync All Package Versions

```bash
# Patch bump (default): 0.0.1 -> 0.0.2
bun run version:sync

# Minor bump: 0.0.1 -> 0.1.0
bun run version:sync minor

# Major bump: 0.0.1 -> 1.0.0
bun run version:sync major

# Set specific version
bun run version:sync 1.2.3
```

### How It Works

1. Scans all workspace packages (`packages/*`)
2. Finds the highest version across all packages
3. Bumps all packages to the next version (or sets to specified version)
4. Updates each package's `package.json` automatically

### Version Bump Types

- **patch**: Increments patch version (0.0.1 → 0.0.2) - _default_
- **minor**: Increments minor version, resets patch (0.0.1 → 0.1.0)
- **major**: Increments major version, resets minor/patch (0.0.1 → 1.0.0)

### Typical Workflow

```bash
# 1. Check current state
bun run version:dry-run

# 2. Sync versions (patch bump)
bun run version:sync

# 3. Review changes
git diff

# 4. Commit
git commit -m 'chore: bump all packages to v0.0.2'

# 5. Build and publish
bun run rebuild
bun run publish:all
```

---

## Adding Dependencies

Each package is **independent** with its own `package.json`. Add dependencies to the specific package that needs them:

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

### Common Dependencies by Package

| Package | Key Dependencies                                                     |
| ------- | -------------------------------------------------------------------- |
| **web** | `@hot-labs/near-connect`, `near-kit`, `zod`                          |
| **env** | `near-kit`, `dotenv`, `zod`                                          |
| **fun** | `near-kit`, `zod` (method consts are vendored in `src/lib/methods/`) |

All packages use:

- **peerDependencies**: `typescript ^7.0.2`
- **devDependencies**: `@types/bun`
- **Build tool**: TypeScript 7 (`tsc --build --force`)
- **Each `tsconfig.json`** has `composite: true`, `incremental: true`, and
  `tsBuildInfoFile: "./.tsbuildinfo"` (build cache lives outside `dist/`)

---

## Package Configuration

Each package's `package.json` includes:

- **Entry points**: `dist/index.js` (main/module), `dist/index.d.ts` (types)
- **files**: Only `dist/**/*`, `README.md`, `LICENSE` are published
- **publishConfig**: `access: public`

### TypeScript

Each package compiles with **`tsc --build --force`** (TypeScript 7 build mode)
via `tsconfig.json`. Key settings:

| Option            | Value              | Why                                                                                      |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------------- |
| `composite`       | `true`             | Enables project-reference-aware incremental builds and `.d.ts` emission.                 |
| `incremental`     | `true`             | Reads/writes the `.tsbuildinfo` cache for skip-unchanged-file speedups.                  |
| `tsBuildInfoFile` | `"./.tsbuildinfo"` | Keeps the build cache **outside `dist/`** so it doesn't leak into the published tarball. |
| `rootDir`         | `"./src"`          | Required in TS 7; pins the input tree.                                                   |
| `outDir`          | `"./dist"`         | Standard output location.                                                                |

`scripts.clean` runs `tsc --build --clean` then `rm -rf dist .tsbuildinfo` so
that any source file removed since the last build is also removed from `dist/`.

### Why the build script prefix is `rm -f .tsbuildinfo && …`

In TS 7.0, `tsc --build` will report a project as "up to date" if its
`.tsbuildinfo` claims outputs are newer than inputs — even when `dist/` was
manually deleted. The defensive `rm -f` plus `--force` flag sidesteps this by
forcing a full re-emit every time, which makes `bun run build` deterministic
and safe to run as part of `bun run publish:all`.

---

## Testing

Runnable scripts are in `bin/` — one per `fun` helper, grouped by
contract family. Every bin takes CLI flags; see `bin/README.md`.

Run them individually, as needed. View bins are read-only and need no
signer. Call bins submit real transactions — run those only when you
intend to.

```bash
# View bins need no signer
bun run bin/hello/hello_get.ts
bun run bin/ft/ft_metadata.ts --contract-id shit-237.factory.v10.meme-cooking.testnet
bun run bin/rhea_ammv2/rhea_get_pools.ts --from-index 0 --limit 10

# Call bins need a signer (see .env.example) and send real transactions
bun run bin/hello/hello_set.ts --greeting "Hello from near kit"

# Type-check the bins (no network access)
bun run typecheck:bin
```

### Unit tests

`packages/fun/tests/` holds the `bun:test` suites. They mock the
`Near` client, so they need no network access.

```bash
bun test packages/fun/tests/
```

### Live tests

A suite named `*_live.test.ts` hits a real network. It reads
`NEAR_KIT_NETWORK` and skips itself when the contract it needs is not
on that network — the INTEAR DEX, for instance, is mainnet only.

```bash
NEAR_KIT_NETWORK=mainnet bun test packages/fun/tests/intear_dex_live.test.ts
```

---

## Package Dependencies Overview

The `fun` package no longer depends on any external `@sleet-js/*-methods-const`
packages — the method constants are vendored inside `packages/fun/src/lib/methods/`.

- **@hot-labs/near-connect** - Hot Wallet Connect (web only)
- **near-kit** - Core NEAR protocol client
- **zod** - Runtime type validation
- **dotenv** - Environment variable loading (env only)

---

## Key Concepts

- **web** and **env** both export NEAR client instances configured for their respective environments
- **fun** exports contract functions that work with either client
- Contract IDs are network-aware (mainnet/testnet) via helper exports
- All functions use `near-kit` for contract calls
