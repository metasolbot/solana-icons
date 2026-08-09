import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

const siteUrl = "https://icons.sol.new";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Solana Icons - Open Source Icon Library for Solana Ecosystem",
  description:
    "Beautiful, open-source icon library for the Solana ecosystem. 370+ icons across wallets, platforms, brand, and more. Free SVG and PNG downloads.",
  openGraph: {
    title: "Solana Icons",
    description:
      "Open-source icon library for the Solana ecosystem — 370+ icons, free SVG & PNG",
    type: "website",
    url: siteUrl,
    siteName: "Solana Icons",
    images: [
      {
        url: "/images/opengraph.png?v=3",
        width: 1200,
        height: 630,
        alt: "Solana Icons — open-source icon library for the Solana ecosystem",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solana Icons",
    description:
      "Open-source icon library for the Solana ecosystem — 370+ icons, free SVG & PNG",
    images: [
      {
        url: "/images/opengraph.png?v=3",
        width: 1200,
        height: 630,
        alt: "Solana Icons — open-source icon library for the Solana ecosystem",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  );
}
