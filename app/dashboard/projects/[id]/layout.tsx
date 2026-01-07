import { defaultProjects } from '@/lib/default-data';

// Generate static params for static export
export async function generateStaticParams() {
  // Generate params for default projects
  return defaultProjects.map((_, index) => ({
    id: (index + 1).toString(),
  }));
}

// Export the generateStaticParams function and use a layout
export default function ProjectEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}