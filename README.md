# Solana Icons

Open-source icon library for the Solana ecosystem. Like Font Awesome or Lucide, but for Solana projects.

**🌐 [View all icons](https://solana-icons.vercel.app)** | [GitHub](https://github.com/metasolbot/solana-icons)

## Features

✨ **367 icons** across wallets, platforms, infrastructure, and brand assets

**Click any icon to:**
- 📋 Copy SVG code
- ⬇️ Download SVG file
- 🖼️ Download PNG (512px)

## Installation

```bash
npm install solana-icons
```

## Usage

### Import SVG data

```js
import { icons } from 'solana-icons'

// Get a specific icon
const phantomIcon = icons['wallets/phantom']
console.log(phantomIcon.svg) // raw SVG string
```

### Use SVG files directly

SVG files are available at `node_modules/solana-icons/svg/{category}/{name}.svg`

```html
<img src="node_modules/solana-icons/svg/wallets/phantom.svg" />
```

### Use PNG files (512×512)

PNG files are available at `node_modules/solana-icons/png/{category}/{name}.png`

```html
<img src="node_modules/solana-icons/png/platforms/jupiter-exchange.png" />
```

## Icon Categories

| Category | Count |
|---|---|
| platforms | 346 |
| wallets | 15 |
| brand | 5 |
| infrastructure | 1 |

## Available Icons

### Wallets (15)
Phantom, Backpack, Solflare, Coinbase, TipLink, Coin98, Trust Wallet, Magic Eden Wallet, Jupiter Wallet, Ledger, Wallet12, OKX Wallet, Bitget Wallet, Trezor, WalletConnect

### Platforms (346)
Jupiter, Raydium, Orca, Meteora, Kamino, Drift, Jito, Marinade, Sanctum, Marginfi, Magic Eden, Tensor, Metaplex, Helius, Pyth, Squads, Wormhole, and 329 more...

### Brand (5)
Solana brand assets — OPOS color/white, Powered By color/white, Stacked White

### Infrastructure (1)
Triton

## Contributing

Want to add an icon? Open a PR at [github.com/metasolbot/solana-icons](https://github.com/metasolbot/solana-icons)

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT
