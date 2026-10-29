# @near-kit-tool-box Development Guide

This is a **Bun workspace monorepo**. All packages share dependencies and
build with TypeScript.

## Guides

| guide                             | what it covers                                |
| --------------------------------- | --------------------------------------------- |
| [setup.md](./setup.md)            | install, build, env vars, type check          |
| [build.md](./build.md)            | the build pipeline, clean & rebuild, tsconfig |
| [versioning.md](./versioning.md)  | version sync, bump types, publishing          |
| [packages.md](./packages.md)      | the three packages, their deps and config     |
| [testing.md](./testing.md)        | the bins as the test harness, conventions     |
| [bin/README.md](../bin/README.md) | the bins, one folder per contract family      |
| [DOCS/SC/](./SC/)                 | one doc per smart contract                    |
| [FILES.md](./FILES.md)            | the top-level folder index                    |

The repo layout lives in the [`tree`](../tree) file at the repo root — see that
for the folder map and the file naming conventions.

## Quick Reference

```bash
bun install                                  # install everything
bun run build                                # build all packages
bun run rebuild                              # clean + build (before publish)
bun run clean                                # wipe dist/ and .tsbuildinfo
bun run typecheck:bin                        # type-check the bins
bun run format                               # prettier, whole repo
bun run version:dry-run                      # preview a version bump
bun run version:sync                         # bump all packages
bun run publish:all                          # publish env -> fun -> web
bun update --latest --recursive              # update every package's deps
```

Releasing is automated — see [versioning.md](./versioning.md#automated-release-github-actions).
GitHub **Actions → Release → Run workflow** bumps the versions, tags, publishes
to npm, and opens a GitHub release. The git tag always equals the npm version.

---

==========================
<br/>
copyright 2026 by sleet.near
