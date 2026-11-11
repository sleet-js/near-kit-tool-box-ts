import * as z from "zod";
import {
  ACCOUNT_ID_STRING_Z_CONST,
  AMOUNT_STRING_Z_CONST,
} from "./scalar_type";
// =================================================
// The app.chess-game.near response types.
//
// PROVENANCE
//   contract : `app.chess-game.near` (mainnet)
//   methods  : `get_board`, `render_board`, `game_info`, `get_game_ids`,
//              `get_account`, `get_accounts`, `get_elo_ratings`,
//              `get_elo_ratings_by_ids`, `storage_balance_bounds`
//   verified : 2026-11-11, against the live mainnet responses
// =================================================

// ---------- the game id ----------

// The `GameId` of a chess game — the block height the game was created
// at, the white player, and the black player (`null` for a game against
// the ai).
//
// The contract takes the game id as a JSON array, so this mirrors that
// shape exactly:
//   `[113689871, "within4d45.near", "marior.near"]`
export type CHESS_GAME_ID_TYPE = [number, string, string | null];

export const CHESS_GAME_ID_TYPE_Z_CONST = z.tuple([
  z.number().int().nonnegative(),
  ACCOUNT_ID_STRING_Z_CONST,
  ACCOUNT_ID_STRING_Z_CONST.nullable(),
]) satisfies z.ZodType<CHESS_GAME_ID_TYPE>;

// ---------- one side of a game ----------

// One side of a chess game — either a human account or the on-chain ai.
//
// The contract returns the two sides as a tagged object:
//   `{ "type": "Human", "value": "player1.near" }`
//   `{ "type": "Ai", "value": "Hard" }`
//
// The tag field is named `type` on the wire.
export interface CHESS_GAME_PLAYER_TYPE {
  // `"Human"` or `"Ai"`.
  type: string;
  // The account id for a human, or the ai difficulty for the ai.
  value: string;
}

export const CHESS_GAME_PLAYER_TYPE_Z_CONST = z.object({
  type: z.string(),
  value: z.string(),
}) satisfies z.ZodType<CHESS_GAME_PLAYER_TYPE>;

// ---------- the game state ----------

// The players, whose turn it is, and whether the game carries bets.
//
// Returned by the `game_info` view.
export interface CHESS_GAME_INFO_TYPE {
  white: CHESS_GAME_PLAYER_TYPE;
  black: CHESS_GAME_PLAYER_TYPE;
  // `"White"` or `"Black"`.
  turn_color: string;
  last_block_height: number;
  has_bets: boolean;
}

export const CHESS_GAME_INFO_TYPE_Z_CONST = z.object({
  white: CHESS_GAME_PLAYER_TYPE_Z_CONST,
  black: CHESS_GAME_PLAYER_TYPE_Z_CONST,
  turn_color: z.string(),
  last_block_height: z.number().int().nonnegative(),
  has_bets: z.boolean(),
}) satisfies z.ZodType<CHESS_GAME_INFO_TYPE>;

// ---------- one account ----------

// The registration, rating, points and stats of one chess account.
//
// Returned by the `get_account` view.
//
// All amounts are decimal strings — `near_amount` is in yoctoNEAR and
// `points` / `pending_points` are in ppp token units (6 decimals).
export interface CHESS_GAME_ACCOUNT_TYPE {
  // The storage balance the account holds on the contract, in yoctoNEAR.
  near_amount: string;
  // Whether the account is flagged as an automated agent.
  is_agent: boolean;
  // The ppp point balance of the account.
  points: string;
  // The ppp points earned but not yet claimed.
  pending_points: string;
  // The elo rating of the account.
  elo: number;
  // The number of games the account won.
  wins: number;
  // The current win streak.
  win_streak: number;
  // The longest win streak the account reached.
  max_win_streak: number;
  // The number of bets the account placed.
  bets_placed: number;
  // The number of bets the account won.
  bets_won: number;
  // The number of wagers the account played.
  wagers_played: number;
  // The number of wagers the account won.
  wager_wins: number;
  // The number of challenges the account sent.
  challenges_sent: number;
}

