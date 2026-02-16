import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solana Icons - Open Source Icon Library",
  description: "Comprehensive icon library for the Solana ecosystem. Like Font Awesome for Solana. Free and open source.",
  openGraph: {
    title: "Solana Icons",
    description: "Open source icon library for the Solana ecosystem",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
