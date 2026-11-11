// =================================================
// chess_game_challenge_id
//
// Builds the challenge id the contract uses for a pair of accounts.
//
// The challenge id is the two accounts joined with `-vs-`.
//
// This is a pure helper, not a contract call.
import type { chess_game_args } from "../../lib/args/chess_game_args";
// =================================================
export function chess_game_challenge_id(
  challenger_id: chess_game_args["challenged_id"],
  challenged_id: chess_game_args["challenged_id"],
): string {
  return `${challenger_id}-vs-${challenged_id}`;
}
// =================================================
// copyright 2026 by sleet.near
