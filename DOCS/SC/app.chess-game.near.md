# app.chess-game.near

the app.chess-game.near on-chain chess smart contract — play, wager,
matchmake, and climb the elo leaderboard.

---

#### DETAILS

**CONTRACT ID PER NETWORK**

- MAINNET: app.chess-game.near
- TESTNET: (none — mainnet only)

```sh
# near cli - get a list of methods
near contract inspect app.chess-game.near network-config mainnet now
```

**THE GAME ID**

a game is identified by a `GameId`, a tuple of three values:

```json
[113689871, "within4d45.near", "marior.near"]
```

- the first value is the block height the game was created at
- the second is the white player, always an account id
- the third is the black player, or `null` for a game against the ai

in TypeScript this is `CHESS_GAME_ID_TYPE` — a
`[number, string, string | null]` tuple, which serializes to exactly
that json array.

**MOVES ARE COORDINATE NOTATION**

`play_move` takes **coordinate notation**, not san. `"Nf3"` and
`"Qxe4"` fail. the accepted forms are `"e2e4"`, `"e2 e4"`, `"e2 to e4"`,
`"O-O"`, `"O-O-O"` and a promotion like `"e7 to e8 Q"`. the columns are
a–h and the rows are 1–8, counted from white's side.

**GAS AND DEPOSITS**

- every **view** is free and takes no deposit
- a **contract method** takes no deposit, except the storage methods
  and the token methods:
  - `storage_deposit` attaches at least **0.05 NEAR**, the storage cost
  - `set_is_agent` and `withdraw_token` attach exactly **1 yoctoNEAR**
  - `storage_withdraw` attaches exactly **1 yoctoNEAR** — but the
    contract does not implement it, the call always fails with
    `OperationNotSupported`
- an **`ft_transfer_call`** attaches exactly 1 yoctoNEAR

`join_matchmaking` attaches **nothing**. it is not payable, so any
attached deposit is rejected. the queue entry costs the contract no
storage to keep. a **wagered** queue entry goes through
`ft_transfer_call` on the token contract instead — that is the path
that carries a token deposit.

the gas follows the work the call does:

| flow                                       | gas |
| ------------------------------------------ | --- |
| `play_move` against Easy                   | 50  |
| `play_move` against Medium or a human game | 150 |
| `play_move` against Hard                   | 250 |
| `play_move` against VeryHard               | 400 |
| `create_ai_game` against Easy              | 50  |
| `create_ai_game` against Medium            | 150 |
| `create_ai_game` against Hard              | 250 |
| `create_ai_game` against VeryHard          | 400 |
| `resign`, `cancel`                         | 300 |
| `cancel_matchmaking`, `set_is_agent`       | 10  |
| the other calls                            | 30  |

in TypeScript the ai difficulty carries its own gas —
`CHESS_GAME_DIFFICULTY_GAS_TGAS` maps `Easy` / `Medium` / `Hard` /
`VeryHard` to 50 / 150 / 250 / 400 Tgas, and
`chess_game_play_move_with_gas_fun_json` picks the right value for you
(`undefined` for a human game, 150 Tgas).

**REGISTRATION IS THE FIRST STEP**

an account must be registered on the contract before it can play,
challenge, join the matchmaking queue, or bet. `storage_deposit` with
at least 0.05 NEAR does it, and it is done once. a new account starts
with an elo rating of 1000, no points, and every stat at zero.

**THE LIMITS**

| limit                                            | value    |
| ------------------------------------------------ | -------- |
| active games per account                         | 5        |
| open challenges per account                      | 25       |
| open bets per bettor                             | 10       |
| bets per game                                    | 250      |
| matchmaking queue entries                        | 200      |
| blocks before a player may cancel their own game | ~3 days  |
| blocks before anyone may cancel a game           | ~14 days |

a cancel is only allowed when it is not the caller's turn.

**THE PPP POINTS**

the contract is also a non-transferable ppp token. the symbol is `PPP`,
the decimals are `6`, and the name is `Protocol Pawns Points`.
`ft_transfer` and `ft_transfer_call` on the ppp side panic — the points
cannot move. points are earned from quests and achievements, and are
claimed with `claim_points`.

**THE `#[private]` SETTLEMENT CALLBACKS**

the contract carries a set of settlement callbacks —
`wager_victory_callback`, `wager_stalemate_callback`,
`cancel_wager_refund_callback`, `reject_challenge_wager_callback`,
`withdraw_token_callback` and `withdraw_treasury_callback`. they are
`#[private]`, they are called by the contract itself, and they are not
for a caller to invoke. they are **not** in `chess_game_methods_const`.

**TYPED VIEW RESPONSES**

