// Version Sync Script
// Finds the highest version across all workspace packages and bumps everything to the next version.
// Usage:
//   bun run scripts/version-sync.ts              # Patch bump (0.0.1 -> 0.0.2)
//   bun run scripts/version-sync.ts patch        # Patch bump (0.0.1 -> 0.0.2)
//   bun run scripts/version-sync.ts minor        # Minor bump (0.0.1 -> 0.1.0)
//   bun run scripts/version-sync.ts major        # Major bump (0.0.1 -> 1.0.0)
//   bun run scripts/version-sync.ts 1.2.3        # Set specific version
//   bun run scripts/version-sync.ts --dry-run    # Preview without writing

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

interface package_info {
  name: string;
  path: string;
  version: string;
}

function parse_version(version: string): {
  major: number;
  minor: number;
  patch: number;
} {
  const parts = version.split(".").map(Number);
  return {
    major: parts[0] ?? 0,
    minor: parts[1] ?? 0,
    patch: parts[2] ?? 0,
  };
}

function version_to_string(v: {
  major: number;
  minor: number;
  patch: number;
}): string {
  return `${v.major}.${v.minor}.${v.patch}`;
}

function compare_versions(a: string, b: string): number {
  const pa = parse_version(a);
  const pb = parse_version(b);
  if (pa.major !== pb.major) return pa.major - pb.major;
  if (pa.minor !== pb.minor) return pa.minor - pb.minor;
  return pa.patch - pb.patch;
}

function get_workspace_packages(): package_info[] {
  const root_package_path = join(import.meta.dir, "..");
  const root_package = JSON.parse(
    readFileSync(join(root_package_path, "package.json"), "utf-8"),
  );

  const workspaces = root_package.workspaces || [];
  const packages: package_info[] = [];

  for (const workspace of workspaces) {
    // Handle glob patterns like "packages/*"
    if (workspace.includes("*")) {
      const base_dir = join(root_package_path, workspace.split("*")[0]);
      try {
        const entries = readdirSync(base_dir);
        for (const entry of entries) {
          const entry_path = join(base_dir, entry);
          if (statSync(entry_path).isDirectory()) {
            const package_json_path = join(entry_path, "package.json");
            try {
              const pkg = JSON.parse(readFileSync(package_json_path, "utf-8"));
              packages.push({
                name: pkg.name,
                path: entry_path,
                version: pkg.version || "0.0.0",
              });
            } catch {
              // Skip if no package.json
            }
          }
        }
      } catch {
        console.warn(`⚠️  Skipping ${workspace}: directory not found`);
      }
    } else {
      // Direct path
      const package_json_path = join(
        root_package_path,
        workspace,
        "package.json",
      );
      try {
        const pkg = JSON.parse(readFileSync(package_json_path, "utf-8"));
        packages.push({
          name: pkg.name,
          path: join(root_package_path, workspace),
          version: pkg.version || "0.0.0",
        });
      } catch {
        console.warn(
          `⚠️  Skipping ${workspace}: package.json not found or invalid`,
        );
      }
    }
  }

  return packages;
}

function find_highest_version(packages: package_info[]): string {
  return packages.reduce((highest, pkg) => {
    return compare_versions(pkg.version, highest) > 0 ? pkg.version : highest;
  }, "0.0.0");
}

function bump_version(
  version: string,
  type: "patch" | "minor" | "major",
): string {
  const v = parse_version(version);
  switch (type) {
    case "major":
      return version_to_string({ major: v.major + 1, minor: 0, patch: 0 });
    case "minor":
      return version_to_string({
        major: v.major,
        minor: v.minor + 1,
        patch: 0,
      });
    case "patch":
      return version_to_string({
        major: v.major,
        minor: v.minor,
        patch: v.patch + 1,
      });
  }
}

async function main() {
  const args = Bun.argv.slice(2);
  const dry_run = args.includes("--dry-run");
  const version_arg = args.find(
    (arg) =>
      !arg.startsWith("--") && !["patch", "minor", "major"].includes(arg),
  );
  const bump_type_arg = args.find((arg) =>
    ["patch", "minor", "major"].includes(arg),
  ) as "patch" | "minor" | "major" | undefined;

  console.log("🔍 Scanning workspace packages...\n");

  const packages = get_workspace_packages();

  if (packages.length === 0) {
    console.error("❌ No workspace packages found");
    process.exit(1);
  }

  console.log(`📦 Found ${packages.length} packages:\n`);
  packages.forEach((pkg) => {
    console.log(`  ${pkg.name.padEnd(50)} ${pkg.version}`);
  });

  let target_version: string;

  if (version_arg) {
    // Specific version provided
    target_version = version_arg;
    console.log(`\n🎯 Setting all packages to version: ${target_version}`);
  } else {
    // Find highest and bump
    const highest_version = find_highest_version(packages);
    console.log(`\n📊 Highest version: ${highest_version}`);

    const bump_type = bump_type_arg || "patch";
    target_version = bump_version(highest_version, bump_type);
    console.log(
      `🚀 Bumping all packages to ${target_version} (${bump_type} bump)`,
    );
  }

  if (dry_run) {
    console.log("\n🔎 DRY RUN - No files will be modified\n");
    const packages_to_update = packages.filter(
      (pkg) => pkg.version !== target_version,
    );
    console.log(`\n📝 Would update ${packages_to_update.length} packages:`);
    packages_to_update.forEach((pkg) => {
      console.log(`  ${pkg.name}: ${pkg.version} → ${target_version}`);
    });

    const unchanged_count = packages.length - packages_to_update.length;
    if (unchanged_count > 0) {
      console.log(
        `\n✅ ${unchanged_count} packages already at ${target_version}`,
      );
    }
    return;
  }

  // Update all packages
  console.log("\n✏️  Updating packages...\n");

  let updated_count = 0;
  for (const pkg of packages) {
    if (pkg.version === target_version) {
      console.log(`  ⏭️  ${pkg.name} (already at ${target_version})`);
      continue;
    }

    const package_json_path = join(pkg.path, "package.json");
    const package_json = JSON.parse(readFileSync(package_json_path, "utf-8"));

    const old_version = package_json.version;
    package_json.version = target_version;

    writeFileSync(
      package_json_path,
      JSON.stringify(package_json, null, 2) + "\n",
    );
    console.log(`  ✅ ${pkg.name}: ${old_version} → ${target_version}`);
    updated_count++;
  }

  console.log(
    `\n✅ Successfully updated ${updated_count}/${packages.length} packages to version ${target_version}`,
  );

  if (updated_count > 0) {
    console.log("\n💡 Next steps:");
    console.log("   1. Review changes: git diff");
    console.log(
      `   2. Commit: git commit -m 'chore: bump all packages to v${target_version}'`,
    );
    console.log("   3. Build: bun run build");
    console.log("   4. Publish all packages: bun run publish:all");
    console.log(
      "   Or skip it all — run the 'Release' workflow on GitHub (Actions → Release).",
    );
  }
}

main().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
