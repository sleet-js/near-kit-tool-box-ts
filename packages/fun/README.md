# @near-kit-tool-box/fun

Reusable contract functions for common NEAR contracts.

## Installation

```bash
npm install @near-kit-tool-box/fun
bun add @near-kit-tool-box/fun
```

## Usage

```js
import {
  // Greeting contract
  greeting_get_greeting_fun,
  greeting_set_greeting_fun,
  // Rhea/Ref exchange
  ref_get_number_of_pools_function,
  ref_get_pool_function,
  ref_swap_function,
  // FT functions
  ft_balance_of_fun,
  ft_transfer_fun,
  // wrapNEAR
  wrap_near_deposit_fun,
  wrap_near_withdraw_fun,
} from "@near-kit-tool-box/fun";
```

## Features

- Greeting contract functions
- Rhea/Ref exchange functions (view & call)
- FT (Fungible Token) standard functions
- wrapNEAR deposit/withdraw functions

==========================
<br/>
copyright 2026 by sleet.near
