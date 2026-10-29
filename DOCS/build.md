# BUILD

Each package compiles with **`tsc --build --force`** (TypeScript 7 build mode)
via its own `tsconfig.json`.

## Build

```bash
# All packages (deterministic — each package uses `tsc --build --force`)
bun run build

# Individual packages
bun run build:web
bun run build:env
bun run build:fun
```

## Clean & Rebuild

`tsc` does not delete stale output files when a source file is removed. Use
`clean` (or `rebuild`) to guarantee a 1:1 match between `src/` and `dist/`
before publishing.

```bash
# Wipe dist/ and .tsbuildinfo in every package
bun run clean

# clean + build — recommended before publish:all
bun run rebuild
```

> **Why `--force`?** TypeScript 7.0's `tsc --build` trusts `.tsbuildinfo` and
> may skip emitting files when the cache is stale (e.g. you deleted `dist/`
> manually or after `clean`). The `--force` flag ignores the cache and
> re-emits everything. Each package's `build` script prepends
> `rm -f .tsbuildinfo` for extra safety, so `bun run rebuild` always produces
> fresh, complete output.
>
> The `.tsbuildinfo` file lives at each package root (not inside `dist/`), so
> it is **not** included in the published npm tarball — only the `dist/`
> content is shipped.

## Verifying `src/` matches `dist/`

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

A non-empty diff means something in `dist/` no longer has a source. Run
`bun run rebuild` to fix.

## TypeScript config

Key settings in each package's `tsconfig.json`:

| Option            | Value              | Why                                                                                      |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------------- |
| `composite`       | `true`             | Enables project-reference-aware incremental builds and `.d.ts` emission.                 |
| `incremental`     | `true`             | Reads/writes the `.tsbuildinfo` cache for skip-unchanged-file speedups.                  |
| `tsBuildInfoFile` | `"./.tsbuildinfo"` | Keeps the build cache **outside `dist/`** so it doesn't leak into the published tarball. |
| `rootDir`         | `"./src"`          | Required in TS 7; pins the input tree.                                                   |
| `outDir`          | `"./dist"`         | Standard output location.                                                                |

`scripts.clean` runs `tsc --build --clean` then `rm -rf dist .tsbuildinfo` so
that any source file removed since the last build is also removed from
`dist/`.

---

==========================
<br/>
copyright 2026 by sleet.near
