# near

the `near` (mainnet) / `testnet` (testnet) TLD registrar / linkdrop
contracts. Both share the `near-linkdrop` source — only the deploy
account differs.

---

#### DETAILS

**CONTRACT ID PER NETWORK**

- MAINNET: near
- TESTNET: testnet

```sh
# near cli - get a list of methods
near contract inspect testnet network-config testnet now
near contract inspect near    network-config mainnet now
```

#### FILES

- `packages/fun/src/lib/methods/methods_near.ts`
- `packages/fun/src/lib/const_id/near_tld_contract_id_const.ts` (resolver: `near_tld_contractid(network)`)
- `packages/fun/src/fun/near/near_create_account_fun_json.ts`
- `packages/fun/src/fun/near/near_add_key_fun_json.ts`, `packages/fun/src/fun/near/near_delete_key_fun_json.ts`, `packages/fun/src/fun/near/near_delete_account_fun_json.ts`
- `bin/near/near_create_account.ts`, `bin/near/near_add_key.ts`, `bin/near/near_delete_key.ts`, `bin/near/near_delete_account.ts`
- `bin/near/README.md` — the examples and the flags for these bins

==========================
<br/>
copyright 2026 by sleet.near
