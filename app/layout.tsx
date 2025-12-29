import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coraline Labs | Digital Systems for Premium Businesses",
  description:
    "We design and build dependable digital systems for businesses that value longevity, quality, and calm execution. Brand identity, websites, custom platforms, and ongoing support.",
  keywords: [
    "digital agency",
    "web development",
    "brand identity",
    "custom software",
    "Costa Rica",
    "Nosara",
  ],
  authors: [{ name: "Coraline Labs" }],
  openGraph: {
    title: "Coraline Labs | Digital Systems for Premium Businesses",
    description:
      "We design and build dependable digital systems for businesses that value longevity, quality, and calm execution.",
    url: "https://coralinelabs.com",
    siteName: "Coraline Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coraline Labs | Digital Systems for Premium Businesses",
    description:
      "We design and build dependable digital systems for businesses that value longevity, quality, and calm execution.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
