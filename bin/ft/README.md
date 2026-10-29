# FT

NEP-141 / NEP-145 fungible token bins.

generic — any token contract that follows the standard works. the
contract id has no per-network default, so pass `--contract-id`.

---

#### EXAMPLES

```sh
# view: token metadata
bun run bin/ft/ft_metadata.ts --contract-id shit-237.factory.v10.meme-cooking.testnet

# view: total supply
bun run bin/ft/ft_total_supply.ts --contract-id shit-237.factory.v10.meme-cooking.testnet

# view: balance of an account
bun run bin/ft/ft_balance_of.ts \
  --contract-id shit-237.factory.v10.meme-cooking.testnet \
  --account-id sleet.testnet

# call: register the signer's storage
bun run bin/ft/ft_storage_deposit.ts --contract-id shit-237.factory.v10.meme-cooking.testnet

# call: transfer tokens
bun run bin/ft/ft_transfer.ts \
  --contract-id shit-237.factory.v10.meme-cooking.testnet \
  --receiver-id sleet.testnet \
  --amount 1000000000000000000000

# call: transfer + invoke the receiver's ft_on_transfer
bun run bin/ft/ft_transfer_call.ts \
  --contract-id shit-237.factory.v10.meme-cooking.testnet \
  --receiver-id ref-finance-101.testnet \
  --amount 1000000000000000000000 \
  --msg ""
```

#### FLAGS

| bin                  | flags                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `ft_metadata.ts`     | `--contract-id` (required)                                        |
| `ft_total_supply.ts` | `--contract-id` (required)                                        |
| `ft_balance_of.ts`   | `--contract-id` (required), `--account-id` (required)              |
| `ft_storage_deposit.ts` | `--contract-id` (required)                                     |
| `ft_transfer.ts`     | `--contract-id`, `--receiver-id`, `--amount` (all required)       |
| `ft_transfer_call.ts` | `--contract-id`, `--receiver-id`, `--amount`, `--msg` (all required) |

==========================
<br/>
copyright 2026 by sleet.near
