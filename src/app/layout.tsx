import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://izzat-portofolio26.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "A. Izzat Shafran Ashari - Graphic Designer & Full Stack Developer",
    template: "%s | Izzat Portfolio",
  },
  description: "Portfolio of A. Izzat Shafran Ashari - A passionate Graphic Designer and Full Stack Developer specializing in React, Next.js, and UI/UX Design. LKS National Medalion of Excellence winner.",
  keywords: [
    "A. Izzat Shafran Ashari",
    "portfolio",
    "graphic designer",
    "full stack developer",
    "front-end developer",
    "UI/UX designer",
    "web developer",
    "React",
    "Next.js",
    "TypeScript",
    "Indonesia",
    "Makassar",
  ],
  authors: [{ name: "A. Izzat Shafran Ashari", url: siteUrl }],
  creator: "A. Izzat Shafran Ashari",
  publisher: "A. Izzat Shafran Ashari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Izzat Portfolio",
    title: "A. Izzat Shafran Ashari - Graphic Designer & Full Stack Developer",
    description: "Portfolio of A. Izzat Shafran Ashari - A passionate Graphic Designer and Full Stack Developer specializing in React, Next.js, and UI/UX Design.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "A. Izzat Shafran Ashari Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A. Izzat Shafran Ashari - Graphic Designer & Full Stack Developer",
    description: "Portfolio of A. Izzat Shafran Ashari - A passionate Graphic Designer and Full Stack Developer.",
    images: ["/og-image.png"],
    creator: "@izzatshafran",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <StructuredData />
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.github.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
// Preview deployment test
