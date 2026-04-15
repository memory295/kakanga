import type { MetadataRoute } from "next";
import { defaultProjects } from "@/lib/default-data";
import { PUBLIC_STATIC_ROUTES, absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = PUBLIC_STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = defaultProjects.map((_, index) => ({
    url: absoluteUrl(`/projects/default-${index}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
