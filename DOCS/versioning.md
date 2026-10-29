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

## Automated Release (GitHub Actions)

The manual steps above are automated by
[`.github/workflows/release.yml`](../.github/workflows/release.yml). Run it from
**GitHub → Actions → RELEASE → Run workflow**.

### What it does

1. Computes the next version from the bump type you pick
2. Sets every `packages/*/package.json` to that one version
3. Commits the bump and pushes a git tag
4. Builds all packages
5. Publishes `env` → `fun` → `web` to npm
6. Verifies the published versions, then creates a GitHub release

### The tag always matches the npm version

The git tag and the npm version are the same string:

```
tag v0.3.0  <->  npm @near-kit-tool-box/env@0.3.0
                            @near-kit-tool-box/fun@0.3.0
                            @near-kit-tool-box/web@0.3.0
```

All three packages share one version number, so one tag covers all of them.

### Choosing the version

| input           | result            |
| --------------- | ----------------- |
| bump `patch`    | `0.2.2` → `0.2.3` |
| bump `minor`    | `0.2.2` → `0.3.0` |
| bump `major`    | `0.2.2` → `1.0.0` |
| version `1.2.3` | exactly `1.2.3`   |

The bump base is the highest of **both** the local `package.json` versions and
the versions already on npm, so a version that was published but never
committed can never be reused.

### Trusted publishing (no npm token)

The workflow authenticates with **OIDC**, not a stored npm token. There is no
`NPM_TOKEN` secret in this repo, and none is needed.

On **npmjs.com**, each package needs a trusted publisher configured once, under
**Package Settings → Trusted Publisher → GitHub Actions**:

| field                | value                  |
| -------------------- | ---------------------- |
| Organization or user | `sleet-js`             |
| Repository           | `near-kit-tool-box-ts` |
| Workflow filename    | `release.yml`          |
| Allowed actions      | `npm publish`          |

> **Do this within 2 days.** A new trusted publisher configuration must
> complete its first publish within 2 days or it expires. If it expires,
> delete it, create a new one, and publish again within 2 days.
>
> The npm scope owner must match the GitHub org/user that owns the repo.

### Once it is working

Optionally lock it down on npmjs.com under **Package Settings → Publishing
access → "Require two-factor authentication and disallow tokens"**. Trusted
publishing keeps working, but token-based publishes stop.

---

==========================
<br/>
copyright 2026 by sleet.near
