import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Kakanga Constructions for project inquiries, quotations, partnerships, and construction consultations in Malawi.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "Contact Kakanga Constructions",
    description:
      "Speak with our team about your construction project, quote request, or partnership opportunity.",
    url: absoluteUrl("/contact"),
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
