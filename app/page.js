// app/page.js
// Home dashboard. A server component on purpose: the h1, intro, and JSON-LD
// below are plain HTML that Google reads immediately. Only <Tracker /> runs in
// the browser, because it needs localStorage.

import JsonLd from "@/components/JsonLd";
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

// Structured data (schema.org) so Google understands what this page is.
// @graph lets one script describe two connected things:
// - WebSite: the site itself (name, URL), which helps Google show the right site name.
// - WebApplication: the tracker as a free, browser-based tool. `offers` with price 0
//   marks it as free; `featureList` describes what it does in plain words.
// The "@id" values let the two nodes reference each other without repeating data.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      applicationCategory: "GameApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and localStorage.",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        `${ITEMS.length} checklist entries across ${CATEGORIES.length} categories`,
        `Filter by ${REGIONS.length} Leonida regions: ${REGIONS.map((r) => r.name).join(", ")}`,
        "Progress saved locally in the browser, no account required",
        "JSON export and import for backups",
      ],
      about: { "@type": "VideoGame", name: "Grand Theft Auto VI" },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
  ],
};

// Launch status for the notice above the tracker. A category counts as verified
// only when every one of its entries is.
const verifiedCount = ITEMS.filter((item) => item.verified).length;
const verifiedCategories = CATEGORIES.filter((cat) =>
  ITEMS.filter((item) => item.category === cat.slug).every((item) => item.verified)
);
const pendingCategories = CATEGORIES.filter((cat) => !verifiedCategories.includes(cat));

// "A", "A and B", "A, B, and C"
function listNames(cats) {
  const names = cats.map((cat) => cat.name);
  if (names.length <= 2) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`;
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />

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

      {/* Data-status notice, computed from the data at build time so it can't go stale:
          it names which categories are fully verified and which still hold TBC
          placeholders. Once everything is verified, it disappears on its own. */}
      {pendingCategories.length > 0 && (
        <p className="mb-4 flex items-start gap-2 border-l-2 border-teal bg-panel px-3 py-2 text-[13px] leading-snug text-ash">
          <span className="shrink-0 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em] text-teal">
            Launch
          </span>
          <span>
            {verifiedCategories.length > 0 && (
              <>
                <span className="text-bone">{listNames(verifiedCategories)}</span> verified:{" "}
                <span className="font-mono tabular-nums text-bone">{verifiedCount}</span> of {ITEMS.length} entries.{" "}
              </>
            )}
            {listNames(pendingCategories)} still use pre-launch placeholders tagged{" "}
            <span className="font-mono text-bone">TBC</span>, replaced as launch data is confirmed.
          </span>
        </p>
      )}

      <Tracker />
    </>
  );
}
