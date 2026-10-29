# @near-kit-tool-box

A monorepo containing three packages for NEAR development:

- **@near-kit-tool-box/web** - Browser-specific NEAR KIT client setup with Hot Wallet Connect
- **@near-kit-tool-box/env** - Backend/environment NEAR KIT client setup with .env support
- **@near-kit-tool-box/fun** - Reusable contract functions for common NEAR contracts

## Quick Start

```bash
bun install
bun update --latest
bun run build
```

## Packages

### @near-kit-tool-box/web

Browser client with Hot Wallet Connect and localStorage network switching.

```js
import {
  near_kit_client,
  near_connect_client,
  toggleNetwork,
  setNetwork_mainnet,
  setNetwork_testnet,
  getStoredNetworkId,
} from "@near-kit-tool-box/web";

import { rhea_ammv2_contractid } from "@near-kit-tool-box/fun";
const id = rhea_ammv2_contractid(getStoredNetworkId());
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
  // Generic view — for any contract not in the toolbox
  near_kit_contract_view_fun_json,
  // Types
  AmountInput,
  INTEAR_DEX_XYK_POOL_TYPE,
} from "@near-kit-tool-box/fun";
```

## Development

```bash
# Build all packages
bun run build

# Build specific package
bun run build:web
bun run build:env
bun run build:fun

# TypeScript check
cd packages/web && bun run tsc --noEmit
cd packages/env && bun run tsc --noEmit
cd packages/fun && bun run tsc --noEmit
```

## Publishing

Each package is independent and can be published separately:

```bash
# Login to npm
bunx npm login

# Publish individual packages
cd packages/web && bun publish --access public
cd packages/env && bun publish --access public
cd packages/fun && bun publish --access public
```

## Usage Example

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

==========================
<br/>
copyright 2026 by sleet.near
