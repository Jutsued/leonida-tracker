// app/[category]/page.js
// One file serves every category route: /story-missions, /collectibles, etc.
// Each page is pre-rendered at build time with its own title, description,
// Open Graph tags, and structured data, which is what lets each category rank
// on its own.

import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import Tracker from "@/components/Tracker";
import { CATEGORIES, getCategory, getItemsByCategory, getRegionName } from "@/data/gta6Data";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Note: there's no `export const dynamicParams = false` here. This project has
// Cache Components turned on (next.config.mjs), and that mode doesn't allow route
// config exports. Unknown slugs like /banana still get a real 404, because
// getCategory() returns null and the page calls notFound() below.

// Tells Next which pages to build ahead of time, so they're served as static HTML (fast + crawlable).
export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

// In Next 15+, `params` is a Promise, so it has to be awaited.
export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};

  return {
    title: cat.seoTitle,
    description: cat.seoDescription,
    alternates: { canonical: `/${cat.slug}` },
    openGraph: {
      type: "website",
      url: `/${cat.slug}`,
      title: cat.seoTitle,
      description: cat.seoDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: cat.seoTitle,
      description: cat.seoDescription,
    },
  };
}

// Structured data for a category page, as one @graph:
// - BreadcrumbList: "Leonida Tracker > Story Missions". Google can show this
//   trail in search results instead of the raw URL.
// - ItemList: the entries on this page, in order. Each entry is a plain "Thing"
//   with its name and a short description, since items don't have their own URLs.
// It's built from the same data the checklist uses, so it can never drift out of sync.
function buildJsonLd(cat, items) {
  const pageUrl = `${SITE_URL}/${cat.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: cat.name, item: pageUrl },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#list`,
        name: `GTA 6 ${cat.name} Checklist`,
        description: cat.seoDescription,
        url: pageUrl,
        numberOfItems: items.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Thing",
            identifier: item.id,
            name: item.name,
            description: `${getRegionName(item.region)} · ${item.difficulty}${item.note ? ` · ${item.note}` : ""}`,
          },
        })),
      },
    ],
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const items = getItemsByCategory(cat.slug);

  return (
    <>
      <JsonLd data={buildJsonLd(cat, items)} />

      <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
            Category / {cat.prefix}
          </p>
          <h1 className="mt-1 font-display text-[28px] font-bold uppercase leading-none tracking-[0.03em] sm:text-[34px]">
            GTA 6 {cat.name}
          </h1>
          <p className="mt-2 max-w-[60ch] text-sm text-ash">{cat.seoDescription}</p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash tabular-nums">{items.length} entries</p>
      </div>

      <Tracker categorySlug={cat.slug} />
    </>
  );
}
