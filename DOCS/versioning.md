# VERSIONING

The version sync utility keeps all workspace packages on the same version.

> **It bumps every package.** `version:sync` scans `packages/*` and moves
> them all to one version — it cannot bump a single package. To bump one
> package on its own, edit its `package.json` `version` field directly.

## Check Version Status (Dry Run)

```bash
# See which packages need version updates (no files modified)
bun run version:dry-run
```

## Sync All Package Versions

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

## Bump Types

- **patch**: Increments patch version (0.0.1 → 0.0.2) - _default_
- **minor**: Increments minor version, resets patch (0.0.1 → 0.1.0)
- **major**: Increments major version, resets minor/patch (0.0.1 → 1.0.0)

## How It Works

1. Scans all workspace packages (`packages/*`)
2. Finds the highest version across all packages
3. Bumps all packages to the next version (or sets to specified version)
4. Updates each package's `package.json` automatically

## Publishing

Each package is independent and can be published separately.

```bash
# Login to npm
bunx npm login

# Publish all three, in dependency order (env -> fun -> web)
bun run publish:all
```

`publish:all` runs `bun run build` first, then publishes `packages/env`,
`packages/fun`, and `packages/web` in that order.

To publish one package on its own:

```bash
cd packages/fun && bun publish --access public
```

> **Rebuild before publishing.** `publish:all` runs `bun run build`, not
> `bun run rebuild`. If `dist/` has drifted from `src/`, run
> `bun run rebuild` first — see [build.md](./build.md).

## Typical Workflow

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

==========================
<br/>
copyright 2026 by sleet.near
