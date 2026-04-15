import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientQueryProvider from "./client-query-provider";
import { AuthProvider } from "@/contexts/auth-context";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  absoluteUrl,
  getSiteUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "construction",
    "Malawi",
    "road construction", 
    "civil engineering",
    "building",
    "infrastructure",
    "prefabricated structures",
    "drilling",
    "blasting",
    "concrete works",
    "land leveling",
    "earthworks",
    "bridge construction",
    "Kakanga",
    "NCIC unlimited category"
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/kakangalogo.png",
        width: 800,
        height: 600,
        alt: "Kakanga Constructions Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/images/kakangalogo.png"],
  },
  icons: {
    icon: [
      { url: "/images/kakangalogo.png", sizes: "16x16", type: "image/png" },
      { url: "/images/kakangalogo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/kakangalogo.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/images/kakangalogo.png",
    apple: [
      { url: "/images/kakangalogo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: getSiteUrl(),
    logo: absoluteUrl("/images/kakangalogo.png"),
    description: SITE_DESCRIPTION,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+265995650428",
        contactType: "customer service",
        areaServed: "MW",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karonga",
      addressCountry: "MW",
    },
    sameAs: [],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <ClientQueryProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {children}
            </TooltipProvider>
          </AuthProvider>
        </ClientQueryProvider>
      </body>
    </html>
  );
}