import type { Metadata } from "next";
import { Allura, Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/site";
import { SiteShell } from "@/components/site/SiteShell";

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
  display: "swap"
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap"
});

const baseUrl = siteConfig.baseUrl;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Samanyu | AI + Full Stack Portfolio",
    template: "%s | Samanyu"
  },
  description: siteConfig.seoDescription,
  applicationName: "Samanyu Portfolio",
  openGraph: {
    title: "Samanyu | AI + Full Stack Portfolio",
    description: siteConfig.seoDescription,
    type: "website",
    siteName: "Samanyu Portfolio",
    url: baseUrl,
    images: ["/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Samanyu | AI + Full Stack Portfolio",
    description: siteConfig.seoDescription,
    images: ["/twitter-image"]
  },
  alternates: {
    canonical: "/"
  },
  keywords: [
    "Samanyu Reddy Allipuram",
    "AI engineer",
    "full stack developer",
    "Three.js portfolio",
    "Next.js portfolio",
    "Hyderabad engineer"
  ],
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6927325854717324"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${allura.variable} ${archivo.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
