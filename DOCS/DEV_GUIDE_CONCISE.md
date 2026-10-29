# GUIDE FOR ME

non ai generated

```sh
# Install all dependencies
bun install
# Patch bump (default): 0.0.1 -> 0.0.2
bun run version:sync
# Build and publish
bun run rebuild         # clean + build — recommended before publish
bunx npm login
bun run publish:all     # runs build, then publishes env -> fun -> web
# other
bun run build           # incremental build (uses tsc --build --force)
bun run clean           # wipe dist/ and .tsbuildinfo in every package
bunx prettier . --write
# Verify src <-> dist are in sync (no orphan dist files from removed sources):
for p in packages/*/; do
  cd "$p"
  diff <(find src -type f \( -name "*.ts" -o -name "*.tsx" \) | sed -E 's|^src/||; s/\.(ts|tsx)$//' | sort -u) \
       <(find dist -type f \( -name "*.js" -o -name "*.d.ts" \) ! -name "*.map" | sed -E 's|^dist/||; s/\.(js|d\.ts)$//' | sort -u) \
    && echo "$p OK" || echo "$p MISMATCH"
  cd -
done
```

==========================
<br/>
copyright 2026 by sleet.near
