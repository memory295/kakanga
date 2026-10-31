import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Updates",
  description: "News, project updates, and announcements from Kakanga Constructions.",
  alternates: { canonical: absoluteUrl("/updates") },
};

export default function UpdatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
