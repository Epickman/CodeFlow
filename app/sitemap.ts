import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://agustingaleazzidev.com.ar",
      lastModified: new Date("2026-10-20"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
