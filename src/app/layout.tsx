import type { Metadata } from "next";
import { Sora, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap"
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samanyu-portfolio.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Samanyu | Interactive Developer Portfolio",
    template: "%s | Samanyu"
  },
  description:
    "An immersive portfolio journey built around live GitHub work: AI systems, mobile products, interactive storytelling, and product-led engineering.",
  metadataBase: new URL(siteUrl),
  applicationName: "Samanyu Portfolio",
  keywords: [
    "Samanyu",
    "developer portfolio",
    "Next.js portfolio",
    "AI engineer",
    "creative developer",
    "product storyteller",
    "interactive portfolio"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Samanyu | Interactive Developer Portfolio",
    description:
      "A cinematic, GitHub-driven portfolio experience with project chapters, motion systems, and immersive deep dives.",
    url: siteUrl,
    siteName: "Samanyu Portfolio",
    images: ["/opengraph-image"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Samanyu | Interactive Developer Portfolio",
    description:
      "A cinematic, GitHub-driven portfolio experience with project chapters, motion systems, and immersive deep dives.",
    images: ["/twitter-image"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${spaceMono.variable} font-sans antialiased`}
        style={{ background: "#07060e", color: "#f0eeff" }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
