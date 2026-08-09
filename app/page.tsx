import iconsData from "./icons-data.json";
import { SearchHeader } from "./components/SearchHeader";

interface Icon {
  name: string;
  category: string;
  path: string;
}

const siteUrl = "https://icons.sol.new";

export default function Home() {
  const icons = iconsData.icons as Icon[];
  const categories = iconsData.categories as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Solana Icons",
        description:
          "Open-source icon library for the Solana ecosystem. Free SVG and PNG downloads.",
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#org` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#org`,
        name: "Solana Icons",
        url: siteUrl,
        logo: `${siteUrl}/images/opengraph.png`,
      },
      {
        "@type": "SoftwareApplication",
        name: "Solana Icons",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        url: siteUrl,
        description:
          "Community open-source icon pack for Solana wallets, DEXes, platforms, and brand marks.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        downloadUrl: "https://www.npmjs.com/package/solana-icons",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">
        Solana Icons — open-source SVG and PNG icon library for the Solana ecosystem
      </h1>
      <SearchHeader icons={icons} categories={categories} />
    </div>
  );
}
