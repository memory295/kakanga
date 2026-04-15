import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Kakanga Constructions projects across civil engineering, prefabricated buildings, fabrication, and rehabilitation works in Malawi.",
  alternates: {
    canonical: absoluteUrl("/projects"),
  },
  openGraph: {
    title: "Projects by Kakanga Constructions",
    description:
      "View completed and ongoing construction projects delivered by Kakanga Constructions.",
    url: absoluteUrl("/projects"),
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
