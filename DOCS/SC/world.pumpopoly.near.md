# world.pumpopoly.near

the pumpopoly world monopoly-style game contract

---

#### DETAILS

**CONTRACT ID PER NETWORK**

- MAINNET: world.pumpopoly.near
- TESTNET: world11.ballstone.testnet

> The testnet deployment lives on a different account than the mainnet
> one — the testnet world (and its token / nft / bond / orderbook
> contracts) is deployed under `ballstone.testnet`, not under
> `pumpopoly.testnet`. See `near-config.js` in the testnet dapp:
> <https://testnet.pumpopoly.com/>

```sh
# near cli - get a list of methods
near contract inspect world11.ballstone.testnet network-config testnet now
near contract inspect world.pumpopoly.near network-config mainnet now
```

#### FILES

- `packages/fun/src/lib/methods/methods_pumpopoly_world.ts`
- `packages/fun/src/lib/const_id/pumpopoly_world_contract_id_const.ts`
- `packages/fun/src/fun/pumpopoly_world/pumpopoly_world_move_player_fun_json.ts`, `packages/fun/src/fun/pumpopoly_world/pumpopoly_world_elite_move_fun_json.ts`
- `bin/pumpopoly_world/README.md` — the examples and the flags for these bins

==========================
<br/>
copyright 2026 by sleet.near
