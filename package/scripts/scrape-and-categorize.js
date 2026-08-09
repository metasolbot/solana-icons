#!/usr/bin/env node
/**
 * 1) Pull missing icons from jup-ag/platform-list
 * 2) Copy categorized aliases into empty category folders
 *    (keeps platforms/ flat for backward compat)
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const PKG = path.join(__dirname, "..");
const ROOT = path.join(__dirname, "..", "..");
const SVG = path.join(PKG, "svg");
const WEBP = path.join(PKG, "webp");
const PUB_SVG = path.join(ROOT, "public", "svg");
const PUB_WEBP = path.join(ROOT, "public", "webp");
const TMP = "/tmp/solana-icons-scrape";
const DWEBP = "/opt/homebrew/bin/dwebp";

fs.mkdirSync(TMP, { recursive: true });

/** category -> list of icon stems (lowercase, match filename without ext) */
const CATEGORIES = {
  wallets: [
    "phantom",
    "solflare",
    "backpack",
    "glow",
    "glow-wallet",
    "coinbase",
    "okx",
    "ledger",
    "trezor",
    "trust-wallet",
    "walletconnect",
    "tiplink",
    "bitget",
    "coin98",
    "jupiter-wallet",
    "jupiter-mobile",
    "magic-eden",
    "magiceden-wallet",
    "nufi",
    "ultimate",
    "exodus",
    "brave",
    "slope",
    "torus",
    "mathwallet",
    "safepal",
    "keystone",
    "fireblocks",
    "dynamic",
    "crossmint",
    "wallet12",
  ],
  dexes: [
    "raydium",
    "orca",
    "meteora",
    "phoenix",
    "openbook",
    "aldrin",
    "saber",
    "lifinity",
    "invariant",
    "cropper",
    "goosefx",
    "stepfinance",
    "fluxbeam",
    "crema",
    "symmetry",
    "stabble",
    "byreal",
    "pumpswap",
    "pumpfun",
    "bonkfun",
    "jupiter-exchange",
    "jupiter-pm",
    "1inch",
    "pancakeswap",
    "paraswap",
    "serum",
    "titan",
    "gamma",
    "whalesmarket",
    "hadeswap",
    "tensor", // NFT marketplace often listed dex-adjacent; also in nft
  ],
  protocols: [
    "marinade",
    "jito",
    "sanctum",
    "kamino",
    "drift",
    "marginfi",
    "save",
    "lulo",
    "solayer",
    "lido",
    "jpool",
    "thevault",
    "native-stake",
    "blaze",
    "fragmetric",
    "kyros",
    "loopscale",
    "nxfinance",
    "ratex",
    "reflect",
    "exponent",
    "parcl",
    "hxro",
    "zeta",
    "mango",
    "cypher",
    "port",
    "tulip",
    "friktion",
    "psy",
    "uxd",
    "ratio",
    "hubble",
    "quarry",
    "sunny",
    "tribeca",
    "realms",
    "squads",
    "streamflow",
    "switchboard",
    "pyth",
    "wormhole",
    "debridge",
    "allbridge",
    "mayan",
    "portal",
    "circle",
    "ondo-finance",
    "maple",
    "lombard",
    "renzo",
    "zeus",
    "wbtc",
    "arcium",
    "light",
    "helium",
    "nosana",
    "render",
    "grass",
    "io",
    "tensor",
    "metaplex",
    "underdog",
    "shadow",
    "amppay",
    "helio",
    "sphere",
    "tip",
  ],
  nft: [
    "magiceden",
    "magic-eden",
    "tensor",
    "metaplex",
    "solanart",
    "solsea",
    "exchange-art",
    "holaplex",
    "formfunction",
    "drip",
    "famousfoxfederation",
    "madlads",
    "y00ts",
    "okaybears",
    "degods",
    "claynosaurz",
    "smb",
    "aurory",
    "staratlas",
    "citrus",
    "banx",
    "sharky",
    "underdog",
    "phygitals",
  ],
  gaming: [
    "staratlas",
    "aurory",
    "genopets",
    "honeyland",
    "photofinish",
    "brawl",
    "melee",
    "playsolana",
    "madbears",
    "gofurs",
    "degenapeacademy",
    "cyberfrogs",
    "portals",
    "yaku",
    "picoin",
    "fastpoker",
    "solcasino",
  ],
  payments: [
    "solana-pay",
    "solanapay",
    "helio",
    "tiplink",
    "sphere",
    "coinflow",
    "moonpay",
    "crossmint",
    "amppay",
    "kast",
    "solcard",
    "oobit",
    "bridge",
    "brale",
    "circle",
    "paxos",
    "fiserv",
    "noah",
  ],
  social: [
    "dialect",
    "bonsol",
    "gum",
    "tapestry",
    "alldomains",
    "sns",
    "bonfida",
    "solanaid",
    "superteam",
    "colosseum",
    "moonwalk",
    "layer3",
  ],
  infrastructure: [
    "helius",
    "triton",
    "quicknode",
    "alchemy",
    "genesysgo",
    "extrnode",
    "rpcpool",
    "ironforge",
    "shyft",
    "simplehash",
    "hellomoon",
    "bitquery",
    "solana",
    "solanamobile",
    "anza",
    "firedancer",
    "jito",
    "switchboard",
    "pyth",
    "wormhole",
    "metaplex",
    "squads",
    "clockwork",
    "lightprotocol",
    "light",
    "zkcompression",
    "edgevana",
    "triton",
    "sonarwatch",
    "stepfinance",
  ],
  core: [
    "solana",
    "sol",
    "native-stake",
    "compressed-nft",
    "cnft",
    "blinks",
    "actions",
    "token-2022",
    "token2022",
    "spl-token",
    "solanamobile",
    "seeker",
    "saga",
  ],
};

