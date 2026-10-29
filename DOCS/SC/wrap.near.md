# wrap.near

the wrap.near wNEAR contract (NEP-141 wrapped NEAR)

---

#### DETAILS

**CONTRACT ID PER NETWORK**

- MAINNET: wrap.near
- TESTNET: wrap.testnet

```sh
# near cli - get a list of methods
near contract inspect wrap.testnet network-config testnet now
near contract inspect wrap.near network-config mainnet now
```

#### FILES

- `packages/fun/src/lib/methods/methods_wrap_near.ts`
- `packages/fun/src/lib/const_id/wrap_near_contract_id_const.ts`
- `packages/fun/src/fun/wrap_near/wrap_near_deposit_fun_json.ts`, `packages/fun/src/fun/wrap_near/wrap_near_withdraw_fun_json.ts`
- `bin/wrap_near/wrap_near_deposit.ts`, `bin/wrap_near/wrap_near_withdraw.ts`
- `bin/wrap_near/README.md` — the examples and the flags for these bins

==========================
<br/>
copyright 2026 by sleet.near
