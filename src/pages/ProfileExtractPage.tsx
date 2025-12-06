import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Configure worker from CDN to avoid bundler worker setup
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

type Section = {
  title: string;
  content: string;
};

const heuristicsExtract = (text: string): Section[] => {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const sections: Section[] = [];
  const titles = [
    "Mission",
    "Vision",
    "Core Values",
    "Services",
    "Projects",
    "Equipment",
    "Certifications",
    "Policies",
    "Health and Safety",
    "Contact",
  ];

  let current: Section | null = null;
  for (const line of lines) {
    const matchTitle = titles.find((t) => line.toLowerCase().includes(t.toLowerCase()));
    if (matchTitle) {
      if (current) sections.push(current);
      current = { title: matchTitle, content: "" };
      continue;
    }
    if (!current) {
      current = { title: "Overview", content: line };
    } else {
      current.content += (current.content ? "\n" : "") + line;
    }
  }
  if (current) sections.push(current);
  return sections;
};

const ProfileExtractPage = () => {
  const [sections, setSections] = useState<Section[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument("/kakanga-profile.pdf");
        const pdf = await loadingTask.promise;
        const pageTexts: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items
            .map((item: any) => (typeof item.str === "string" ? item.str : ""))
            .filter(Boolean);
          pageTexts.push(strings.join(" \n "));
        }
        const fullText = pageTexts.join("\n\n");
        setSections(heuristicsExtract(fullText));
      } catch (e: any) {
        setError(e?.message || "Failed to extract PDF content");
      }
    };
    load();
  }, []);

  return (
    <Layout>
      <div className="container-wide py-16">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Profile Extraction</h1>
        <p className="text-muted-foreground mb-6">
          Automatically extracted sections from the Kakanga Constructions profile PDF.
        </p>
        {error && <div className="text-destructive mb-4">{error}</div>}
        {!sections && !error && <div>Extracting content...</div>}
        {sections && (
          <div className="space-y-8">
            {sections.map((s, idx) => (
              <section key={idx} className="border rounded-md p-4">
                <h2 className="font-heading text-xl md:text-2xl font-semibold mb-2">{s.title}</h2>
                <pre className="whitespace-pre-wrap text-sm md:text-base text-muted-foreground">{s.content}</pre>
              </section>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfileExtractPage;