- `get_board` → `string[]`, eight rows, row 0 is rank 8
- `render_board` → `string`, the same board rendered with unicode pieces
- `game_info` → `CHESS_GAME_INFO_TYPE`
- `get_game_ids` → `CHESS_GAME_ID_TYPE[]`
- `get_account` → `CHESS_GAME_ACCOUNT_TYPE`
- `get_accounts` → `string[]`
- `get_elo_ratings` / `get_elo_ratings_by_ids` → `CHESS_GAME_ELO_RATING_TYPE[]`
- `storage_balance_bounds` → `CHESS_GAME_STORAGE_BOUNDS_TYPE`
- `storage_balance_of` → `STORAGE_BALANCE_OF_RESPONSE_TYPE`
- `get_owner` → `string`
- `get_fees` → `number`, in basis points
- `get_token_whitelist` → `string[]`

`CHESS_GAME_PLAYER_TYPE` is the tagged side of a game — `{ "type":
"Human", "value": "player1.near" }` for a human, `{ "type": "Ai",
"value": "Hard" }` for the ai. the tag field is named `type` on the
wire.

all of the above shapes were verified against live `app.chess-game.near`
responses on 2026-11-11.

#### FILES

- `packages/fun/src/lib/methods/methods_chess_game.ts`
- `packages/fun/src/lib/const_id/chess_game_contract_id_const.ts`
- `packages/fun/src/lib/args/chess_game_args.ts`
- `packages/fun/src/types/chess_game_types.ts`
- `packages/fun/src/fun/chess_game/` — the contract methods:
  - views — `chess_game_get_board_fun_json.ts`, `chess_game_render_board_fun_json.ts`, `chess_game_game_info_fun_json.ts`, `chess_game_get_game_ids_fun_json.ts`, `chess_game_get_account_fun_json.ts`, `chess_game_get_accounts_fun_json.ts`, `chess_game_get_elo_ratings_fun_json.ts`, `chess_game_get_elo_ratings_by_ids_fun_json.ts`, `chess_game_get_owner_fun_json.ts`, `chess_game_get_fees_fun_json.ts`, `chess_game_get_token_whitelist_fun_json.ts`, `chess_game_storage_balance_bounds_fun_json.ts`, `chess_game_storage_balance_of_fun_json.ts`
  - calls — `chess_game_storage_deposit_fun_json.ts`, `chess_game_create_ai_game_fun_json.ts`, `chess_game_play_move_fun_json.ts`, `chess_game_play_move_with_gas_fun_json.ts`, `chess_game_resign_fun_json.ts`, `chess_game_cancel_fun_json.ts`, `chess_game_challenge_fun_json.ts`, `chess_game_accept_challenge_fun_json.ts`, `chess_game_reject_challenge_fun_json.ts`, `chess_game_join_matchmaking_fun_json.ts`, `chess_game_cancel_matchmaking_fun_json.ts`, `chess_game_claim_points_fun_json.ts`, `chess_game_set_is_agent_fun_json.ts`, `chess_game_storage_withdraw_fun_json.ts`, `chess_game_withdraw_token_fun_json.ts`
  - helpers — `chess_game_challenge_id.ts`
- `bin/chess_game/README.md` — the examples and the flags for these bins

---

#### EXAMPLE — read a game

```sh
# the board, plain and rendered
bun run bin/chess_game/chess_game_get_board.ts \
  --game-id '[113689871,"within4d45.near","marior.near"]'
# -> "RNBQKBNR"
# -> "PPPPPPPP"
# ...

bun run bin/chess_game/chess_game_render_board.ts \
  --game-id '[113689871,"within4d45.near","marior.near"]'
# -> 8♜♞♝♛♚♝♞♜
# -> 7♟♟♟♟♟♟♟♟

# the players, the turn and the bet flag
bun run bin/chess_game/chess_game_game_info.ts \
  --game-id '[113689871,"within4d45.near","marior.near"]'
# -> white: { type: "Human", value: "within4d45.near" }
# -> black: { type: "Human", value: "marior.near" }
# -> turn_color: "White"

# an account, with its active games
bun run bin/chess_game/chess_game_get_account.ts --account-id marior.near
# -> elo: 969.548032325438
# -> wins: 3

bun run bin/chess_game/chess_game_get_game_ids.ts --account-id marior.near
# -> [113689871, "within4d45.near", "marior.near"]
```

the write helpers need a signer, so they need `NEAR_KIT_ACCOUNT_ID` and
`NEAR_KIT_PRIVATE_KEY` in `.env`. the calling shape is:

```ts
import {
  chess_game_create_ai_game_fun_json,
  chess_game_play_move_fun_json,
} from "@near-kit-tool-box/fun";

const game_id: CHESS_GAME_ID_TYPE = [113689871, "within4d45.near", null];
await chess_game_create_ai_game_fun_json(near, "app.chess-game.near", "Easy");
await chess_game_play_move_fun_json(
  near,
  "app.chess-game.near",
  game_id,
  "e2e4",
  50,
);
```

==========================
<br/>
copyright 2026 by sleet.near
