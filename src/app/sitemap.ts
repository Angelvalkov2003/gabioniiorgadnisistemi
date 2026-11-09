import type { MetadataRoute } from "next";
import { cities } from "@/config/site";
import { services } from "@/content/services";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({ url: `${siteUrl}/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...cities.map((c) => ({ url: `${siteUrl}/gradove/${c.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${siteUrl}/politika-za-poveritelnost`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
