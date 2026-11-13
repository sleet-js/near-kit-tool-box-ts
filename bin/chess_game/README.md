# CHESS_GAME

`app.chess-game.near` bins — the protocol pawns on-chain chess contract.

the contract is **mainnet only**. the contract id defaults to
`app.chess-game.near` on both networks, and `--contract-id` overrides
it.

a game is identified by a `GameId` — a JSON array of three values:

```json
[113689871, "within4d45.near", "marior.near"]
```

- the first value is the block height the game was created at
- the second is the white player, always an account id
- the third is the black player, or `null` for a game against the ai

the bins take the game id either as `--game-id '<json array>'` or as
the loose flags `--height`, `--white` and `--black`.

moves are **coordinate notation**, not san — `"e2e4"`, `"e2 e4"`,
`"e2 to e4"`, `"O-O"`, `"O-O-O"`, `"e7 to e8 queen"`. a promotion
spells the piece out in full.

---

#### CONTRACT ID PER NETWORK

- MAINNET: app.chess-game.near
- TESTNET: (none — mainnet only)

#### EXAMPLES

```sh
# view: the board of a game, plain and rendered
bun run bin/chess_game/chess_game_get_board.ts \
  --game-id '[113689871,"within4d45.near","marior.near"]'
bun run bin/chess_game/chess_game_render_board.ts \
  --game-id '[113689871,"within4d45.near","marior.near"]'

# view: the players, the turn and the bet flag of a game
bun run bin/chess_game/chess_game_game_info.ts \
  --game-id '[113689871,"within4d45.near","marior.near"]'

# view: the active games of an account
bun run bin/chess_game/chess_game_get_game_ids.ts --account-id marior.near

# view: an account — its rating, points and stats
bun run bin/chess_game/chess_game_get_account.ts --account-id marior.near

# view: the registered account ids, paginated
bun run bin/chess_game/chess_game_get_accounts.ts --skip 0 --limit 10

# view: the elo leaderboard, paginated
bun run bin/chess_game/chess_game_get_elo_ratings.ts --skip 0 --limit 10

# view: the elo rating of specific accounts
bun run bin/chess_game/chess_game_get_elo_ratings_by_ids.ts \
  --account-ids marior.near,within4d45.near

# view: the owner, the treasury fee and the token whitelist
bun run bin/chess_game/chess_game_contract_info.ts

# view: the storage balance bounds and one account's storage balance
bun run bin/chess_game/chess_game_storage_balance.ts --account-id marior.near

# call: register the signer (the deposit is at least 0.05 NEAR)
bun run bin/chess_game/chess_game_storage_deposit.ts

# call: start a game against the ai — the gas follows the difficulty
bun run bin/chess_game/chess_game_create_ai_game.ts --difficulty Easy

# call: play a move against the ai
bun run bin/chess_game/chess_game_play_move.ts \
  --game-id '[113689871,"within4d45.near",null]' \
  --mv "e2e4" --difficulty Easy

# call: play a move against a human — 150 Tgas
bun run bin/chess_game/chess_game_play_move.ts \
  --game-id '[113689871,"within4d45.near","marior.near"]' \
  --mv "e2e4"

# call: give up a game, or cancel one that has gone stale
bun run bin/chess_game/chess_game_resign.ts \
  --game-id '[113689871,"within4d45.near","marior.near"]'
bun run bin/chess_game/chess_game_cancel.ts \
  --game-id '[113689871,"within4d45.near","marior.near"]'

# call: challenge another account, then accept or reject the challenge
# the challenge id is the two accounts joined with `-vs-`
bun run bin/chess_game/chess_game_challenge.ts --challenged-id marior.near
bun run bin/chess_game/chess_game_accept_challenge.ts \
  --challenge-id within4d45.near-vs-marior.near
bun run bin/chess_game/chess_game_reject_challenge.ts \
  --challenge-id within4d45.near-vs-marior.near --is-challenger

# call: join and leave the matchmaking queue (no deposit)
bun run bin/chess_game/chess_game_join_matchmaking.ts --min-elo 100 --max-elo 200
bun run bin/chess_game/chess_game_cancel_matchmaking.ts

# call: claim the pending ppp points
bun run bin/chess_game/chess_game_claim_points.ts

# call: mark the signer as an automated agent
bun run bin/chess_game/chess_game_set_is_agent.ts --is-agent

# call: withdraw the storage balance of the signer
bun run bin/chess_game/chess_game_storage_withdraw.ts

# call: withdraw a token the contract holds for the signer
bun run bin/chess_game/chess_game_withdraw_token.ts --token-id wrap.near
```

#### FLAGS

`--contract-id` is optional on every bin — it falls back to the
per-network default.

| bin                                    | flags                                                                   |
| -------------------------------------- | ----------------------------------------------------------------------- |
| `chess_game_get_board.ts`              | `--game-id` (required)                                                  |
| `chess_game_render_board.ts`           | `--game-id` (required)                                                  |
| `chess_game_game_info.ts`              | `--game-id` (required)                                                  |
| `chess_game_get_game_ids.ts`           | `--account-id` (required)                                               |
| `chess_game_get_account.ts`            | `--account-id` (required)                                               |
| `chess_game_get_accounts.ts`           | `--skip`, `--limit` (both optional)                                     |
| `chess_game_get_elo_ratings.ts`        | `--skip`, `--limit` (both optional)                                     |
| `chess_game_get_elo_ratings_by_ids.ts` | `--account-ids` (required, comma separated)                             |
| `chess_game_contract_info.ts`          | —                                                                       |
| `chess_game_storage_balance.ts`        | `--account-id` (optional)                                               |
| `chess_game_storage_deposit.ts`        | `--account-id`, `--registration-only` (both optional)                   |
| `chess_game_create_ai_game.ts`         | `--difficulty` (required: `Easy`, `Medium`, `Hard`, `VeryHard`)         |
| `chess_game_play_move.ts`              | `--game-id`, `--mv` (required); `--difficulty`, `--gas-tgas` (optional) |
| `chess_game_resign.ts`                 | `--game-id` (required)                                                  |
| `chess_game_cancel.ts`                 | `--game-id` (required)                                                  |
| `chess_game_challenge.ts`              | `--challenged-id` (required)                                            |
| `chess_game_accept_challenge.ts`       | `--challenge-id` (required)                                             |
| `chess_game_reject_challenge.ts`       | `--challenge-id` (required), `--is-challenger` (optional)               |
| `chess_game_join_matchmaking.ts`       | `--min-elo`, `--max-elo` (both required)                                |
| `chess_game_cancel_matchmaking.ts`     | —                                                                       |
| `chess_game_claim_points.ts`           | —                                                                       |
| `chess_game_set_is_agent.ts`           | `--is-agent` (optional)                                                 |
| `chess_game_storage_withdraw.ts`       | `--amount` (optional, yoctoNEAR)                                        |
| `chess_game_withdraw_token.ts`         | `--token-id` (required)                                                 |

==========================
<br/>
copyright 2026 by sleet.near
