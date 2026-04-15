import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Discover Kakanga Constructions services including civil works, house construction, land grading, and prefabricated structures.",
  alternates: {
    canonical: absoluteUrl("/services"),
  },
  openGraph: {
    title: "Construction Services in Malawi",
    description:
      "Comprehensive construction and civil engineering services delivered by Kakanga Constructions.",
    url: absoluteUrl("/services"),
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
