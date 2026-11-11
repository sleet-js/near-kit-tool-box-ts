// =================================================
// bin/chess_game/_shared.ts
//
// Shared helpers for the chess_game bins.
//
// The game id is the one shape the chess bins all need: the contract
// takes it as a JSON array — `[block_height, white, black|null]` — so
// the bins accept it either as a JSON array string
// (`'[113689871,"within4d45.near","marior.near"]'`) or as three loose
// flags (`--height`, `--white`, `--black`).
// =================================================
import { fail } from "../_shared/args.js";
import type { CHESS_GAME_ID_TYPE } from "../../packages/fun/src/index.js";
// =================================================

// Parses a game id from a JSON array string.
// Throws a clear error when the string is not a valid game id.
export function parse_game_id(
  value: string,
  usage: string,
): CHESS_GAME_ID_TYPE {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    fail(
      `the game id must be a JSON array like '[113689871,"white.near","black.near"]' (got "${value}")`,
      usage,
    );
  }

  if (!Array.isArray(parsed) || parsed.length !== 3) {
    fail(
      `the game id must be a JSON array of three values — [block_height, white, black|null] (got "${value}")`,
      usage,
    );
  }

  const [height, white, black] = parsed as [unknown, unknown, unknown];
  if (typeof height !== "number" || !Number.isInteger(height) || height < 0) {
    fail(
      `the first game id value must be the block height as a number (got "${String(height)}")`,
      usage,
    );
  }
  if (typeof white !== "string" || white.length === 0) {
    fail(
      `the second game id value must be the white player account id (got "${String(white)}")`,
      usage,
    );
  }
  if (black !== null && (typeof black !== "string" || black.length === 0)) {
    fail(
      `the third game id value must be the black player account id or null (got "${String(black)}")`,
      usage,
    );
  }

  return [height, white, black as string | null];
}

// Reads the game id from the flags — `--game-id` as a JSON array, or
// `--height` / `--white` / `--black` as the loose form.
export function require_game_id(
  args: Record<string, string | boolean>,
  usage: string,
): CHESS_GAME_ID_TYPE {
  const game_id = args["game-id"];
  if (typeof game_id === "string" && game_id.length > 0) {
    return parse_game_id(game_id, usage);
  }

  const height = args["height"];
  const white = args["white"];
  if (
    typeof height !== "string" ||
    typeof white !== "string" ||
    white.length === 0
  ) {
    fail(
      "missing required flag --game-id (a JSON array) or --height and --white",
      usage,
    );
  }
  const parsed_height = Number(height);
  if (!Number.isInteger(parsed_height) || parsed_height < 0) {
    fail(`flag --height must be a block height (got "${height}")`, usage);
  }

  const black = args["black"];
  if (black !== undefined && typeof black !== "string") {
    fail(`flag --black must be an account id (got "${String(black)}")`, usage);
  }

  return [parsed_height, white, (black as string | undefined) ?? null];
}
// =================================================
// copyright 2026 by sleet.near
