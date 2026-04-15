import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vacancies Test",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VacanciesTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
