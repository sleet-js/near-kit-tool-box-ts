# @near-kit-tool-box

A monorepo containing three packages for NEAR development:

- **@near-kit-tool-box/web** - Browser-specific NEAR KIT client setup with Hot Wallet Connect
- **@near-kit-tool-box/env** - Backend/environment NEAR KIT client setup with .env support
- **@near-kit-tool-box/fun** - Reusable contract functions for common NEAR contracts

## Installation

```bash
bun add @near-kit-tool-box/web
bun add @near-kit-tool-box/env
bun add @near-kit-tool-box/fun
```

## Usage

### @near-kit-tool-box/web

Browser client with Hot Wallet Connect and localStorage network switching.

```js
import {
  near_kit_client,
  near_connect_client,
  toggle_network,
  set_network_mainnet,
  set_network_testnet,
  get_stored_network_id,
} from "@near-kit-tool-box/web";

import { rhea_ammv2_contractid } from "@near-kit-tool-box/fun";
const id = rhea_ammv2_contractid(get_stored_network_id());
```

### @near-kit-tool-box/env

Backend client with environment variable configuration.

```js
import {
  near_kit_env,
  NEAR_KIT_NETWORK,
  NEAR_KIT_ACCOUNT_ID,
  NEAR_KIT_PRIVATE_KEY,
} from "@near-kit-tool-box/env";

import { rhea_ammv2_contractid } from "@near-kit-tool-box/fun";
const id = rhea_ammv2_contractid(NEAR_KIT_NETWORK);
```

### @near-kit-tool-box/fun

Contract functions (greeting, Rhea/Ref, FT, wrapNEAR, pumpopoly world,
staking pool, NEAR TLD, Sputnik DAO, INTEAR DEX).

```js
import {
  // Greeting
  greeting_get_greeting_fun_json,
  greeting_set_greeting_fun_json,
  // Rhea/Ref (rhea_ammv2)
  rhea_ammv2_get_number_of_pools_fun_json,
  rhea_ammv2_get_pool_fun_json,
  rhea_ammv2_swap_fun_json,
  // FT
  ft_balance_of_fun_json,
  ft_transfer_fun_json,
  // wrapNEAR
  wrap_near_deposit_fun_json,
  wrap_near_withdraw_fun_json,
  // pumpopoly world
  pumpopoly_world_move_player_fun_json,
  // NEAR TLD + local actions
  near_create_account_fun_json,
  near_add_key_fun_json,
  // Staking pool
  pool_get_number_of_accounts_fun_json,
  // INTEAR DEX engine + xyk sub-dex
  intear_dex_engine_registered_assets_of_fun_json,
  intear_dex_xyk_get_pool_fun_json,
  intear_dex_xyk_get_pool_shares_fun_json,
  // Sputnik DAO — the factory and the daos it deploys
  sputnik_dao_get_config_fun_json,
  sputnik_dao_get_proposals_fun_json,
  sputnik_dao_factory_get_dao_list_fun_json,
  // Generic view/call — for any contract not in the toolbox
  generic_contract_view_fun_json,
  generic_contract_call_fun,
  generic_contract_call_wallet,
  // Types
  AMOUNT_INPUT,
  INTEAR_DEX_XYK_POOL_TYPE,
} from "@near-kit-tool-box/fun";
```

### Example

```js
// Browser (web + fun)
import { near_kit_client } from "@near-kit-tool-box/web";
import { greeting_get_greeting_fun_json } from "@near-kit-tool-box/fun";

const near = near_kit_client();
const greeting = await greeting_get_greeting_fun_json(near, "hello.sleet.near");

// Backend (env + fun)
import { near_kit_env } from "@near-kit-tool-box/env";
import { ft_balance_of_fun_json } from "@near-kit-tool-box/fun";

const balance = await ft_balance_of_fun_json(
  near_kit_env,
  "token.near",
  "account.near",
);
```

## Documentation

Development guides:

- [DOCS/DEV_GUIDE.md](./DOCS/DEV_GUIDE.md) — the guide index
  - [setup.md](./DOCS/setup.md) — install, build, env vars, type check
  - [build.md](./DOCS/build.md) — the build pipeline, clean & rebuild
  - [versioning.md](./DOCS/versioning.md) — version sync and publishing
  - [packages.md](./DOCS/packages.md) — the packages, their deps and config
  - [testing.md](./DOCS/testing.md) — the bins as the test harness

Reference:

- [DOCS/SC/](./DOCS/SC/) — one doc per smart contract
- [bin/README.md](./bin/README.md) — the bins
- [tree](./tree) — the repo layout and file naming conventions

==========================
<br/>
copyright 2026 by sleet.near
