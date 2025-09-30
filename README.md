# Web3Ts — Minimal Funding dApp (TypeScript + Viem)

A simple “Buy Me a Coffee” style decentralized app that lets users fund a deployed FundMe smart contract from the browser. Built with TypeScript, Viem, and Vite. Includes a local Anvil snapshot for quick testing.

## Features
- Connect wallet via MetaMask
- Fund contract with ETH
- Read contract balance
- Withdraw funds (owner)
- TypeScript-first with ESM-compatible imports

## Tech Stack
- TypeScript, Vite (dev server)
- Viem (wallet + public client)
- MetaMask (browser wallet)
- Foundry Anvil (local chain, optional)

## Prerequisites
- Node.js 18+ (recommended)
- MetaMask installed in your browser
- Optional: Foundry Anvil (for local testing)

## Install
- pnpm install
- or: npm install

## Development
- Start dev server: pnpm run dev (or npm run dev)
- Start local chain (optional): pnpm run anvil (or npm run anvil)
  - Uses the provided state: `fundme-anvil.json`
  - Connect MetaMask to http://localhost:8545

## TypeScript Build
- Compile TypeScript: pnpm run compile (or npm run compile)
  - Output goes to `dist/` per `tsconfig.json`

## Usage
1. Start the dev server, then open the printed localhost URL (e.g., http://localhost:5173).
2. Click “Connect” to connect MetaMask.
3. Enter an ETH amount and click “Buy Coffee” to fund.
4. Use “Get Balance” and “Withdraw” as needed.

## Configuration
- Contract address and ABI are in:
  - TypeScript: `constants-ts.ts`
  - JavaScript: `constants.js`
- Update these if you redeploy the contract.

## Notes
- The browser build uses ESM imports; when working in TS with NodeNext, keep explicit `.js` extensions in relative imports.
- For static usage, `index.html` references `index.js` (ESM via CDN). Vite is recommended during development.

## License
ISC
