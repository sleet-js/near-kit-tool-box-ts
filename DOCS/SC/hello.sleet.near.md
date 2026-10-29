# hello.sleet.near

the greeting smart contract used in the TS fun package

---

#### DETAILS

**CONTRACT ID PER NETWORK**

- MAINNET: hello.sleet.near
- TESTNET: hello.sleet.testnet

```sh
# near cli - get a list of methods
near contract inspect hello.sleet.testnet network-config testnet now
near contract inspect hello.sleet.near network-config mainnet now
```

#### FILES

- `packages/fun/src/lib/methods/methods_greeting.ts`
- `packages/fun/src/lib/const_id/greeting_contract_id_const.ts`
- `packages/fun/src/lib/args/greeting_args.ts`
- `packages/fun/src/fun/greeting/greeting_get_greeting_fun_json.ts`, `packages/fun/src/fun/greeting/greeting_set_greeting_fun_json.ts`
- `bin/hello/hello_get.ts`, `bin/hello/hello_set.ts`
- `bin/hello/README.md` — the examples and the flags for these bins

==========================
<br/>
copyright 2026 by sleet.near
