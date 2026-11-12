// app/page.js
// Home dashboard. A server component on purpose: the h1, intro, and JSON-LD
// below are plain HTML that Google reads immediately. Only <Tracker /> runs in
// the browser, because it needs localStorage.

import Tracker from "@/components/Tracker";
import { CATEGORIES, ITEMS, REGIONS } from "@/data/gta6Data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata = {
  // `absolute` skips the "| Leonida Tracker" template; the brand is already in this title.
  title: { absolute: `GTA 6 100% Completion Checklist & Tracker | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: `GTA 6 100% Completion Checklist & Tracker | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
};

// Structured data so search engines understand this is a site with a search box.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escaping "<" stops any data string from ever closing the <script> tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* A compact title block, not a marketing hero. The tracker sits right below it,
          so stats, search, and the first checkboxes are visible without scrolling. */}
      <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <h1 className="font-display text-[28px] font-bold uppercase leading-none tracking-[0.03em] sm:text-[34px]">
            GTA 6 Completion Checklist
          </h1>
          <p className="mt-2 max-w-[60ch] text-sm text-ash">
            Every mission, collectible, stunt jump, vehicle, and property across Leonida. Tick entries off as you
            play; progress saves in this browser.
          </p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash tabular-nums">
          {REGIONS.length} regions · {CATEGORIES.length} categories · {ITEMS.length} entries
        </p>
      </div>

      {/* Honest pre-launch notice: most entries are placeholders until the game ships. */}
      <p className="mb-4 flex items-start gap-2 border-l-2 border-coral bg-panel px-3 py-2 text-[13px] leading-snug text-ash">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-coral">Pre-launch</span>
        <span>
          Regions are confirmed by Rockstar. Entries tagged <span className="font-mono text-bone">TBC</span> are
          placeholders and will be replaced with verified data after November 19.
        </span>
      </p>

      <Tracker />
    </>
  );
}