function createSVG(base64, mimeType = "image/png") {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" width="100" height="100">
  <image href="data:${mimeType};base64,${base64}" width="100" height="100" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
}

function webpToPngBase64(webpPath) {
  const pngPath = webpPath.replace(/\.webp$/i, ".png");
  try {
    execSync(`${DWEBP} "${webpPath}" -o "${pngPath}" -quiet`, { stdio: "pipe" });
    const png = fs.readFileSync(pngPath);
    fs.unlinkSync(pngPath);
    return png.toString("base64");
  } catch {
    return null;
  }
}

async function fetchRemoteList() {
  const res = await fetch(
    "https://api.github.com/repos/jup-ag/platform-list/contents/img",
    { headers: { Accept: "application/vnd.github+json", "User-Agent": "solana-icons-scrape" } }
  );
  const files = await res.json();
  if (!Array.isArray(files)) throw new Error(JSON.stringify(files).slice(0, 200));
  return files.filter((f) => f.name.endsWith(".webp"));
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function findLocalStem(stem) {
  // search all svg categories for stem
  for (const cat of fs.readdirSync(SVG)) {
    const p = path.join(SVG, cat, `${stem}.svg`);
    if (fs.existsSync(p)) return p;
  }
  // hyphen/underscore variants
  const alt = stem.replace(/_/g, "-");
  for (const cat of fs.readdirSync(SVG)) {
    const p = path.join(SVG, cat, `${alt}.svg`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function copyAsset(srcSvg, destCat, destStem) {
  const destDir = path.join(SVG, destCat);
  ensureDir(destDir);
  const dest = path.join(destDir, `${destStem}.svg`);
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(srcSvg, dest);
    return true;
  }
  return false;
}

async function importMissing(remoteFiles) {
  ensureDir(path.join(WEBP, "platforms"));
  ensureDir(path.join(SVG, "platforms"));
  const local = new Set(
    fs
      .readdirSync(path.join(SVG, "platforms"))
      .filter((f) => f.endsWith(".svg"))
      .map((f) => f.replace(/\.svg$/, ""))
  );

  let added = 0;
  let failed = 0;
  for (const file of remoteFiles) {
    const name = file.name.replace(/\.webp$/, "");
    if (local.has(name)) continue;
    const webpDest = path.join(WEBP, "platforms", file.name);
    const svgDest = path.join(SVG, "platforms", `${name}.svg`);
    const tmpWebp = path.join(TMP, file.name);
    try {
      await download(file.download_url, webpDest);
      fs.copyFileSync(webpDest, tmpWebp);
      const pngB64 = webpToPngBase64(tmpWebp);
      let svg;
      if (pngB64) svg = createSVG(pngB64, "image/png");
      else {
        const b64 = fs.readFileSync(webpDest).toString("base64");
        svg = createSVG(b64, "image/webp");
      }
      fs.writeFileSync(svgDest, svg);
      added++;
      process.stdout.write(`+ ${name}\n`);
    } catch (e) {
      failed++;
      console.error(`fail ${name}: ${e.message}`);
    }
  }
  return { added, failed };
}

function categorize() {
  const stats = {};
  for (const [cat, stems] of Object.entries(CATEGORIES)) {
    stats[cat] = { copied: 0, missing: [] };
    ensureDir(path.join(SVG, cat));
    const uniq = [...new Set(stems.map((s) => s.toLowerCase()))];
    for (const stem of uniq) {
      const src = findLocalStem(stem);
      if (!src) {
        stats[cat].missing.push(stem);
        continue;
      }
      // destination name: normalize magic-eden / magiceden
      let destStem = stem;
      if (stem === "magic-eden") destStem = "magic-eden";
      if (stem === "magiceden") destStem = "magiceden";
      if (copyAsset(src, cat, destStem)) stats[cat].copied++;
      else {
        // already present
      }
    }
  }
  return stats;
}

function syncPublic() {
  // mirror package/svg -> public/svg and package/webp -> public/webp
  execSync(`mkdir -p "${PUB_SVG}" "${PUB_WEBP}" && cp -R "${SVG}/." "${PUB_SVG}/" && cp -R "${WEBP}/." "${PUB_WEBP}/"`, {
    stdio: "inherit",
  });
}

function countAll() {
  const out = {};
  for (const cat of fs.readdirSync(SVG)) {
    const d = path.join(SVG, cat);
    if (!fs.statSync(d).isDirectory()) continue;
    out[cat] = fs.readdirSync(d).filter((f) => f.endsWith(".svg")).length;
  }
  return out;
}

async function main() {
  console.log("Fetching Jupiter platform-list…");
  const remote = await fetchRemoteList();
  console.log(`Remote: ${remote.length}`);
  const imp = await importMissing(remote);
  console.log(`Imported missing: +${imp.added} fail=${imp.failed}`);

  console.log("Categorizing…");
  const stats = categorize();
  for (const [cat, s] of Object.entries(stats)) {
    console.log(
      `  ${cat}: copied ${s.copied}, still missing ${s.missing.length}${
        s.missing.length ? " → " + s.missing.slice(0, 12).join(", ") : ""
      }`
    );
  }

  syncPublic();
  console.log("Counts:", countAll());
  fs.writeFileSync(
    "/tmp/solana-icons-scrape-report.json",
    JSON.stringify({ imported: imp, categorize: stats, counts: countAll() }, null, 2)
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
