import { defaultStaff } from '@/lib/default-data';

// Generate static params for static export
export async function generateStaticParams() {
  // Generate params for default staff
  return defaultStaff.map((_, index) => ({
    id: (index + 1).toString(),
  }));
}

// Export the generateStaticParams function and use a layout
export default function StaffEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}