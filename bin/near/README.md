# NEAR

TLD registrar + NEAR-level account key bins.

every bin here is a real transaction — they need a signer.

---

#### EXAMPLES

```sh
# call: create a sub-account through the TLD registrar
bun run bin/near/near_create_account.ts \
  --account-id newaccounttests.testnet \
  --public-key ed25519:56CJx1YrTJ6nBmJb8DoXwBm5HLHZcoyAt8FQDmcvkjFE

# call: delete an account, refunding the balance to a beneficiary
bun run bin/near/near_delete_account.ts \
  --signer-id newaccounttests.testnet \
  --beneficiary sleet.testnet

# call: add a full-access key
bun run bin/near/near_add_key.ts \
  --signer-id sleet.testnet \
  --public-key ed25519:HDaBzemF6CYnQ2A3CgAh8vK7stWp5aXvKMKzKDe6s3QZ \
  --permission full-access

# call: add a function-call key (limited access)
bun run bin/near/near_add_key.ts \
  --signer-id sleet.testnet \
  --public-key ed25519:9vnVSMT1hv2Q1vuZzbjStFieqGbTrwqe4KcvfqYAkb5T \
  --permission function-call \
  --receiver-id ref-finance-101.testnet \
  --method-names "add_simple_pool" \
  --allowance "1 NEAR"

# call: delete a key
bun run bin/near/near_delete_key.ts \
  --signer-id sleet.testnet \
  --public-key ed25519:HDaBzemF6CYnQ2A3CgAh8vK7stWp5aXvKMKzKDe6s3QZ
```

#### FLAGS

| bin                     | flags                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `near_create_account.ts` | `--account-id`, `--public-key` (both required), `--tld-contract-id` (optional)             |
| `near_delete_account.ts` | `--signer-id`, `--beneficiary` (both required)                                            |
| `near_add_key.ts`       | `--signer-id`, `--public-key`, `--permission` (all required); `--receiver-id`, `--method-names`, `--allowance` (required for `function-call`) |
| `near_delete_key.ts`    | `--signer-id`, `--public-key` (both required)                                             |

==========================
<br/>
copyright 2026 by sleet.near
