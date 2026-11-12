// app/sitemap.js
// Next turns this into /sitemap.xml automatically. Built from CATEGORIES, so a
// new category shows up in the sitemap without touching this file.
//
// No `lastModified: new Date()` on purpose: with Cache Components on, reading the
// current time makes the sitemap render on every request instead of once at build.
// It would also tell Google every page changed today, which it learns to ignore.

import { CATEGORIES } from "@/data/gta6Data";
import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    ...CATEGORIES.map((cat) => ({
      url: `${SITE_URL}/${cat.slug}`,
      changeFrequency: "daily",
      priority: 0.8,
    })),
  ];
}
