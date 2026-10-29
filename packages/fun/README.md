# @near-kit-tool-box/fun

Reusable contract functions for common NEAR contracts.

## Installation

```bash
npm install @near-kit-tool-box/fun
bun add @near-kit-tool-box/fun
```

## Usage

Every helper is named `<contract>_<method>_fun_json` and takes a NEAR KIT
client as its first argument.

```js
import {
  // Greeting contract
  greeting_get_greeting_fun_json,
  greeting_set_greeting_fun_json,
  // Rhea/Ref exchange
  rhea_ammv2_get_number_of_pools_fun_json,
  rhea_ammv2_get_pool_fun_json,
  rhea_ammv2_swap_fun_json,
  // FT functions
  ft_balance_of_fun_json,
  ft_transfer_fun_json,
  // wrapNEAR
  wrap_near_deposit_fun_json,
  wrap_near_withdraw_fun_json,
} from "@near-kit-tool-box/fun";
```

## Features

- Greeting contract functions
- Rhea/Ref exchange functions (view & call)
- FT (Fungible Token) standard functions
- wrapNEAR deposit/withdraw functions
- INTEAR DEX engine and sub-dex functions
- Sputnik DAO factory and DAO functions
- Staking pool, pumpopoly world, and NEAR TLD functions
- `generic_contract_view_fun_json` — a generic view for any contract
- `generic_contract_call_fun` — generic contract-call helper for a near-kit client
- `generic_contract_call_wallet` — generic contract-call helper for a browser wallet
  - See [`src/lib/generic/README.md`](./src/lib/generic/README.md) for the JSON transaction shape

## Contract IDs

Contract ids are network-aware. Resolve them at the call site:

```js
import { rhea_ammv2_contractid } from "@near-kit-tool-box/fun";
import { NEAR_KIT_NETWORK } from "@near-kit-tool-box/env";

const id = rhea_ammv2_contractid(NEAR_KIT_NETWORK);
```

==========================
<br/>
copyright 2026 by sleet.near
