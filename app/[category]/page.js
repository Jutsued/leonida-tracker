// app/[category]/page.js
// One file serves every category route: /story-missions, /collectibles, etc.
// Each page is pre-rendered at build time with its own title, description,
// and Open Graph tags, which is what lets each category rank on its own.

import { notFound } from "next/navigation";
import Tracker from "@/components/Tracker";
import { CATEGORIES, getCategory, getItemsByCategory } from "@/data/gta6Data";

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

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const count = getItemsByCategory(cat.slug).length;

  return (
    <>
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
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ash tabular-nums">{count} entries</p>
      </div>

      <Tracker categorySlug={cat.slug} />
    </>
  );
}