export const CHESS_GAME_ACCOUNT_TYPE_Z_CONST = z.object({
  near_amount: AMOUNT_STRING_Z_CONST,
  is_agent: z.boolean(),
  points: AMOUNT_STRING_Z_CONST,
  pending_points: AMOUNT_STRING_Z_CONST,
  elo: z.number(),
  wins: z.number().int().nonnegative(),
  win_streak: z.number().int().nonnegative(),
  max_win_streak: z.number().int().nonnegative(),
  bets_placed: z.number().int().nonnegative(),
  bets_won: z.number().int().nonnegative(),
  wagers_played: z.number().int().nonnegative(),
  wager_wins: z.number().int().nonnegative(),
  challenges_sent: z.number().int().nonnegative(),
}) satisfies z.ZodType<CHESS_GAME_ACCOUNT_TYPE>;

// ---------- the elo ratings ----------

// One account id and elo rating pair.
//
// Returned by the `get_elo_ratings` and `get_elo_ratings_by_ids` views
// as a two-element array. A new account starts with a rating of 1000.
export type CHESS_GAME_ELO_RATING_TYPE = [string, number];

export const CHESS_GAME_ELO_RATING_TYPE_Z_CONST = z.tuple([
  ACCOUNT_ID_STRING_Z_CONST,
  z.number(),
]) satisfies z.ZodType<CHESS_GAME_ELO_RATING_TYPE>;

// One account id and ppp balance pair.
//
// Returned by the `get_ppp_balances_by_ids` view as a two-element
// array. The balance is a decimal string in ppp units.
export type CHESS_GAME_PPP_BALANCE_TYPE = [string, string];

export const CHESS_GAME_PPP_BALANCE_TYPE_Z_CONST = z.tuple([
  ACCOUNT_ID_STRING_Z_CONST,
  AMOUNT_STRING_Z_CONST,
]) satisfies z.ZodType<CHESS_GAME_PPP_BALANCE_TYPE>;

// ---------- the storage bounds ----------

// The NEP-145 storage balance bounds of the contract.
//
// Returned by the `storage_balance_bounds` view. The `min` is the
// exact deposit a caller must attach to `storage_deposit` to register,
// and `max` is `null` when the contract sets no upper bound.
//
// The live `min` is `"50000000000000000000000"` (0.05 NEAR).
export interface CHESS_GAME_STORAGE_BOUNDS_TYPE {
  // The maximum storage balance, in yoctoNEAR, or `null` for no bound.
  max: string | null;
  // The minimum storage balance, in yoctoNEAR.
  min: string;
}

export const CHESS_GAME_STORAGE_BOUNDS_TYPE_Z_CONST = z.object({
  max: AMOUNT_STRING_Z_CONST.nullable(),
  min: AMOUNT_STRING_Z_CONST,
}) satisfies z.ZodType<CHESS_GAME_STORAGE_BOUNDS_TYPE>;

// ---------- the ppp token metadata ----------

// The ppp token metadata of the contract.
//
// Returned by the `ft_metadata` view. The symbol is `PPP`, the decimals
// are `6` and the name is `Protocol Pawns Points`.
//
// The `icon` is a data URL and is left out of this shape on purpose —
// it is large and rarely needed.
export interface CHESS_GAME_FT_METADATA_TYPE {
  spec: string;
  name: string;
  symbol: string;
  decimals: number;
  reference?: string | null;
  reference_hash?: string | null;
}

export const CHESS_GAME_FT_METADATA_TYPE_Z_CONST = z.object({
  spec: z.string(),
  name: z.string(),
  symbol: z.string(),
  decimals: z.number().int().nonnegative(),
  reference: z.string().nullable().optional(),
  reference_hash: z.string().nullable().optional(),
}) satisfies z.ZodType<CHESS_GAME_FT_METADATA_TYPE>;

// ---------- the ai difficulty ----------

// The difficulty of the on-chain chess ai.
//
// The gas the contract needs scales with it: 50 Tgas for `Easy`, 150
// for `Medium`, 250 for `Hard` and 400 for `VeryHard`.
export const CHESS_GAME_DIFFICULTY_TYPE = [
  "Easy",
  "Medium",
  "Hard",
  "VeryHard",
] as const;

export type CHESS_GAME_DIFFICULTY_TYPE =
  (typeof CHESS_GAME_DIFFICULTY_TYPE)[number];

export const CHESS_GAME_DIFFICULTY_Z_CONST = z.enum(
  CHESS_GAME_DIFFICULTY_TYPE,
) satisfies z.ZodType<CHESS_GAME_DIFFICULTY_TYPE>;
// =================================================
// copyright 2026 by sleet.near
