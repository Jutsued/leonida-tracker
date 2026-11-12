// app/[category]/opengraph-image.js
// One social preview image per category (/story-missions, /collectibles, ...).
// Each card has the category's own name, so a shared collectibles link doesn't
// show the same generic image as the home page.

import { CATEGORIES, getCategory, getItemsByCategory } from "@/data/gta6Data";
import { OG_CONTENT_TYPE, OG_SIZE, TOTALS, renderOgImage } from "@/lib/ogImage";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Leonida Tracker: GTA 6 category checklist";

// Build all five images ahead of time instead of drawing them on each request.
export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

// In Next 16, params is a Promise, so it must be awaited.
export default async function Image({ params }) {
  const { category } = await params;
  const cat = getCategory(category) || CATEGORIES[0];
  const count = getItemsByCategory(cat.slug).length;

  return renderOgImage({
    eyebrow: `CATEGORY / ${cat.prefix}`,
    titleLines: ["GTA 6", cat.name.toUpperCase()],
    stats: `${count} ENTRIES · ${TOTALS.regions} REGIONS · CHECKLIST & TRACKER`,
  });
}
