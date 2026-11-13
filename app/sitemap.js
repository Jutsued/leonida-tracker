// app/sitemap.js
// Next turns this into /sitemap.xml automatically. Built from CATEGORIES and
// STATIC_PAGES (lib/site.js), so a new category or info page shows up in the
// sitemap without touching this file.
//
// No `lastModified: new Date()` on purpose: with Cache Components on, reading the
// current time makes the sitemap render on every request instead of once at build.
// It would also tell Google every page changed today, which it learns to ignore.

import { CATEGORIES } from "@/data/gta6Data";
import { SITE_URL, STATIC_PAGES } from "@/lib/site";

export default function sitemap() {
  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    ...CATEGORIES.map((cat) => ({
      url: `${SITE_URL}/${cat.slug}`,
      changeFrequency: "daily",
      priority: 0.8,
    })),
    ...STATIC_PAGES.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
  ];
}
