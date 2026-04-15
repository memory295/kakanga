export const SITE_NAME = "Kakanga Constructions";
export const SITE_TITLE = "Kakanga Constructions - Building Malawi's Future";
export const SITE_DESCRIPTION =
  "KAKANGA CONSTRUCTIONS is a leading construction company in Malawi, specializing in civil works, prefabricated structures, and quality infrastructure delivery.";

export function getSiteUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  if (!envUrl) {
    return "https://kakangaconstructions.com";
  }

  try {
    const normalized = envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;
    return new URL(normalized).origin;
  } catch {
    return "https://kakangaconstructions.com";
  }
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export const PUBLIC_STATIC_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/projects",
  "/services",
  "/vacancies",
  "/policy",
  "/terms",
];
