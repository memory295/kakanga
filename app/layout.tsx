import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientQueryProvider from "./client-query-provider";

export const metadata: Metadata = {
  title: {
    default: "Kakanga Constructions - Building Malawi's Future",
    template: "%s | Kakanga Constructions"
  },
  description: "Kakanga Constructions is a leading Civil and Building Construction Company in Malawi. We specialize in road construction, land leveling, drilling, concrete works, and civil engineering. Building with quality and integrity to move Malawi forward.",
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
  authors: [{ name: "Kakanga Constructions" }],
  creator: "Kakanga Constructions",
  publisher: "Kakanga Constructions",
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
    url: "https://kakangaconstructions.com",
    siteName: "Kakanga Constructions",
    title: "Kakanga Constructions - Building Malawi's Future",
    description: "Leading Civil and Building Construction Company in Malawi. We build with integrity, deliver with pride.",
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
    title: "Kakanga Constructions",
    description: "Leading Civil and Building Construction Company in Malawi.",
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
    canonical: "https://kakangaconstructions.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientQueryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </ClientQueryProvider>
      </body>
    </html>
  );
}