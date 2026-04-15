import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Kakanga Constructions, our mission, vision, values, and experienced construction team in Malawi.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: "About Kakanga Constructions",
    description:
      "Get to know Kakanga Constructions, a trusted Malawian construction company focused on quality and integrity.",
    url: absoluteUrl("/about"),
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
