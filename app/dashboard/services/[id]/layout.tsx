import { defaultServices } from '@/lib/default-data';

// Generate static params for static export
export async function generateStaticParams() {
  // Generate params for default services
  return defaultServices.map((_, index) => ({
    id: (index + 1).toString(),
  }));
}

// Export the generateStaticParams function and use a layout
export default function ServiceEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}