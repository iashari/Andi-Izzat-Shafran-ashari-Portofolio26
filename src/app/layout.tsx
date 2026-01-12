import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import PageTransition from "@/components/PageTransition";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
