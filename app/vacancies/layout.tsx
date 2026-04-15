import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Vacancies",
  description:
    "View current job openings at Kakanga Constructions and apply to join our construction and engineering teams.",
  alternates: {
    canonical: absoluteUrl("/vacancies"),
  },
  openGraph: {
    title: "Careers at Kakanga Constructions",
    description:
      "Open roles and career opportunities at Kakanga Constructions in Malawi.",
    url: absoluteUrl("/vacancies"),
  },
};

export default function VacanciesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
