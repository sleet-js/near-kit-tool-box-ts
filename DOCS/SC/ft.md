# ft

generic NEP-141 / NEP-145 fungible token helpers. The `ft_*_fun_json`
functions apply to any contract that follows the NEP-141 / NEP-145
standards — the `ft_contractId` parameter is supplied by the caller.

---

#### DETAILS

**CONTRACT ID PER NETWORK**

- (varies — pass the contract id yourself)

```sh
# near cli - get a list of methods on a typical FT contract
near contract inspect token.testnet network-config testnet now
```

#### FILES

- `packages/fun/src/lib/methods/methods_ft.ts`
- `packages/fun/src/lib/args/ft_args.ts`
- `packages/fun/src/types/ft_metadata_get_response_type.ts`
- `packages/fun/src/fun/ft/ft_balance_of_fun_json.ts`, `packages/fun/src/fun/ft/ft_total_supply_fun_json.ts`, `packages/fun/src/fun/ft/ft_metadata_fun_json.ts`, `packages/fun/src/fun/ft/ft_transfer_fun_json.ts`, `packages/fun/src/fun/ft/ft_transfer_call_fun_json.ts`, `packages/fun/src/fun/ft/ft_storage_deposit_fun_json.ts`
- `bin/ft/ft_balance_of.ts`, `bin/ft/ft_total_supply.ts`, `bin/ft/ft_metadata.ts`, `bin/ft/ft_transfer.ts`, `bin/ft/ft_transfer_call.ts`, `bin/ft/ft_storage_deposit.ts`
- `bin/ft/README.md` — the examples and the flags for these bins

==========================
<br/>
copyright 2026 by sleet.near
