// =================================================
// chess_game_args
//
// Parameter type map for every app.chess-game.near view/call function
// exported from this package. Each method gets its own slice of the
// args it actually consumes.
// =================================================
import type { CHESS_GAME_ID_TYPE } from "../../types/chess_game_types";

// =================================================
export interface chess_game_args {
  // the game id — the block height, the white player, the black player
  game_id: CHESS_GAME_ID_TYPE;
  // one account
  account_id: string;
  // several accounts
  account_ids: string[];
  // pagination — both are optional on the contract
  skip: number;
  limit: number;
  // the token the contract holds for an account
  token_id: string;
  // the challenge id — the two accounts joined with `-vs-`
  challenge_id: string;
  // true for the sender of a challenge, false for the receiver
  is_challenger: boolean;
  // the account being challenged
  challenged_id: string;
  // the move, in coordinate notation — "e2e4", "e2 e4", "e2 to e4",
  // "O-O", "O-O-O", "e7 to e8 Q"
  mv: string;
  // the ai difficulty — "Easy" | "Medium" | "Hard" | "VeryHard"
  difficulty: string;
  // the elo rating range of the opponent to match — both are floats
  min_elo: number;
  max_elo: number;
  // the storage amount to withdraw, in yoctoNEAR
  amount: string;
  // the account to register — omit it to register the caller
  register_account_id: string;
  // register without topping the storage balance up
  registration_only: boolean;
  // mark the account as an automated agent
  is_agent: boolean;
}
// =================================================
// copyright 2026 by sleet.near
