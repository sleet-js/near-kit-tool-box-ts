// Release Version Calculator
// Computes the next release version by looking at BOTH the local workspace
// versions and the versions already published on npm, then taking the highest
// of each and bumping it.
//
// Using npm's published versions as an input matters: if a version was
// published but never committed (or the commit was lost), the local
// package.json would be behind and we'd try to re-publish a version that
// already exists on the registry.
//
// Usage:
//   bun run scripts/release-version.ts patch    # 0.2.2 -> 0.2.3
//   bun run scripts/release-version.ts minor    # 0.2.2 -> 0.3.0
//   bun run scripts/release-version.ts major    # 0.2.2 -> 1.0.0
//
// Prints the bare version (no "v" prefix) on stdout, so the workflow can
// capture it directly.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SCOPE = "@near-kit-tool-box";

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

function find_highest_version(versions: string[]): string {
  return versions.reduce(
    (highest, version) =>
      compare_versions(version, highest) > 0 ? version : highest,
    "0.0.0",
  );
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

function get_workspace_packages(): package_info[] {
  const root_package_path = join(import.meta.dir, "..");
  const root_package = JSON.parse(
    readFileSync(join(root_package_path, "package.json"), "utf-8"),
  );

  const workspaces = root_package.workspaces || [];
  const packages: package_info[] = [];

  for (const workspace of workspaces) {
    if (!workspace.includes("*")) continue;
    const base_dir = join(root_package_path, workspace.split("*")[0]);
    let entries: string[];
    try {
      entries = readdirSync(base_dir);
    } catch {
      continue;
    }
    for (const entry of entries) {
      const entry_path = join(base_dir, entry);
      if (!statSync(entry_path).isDirectory()) continue;
      try {
        const pkg = JSON.parse(
          readFileSync(join(entry_path, "package.json"), "utf-8"),
        );
        packages.push({
          name: pkg.name,
          path: entry_path,
          version: pkg.version || "0.0.0",
        });
      } catch {
        // Skip packages without a readable package.json
      }
    }
  }

  return packages;
}

// Fetch the published versions for one package from the npm registry.
// Returns [] when the package is not published yet or the registry is
// unreachable — a network failure must not block a release, the local
// versions are still a valid floor.
async function fetch_published_versions(
  package_name: string,
): Promise<string[]> {
  const url = `https://registry.npmjs.org/${encodeURIComponent(package_name)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = (await response.json()) as {
      versions?: Record<string, unknown>;
    };
    return Object.keys(data.versions ?? {});
  } catch (error) {
    console.warn(
      `⚠️  Could not reach the registry for ${package_name}: ${(error as Error).message}`,
    );
    return [];
  }
}

async function main() {
  const bump_type = (Bun.argv[2] ?? "patch") as "patch" | "minor" | "major";
  if (!["patch", "minor", "major"].includes(bump_type)) {
    console.error(`❌ Unknown bump type: ${bump_type}`);
    process.exit(1);
  }

  const packages = get_workspace_packages();
  if (packages.length === 0) {
    console.error("❌ No workspace packages found");
    process.exit(1);
  }

  const local_versions = packages.map((pkg) => pkg.version);

  // Collect every version this scope has ever published.
  const published: string[] = [];
  for (const pkg of packages) {
    const versions = await fetch_published_versions(pkg.name);
    published.push(...versions);
  }

  const highest_local = find_highest_version(local_versions);
  const highest_published = find_highest_version(published);
  const highest = find_highest_version([highest_local, highest_published]);

  const target = bump_version(highest, bump_type);

  console.error(`Local versions:    ${local_versions.join(", ")}`);
  if (published.length > 0) {
    console.error(`Published on npm:  ${published.join(", ")}`);
  }
  console.error(`Highest:           ${highest}`);
  console.error(`Bump (${bump_type}):  ${highest} -> ${target}`);

  // Stdout is the version — the workflow captures this.
  console.log(target);
}

main().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
