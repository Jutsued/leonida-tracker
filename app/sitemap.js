// app/sitemap.js
// Next turns this into /sitemap.xml automatically. Built from CATEGORIES, so a
// new category shows up in the sitemap without touching this file.

import { CATEGORIES } from "@/data/gta6Data";
import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...CATEGORIES.map((cat) => ({
      url: `${SITE_URL}/${cat.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    })),
  ];
}
