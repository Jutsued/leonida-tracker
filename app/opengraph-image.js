// app/opengraph-image.js
// Social preview image for the home page (and the default for any page that
// doesn't have its own). Next.js finds this file by its name, renders it to a
// PNG at build time, and adds the og:image tags to <head> for us.

import { OG_CONTENT_TYPE, OG_SIZE, TOTALS, renderOgImage } from "@/lib/ogImage";

export const alt = "Leonida Tracker: GTA 6 100% completion checklist";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "100% COMPLETION DATABASE",
    titleLines: ["GTA 6 COMPLETION", "CHECKLIST"],
    stats: `${TOTALS.entries} ENTRIES · ${TOTALS.categories} CATEGORIES · ${TOTALS.regions} REGIONS`,
  });
}
