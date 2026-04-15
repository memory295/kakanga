import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CoreValues from "@/components/CoreValues";
import Contact from "@/components/Contact";
import Services from "@/components/Services";
import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Home",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
  },
};

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <CoreValues />
      <Contact />
    </Layout>
  );
}