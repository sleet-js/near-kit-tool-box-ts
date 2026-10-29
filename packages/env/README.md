# @near-kit-tool-box/env

Backend/environment NEAR KIT client setup with `.env` file support.

## Installation

```bash
npm install @near-kit-tool-box/env
bun add @near-kit-tool-box/env
```

## Usage

```js
import {
  near_kit_env,
  NEAR_KIT_NETWORK,
  NEAR_KIT_ACCOUNT_ID,
  NEAR_KIT_PRIVATE_KEY,
} from "@near-kit-tool-box/env";
```

## Environment Setup

Create a `.env` file:

```env
NEAR_KIT_NETWORK=testnet
# NEAR_KIT_NETWORK=mainnet

NEAR_KIT_ACCOUNT_ID=your-account.near
NEAR_KIT_PRIVATE_KEY=ed25519:your-private-key
```

No `export` prefix needed — dotenv loads `.env` from the current working
directory automatically. (An `export` prefix is also parsed, if you prefer it.)

## Features

- Environment variable configuration (upper-snake `NEAR_KIT_*` env vars)
- Backend/script-friendly NEAR KIT client
- `NEAR_KIT_NETWORK` is constrained to `"mainnet"` or `"testnet"` — for custom RPC URLs, build a `Near` instance directly
- The `NEAR_KIT_` prefix avoids colliding with the generic `NEAR_*` env vars read by the `near-kit` library itself

==========================
<br/>
copyright 2026 by sleet.near
