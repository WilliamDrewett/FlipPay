I already have the frontend implemented, which:

- Connects MetaMask (Ethereum)
- Connects Polkadot.js extension (e.g., Talisman, Polkadot.js)
- Calls a backend API endpoint `/swap` with the JSON payload:

{
  "fromEthToDot": true/false,
  "payAmount": "..."
  "ethAddress": "...",
  "dotAddress": "...",
}

Your task is to build **everything else except the frontend**, respecting these constraints:

❗ Constraints:
- Must use Fusion+ for the swap on Ethereum only
- Can reuse existing 1inch Solidity contracts for EVM side, but custom escrow contracts must be written in Rust using ink!
- No EVM parachains on Polkadot (no Moonbeam, no Astar, etc.)
- Can deploy on PolkaVM (supports Solidity/Rust/ink!) or AssetHub
- Goal: perform a cross-chain swap ETH ↔ DOT

---

🧠 What you must implement:

1. Backend in TypeScript (Node.js):
   - Receive `/swap` request with JSON body containing `ethAddress`, `dotAddress`, and `amount`.
   - Use Fusion+ API to swap ETH → USDC on Ethereum.
   - Use Snowbridge to bridge USDC tokens from Ethereum to Polkadot.
   - Track transaction and bridge status; report progress back to frontend.
   - Handle errors properly.
   - Note: We already have a `bridges` folder with Snowbridge integration work completed. feel free to use it, move it, fusion it etc.. it is your's

2. Ink! smart contract (Rust):
   - Write a minimal ink! smart contract to deploy on Polkadot (Substrate/PolkaVM/AssetHub).
   - This contract must be able to receive the bridged tokens.
   - Optionally emit events or notifications on receipt.

3. Documentation and instructions on how to:
   - Set up and call Fusion+ API
   - Integrate Snowbridge bridging
   - Deploy and interact with the ink! smart contract
   - Configure environment variables

Note: Do NOT implement the frontend; it is already done.

Please provide TypeScript backend code and ink! smart contract code with explanations.

---

Thank you!
