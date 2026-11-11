// =================================================
// methods_chess_game
//
// Method name constants for the app.chess-game.near contract.
//
// The list matches the live contract, verified against
// `near contract inspect app.chess-game.near network-config mainnet now`
// on 2026-11-11.
//
// The contract's `#[private]` settlement callbacks —
// `wager_victory_callback`, `wager_stalemate_callback`,
// `cancel_wager_refund_callback`, `reject_challenge_wager_callback`,
// `withdraw_token_callback` and `withdraw_treasury_callback` — are NOT
// listed here. They are invoked by the contract itself and are not
// callable by a caller.
// =================================================
export const chess_game_methods_const = {
  ft_on_transfer: "ft_on_transfer",
  ft_metadata: "ft_metadata",
  ft_transfer: "ft_transfer",
  ft_transfer_call: "ft_transfer_call",
  ft_total_supply: "ft_total_supply",
  ft_balance_of: "ft_balance_of",
  storage_deposit: "storage_deposit",
  storage_withdraw: "storage_withdraw",
  storage_unregister: "storage_unregister",
  storage_balance_bounds: "storage_balance_bounds",
  storage_balance_of: "storage_balance_of",
  get_board: "get_board",
  render_board: "render_board",
  game_info: "game_info",
  bet_info: "bet_info",
  get_game_ids: "get_game_ids",
  get_account: "get_account",
  get_quest_list: "get_quest_list",
  get_quest_cooldowns: "get_quest_cooldowns",
  get_achievement_list: "get_achievement_list",
  get_achievements: "get_achievements",
  get_tokens: "get_tokens",
  get_token_amount: "get_token_amount",
  get_elo_ratings: "get_elo_ratings",
  get_elo_ratings_by_ids: "get_elo_ratings_by_ids",
  get_ppp_balances_by_ids: "get_ppp_balances_by_ids",
  get_accounts: "get_accounts",
  get_challenge: "get_challenge",
  get_challenges: "get_challenges",
  get_treasury_tokens: "get_treasury_tokens",
  get_fees: "get_fees",
  get_token_whitelist: "get_token_whitelist",
  get_owner: "get_owner",
  is_queued: "is_queued",
  get_matchmaking_queue: "get_matchmaking_queue",
  contract_source_metadata: "contract_source_metadata",
  new: "new",
  migrate: "migrate",
  pause: "pause",
  set_is_agent: "set_is_agent",
  resume: "resume",
  set_fees: "set_fees",
  set_token_whitelist: "set_token_whitelist",
  withdraw_treasury: "withdraw_treasury",
  transfer_ownership: "transfer_ownership",
  create_ai_game: "create_ai_game",
  challenge: "challenge",
  accept_challenge: "accept_challenge",
  reject_challenge: "reject_challenge",
  claim_points: "claim_points",
  join_matchmaking: "join_matchmaking",
  cancel_matchmaking: "cancel_matchmaking",
  play_move: "play_move",
  resign: "resign",
  cancel: "cancel",
  cancel_bet: "cancel_bet",
  withdraw_token: "withdraw_token",
} as const;
// =================================================
// copyright 2026 by sleet.near
