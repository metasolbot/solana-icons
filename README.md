<p align="center">
  <img src="https://solana-icons.vercel.app/og-image.png" alt="Solana Icons" width="600" />
</p>

<h1 align="center">Solana Icons</h1>

<p align="center">
  <strong>780+ open-source icons for the Solana ecosystem</strong><br/>
  Like Lucide or Font Awesome — but for Solana projects.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/solana-icons"><img src="https://img.shields.io/npm/v/solana-icons?color=blue" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/solana-icons"><img src="https://img.shields.io/npm/dm/solana-icons?color=green" alt="npm downloads" /></a>
  <a href="https://github.com/metasolbot/solana-icons/stargazers"><img src="https://img.shields.io/github/stars/metasolbot/solana-icons?style=social" alt="GitHub stars" /></a>
  <a href="https://github.com/metasolbot/solana-icons/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/solana-icons" alt="License" /></a>
</p>

<p align="center">
  <a href="https://solana-icons.vercel.app">🌐 Browse Icons</a> · 
  <a href="#installation">📦 Install</a> · 
  <a href="#usage">🚀 Usage</a> · 
  <a href="#contributing">🤝 Contribute</a>
</p>

---

## Why Solana Icons?

Every Solana app needs wallet logos, DEX icons, and protocol branding. Instead of hunting down SVGs from 50 different sources, just:

```bash
npm install solana-icons
```

One package. 780+ icons. Every major wallet, DEX, protocol, and platform in the Solana ecosystem.

## Installation

```bash
# npm
npm install solana-icons

# yarn
yarn add solana-icons

# pnpm
pnpm add solana-icons
```

## Usage

### Import SVG data (JS/TS)

```js
import { icons } from 'solana-icons'

const phantomIcon = icons['wallets/phantom']
console.log(phantomIcon.svg) // raw SVG string
```

### Use SVG files directly

```html
<img src="node_modules/solana-icons/svg/wallets/phantom.svg" alt="Phantom" />
```

### Use PNG files (512×512)

```html
<img src="node_modules/solana-icons/png/platforms/jupiter-exchange.png" alt="Jupiter" />
```

### Framework Examples

**React / Next.js**
```jsx
import { icons } from 'solana-icons'

function WalletIcon({ name, size = 24 }) {
  return (
    <div 
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: icons[name]?.svg }} 
    />
  )
}

// Usage
<WalletIcon name="wallets/phantom" size={32} />
```

**Image tag (any framework)**
```jsx
<img src={`https://unpkg.com/solana-icons/svg/wallets/phantom.svg`} width={24} height={24} />
```

## Icon Categories

| Category | Count | Examples |
|---|---|---|
| **Platforms** | 346 | Jupiter, Raydium, Orca, Meteora, Kamino, Drift, Jito, Magic Eden |
| **Wallets** | 15 | Phantom, Backpack, Solflare, Coinbase, TipLink, Ledger, OKX |
| **Brand** | 5 | Solana logos — OPOS, Powered By, Stacked |
| **Infrastructure** | 2 | Triton, Helius |
| **Protocols** | 1+ | Marinade, Sanctum, and more |
| **DEXes** | 1+ | Specialized DEX icons |
| **NFT** | 1+ | Metaplex, Tensor |
| **Gaming** | 1+ | Solana gaming ecosystem |
| **Social** | 1+ | Social platforms |
| **Payments** | 1+ | Payment solutions |

**[Browse all 780+ icons →](https://solana-icons.vercel.app)**

## Used By

Projects using solana-icons in production:

- [sol.new](https://sol.new) — Zero-friction Solana token launcher
- [clawbook.lol](https://clawbook.lol) — Decentralized social network for AI agents
- [thestabletable.com](https://thestabletable.com) — Solana stablecoin analytics
- [devrels.xyz](https://devrels.xyz) — Solana DevRels community directory
- [stocksonsolana.com](https://stocksonsolana.com) — Tokenized stock screener
- [solanaanz.org](https://solanaanz.org) — Solana Australia & New Zealand

*Using solana-icons? [Open a PR](https://github.com/metasolbot/solana-icons/pulls) to add your project!*

## CDN Usage

Use icons directly via unpkg or jsdelivr — no install needed:

```
https://unpkg.com/solana-icons@latest/svg/wallets/phantom.svg
https://cdn.jsdelivr.net/npm/solana-icons@latest/svg/wallets/phantom.svg
```

## Contributing

We welcome contributions! Whether it's adding missing icons, improving existing ones, or fixing SVG optimization.

### Quick Start

1. Fork the repo
2. Add your SVG to the appropriate category folder in `svg/`
3. Follow the [design specs](./CONTRIBUTING.md) (24x24 viewBox, clean paths)
4. Open a PR

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

### Missing an icon?

[Open an issue](https://github.com/metasolbot/solana-icons/issues/new) with the project name and we'll add it.

## Roadmap

- [x] ~~SVG collection (780+ icons)~~
- [x] ~~npm package~~
- [x] ~~Icon browser website~~
- [ ] React component library (`solana-icons-react`)
- [ ] Vue / Svelte components
- [ ] Figma plugin
- [ ] Web font generation

## License

MIT — free for personal and commercial use.

---

<p align="center">
  <strong>⭐ Star this repo if it saved you time!</strong><br/>
  Built with 🦞 by <a href="https://metasal.xyz">metasal</a>
</p>
