// components/Tracker.js
// The interactive part of the site: progress header, export/import, search,
// filters, and the checklist itself. Used by the home page (all categories) and
// by each category page (pass `categorySlug` to show just that category).
//
// It's a client component because it needs state, localStorage, and file
// downloads. The pages around it stay server components, so the SEO metadata and
// headings are still rendered as plain HTML for Google.
"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { CATEGORIES, ITEMS, REGIONS, getRegionName } from "@/data/gta6Data";
import { useProgress } from "@/lib/useProgress";
import { CategoryIcon, IconClose, IconDownload, IconSearch, IconUpload } from "@/components/Icons";

// One focus style reused everywhere, so every interactive element shows the
// same teal ring for keyboard users (and nothing for mouse clicks).
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

// Desktop column widths for the checklist "table". Shared by the header row and
// every item row so the columns always line up.
const ROW_GRID = "md:grid-cols-[20px_64px_minmax(0,1fr)_128px_116px_64px]";

const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed" },
  { id: "remaining", label: "Remaining" },
];

// Rounds DOWN to one decimal, so the header can only ever read 100.0%
// when every single item is actually checked.
function formatPercent(doneCount, total) {
  if (total === 0) return "0.0";
  return (Math.floor((doneCount / total) * 1000) / 10).toFixed(1);
}

export default function Tracker({ categorySlug = null }) {
  const { done, ready, toggle, replaceAll } = useProgress();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [region, setRegion] = useState("all");
  const [notice, setNotice] = useState("");
  const fileInputRef = useRef(null);

  // Which items this page is about: everything on the home page, one category elsewhere.
  const scopeItems = useMemo(
    () => (categorySlug ? ITEMS.filter((item) => item.category === categorySlug) : ITEMS),
    [categorySlug]
  );

  // Totals for the header. Always site-wide, so the "100%" number is the same on every page.
  const stats = useMemo(() => {
    const byCategory = {};
    for (const cat of CATEGORIES) byCategory[cat.slug] = { done: 0, total: 0 };

    let totalDone = 0;
    for (const item of ITEMS) {
      byCategory[item.category].total += 1;
      if (done[item.id]) {
        byCategory[item.category].done += 1;
        totalDone += 1;
      }
    }
    return { totalDone, total: ITEMS.length, byCategory };
  }, [done]);

  // How many items each region has on this page (shown inside the region pills).
  const regionCounts = useMemo(() => {
    const counts = {};
    for (const item of scopeItems) counts[item.region] = (counts[item.region] || 0) + 1;
    return counts;
  }, [scopeItems]);

  // Apply search + filters. With a few hundred items, a plain filter on every
  // keystroke is instant, so there's no need for debouncing or a search library.
  const visibleItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    return scopeItems.filter((item) => {
      const isDone = Boolean(done[item.id]);
      if (status === "completed" && !isDone) return false;
      if (status === "remaining" && isDone) return false;
      if (region !== "all" && item.region !== region) return false;
      if (!q) return true;

      const haystack = `${item.id} ${item.name} ${item.note} ${item.reward} ${getRegionName(item.region)}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [scopeItems, done, query, status, region]);

  // Group the filtered list by category, in the same order as CATEGORIES.
  const groups = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      category: cat,
      items: visibleItems.filter((item) => item.category === cat.slug),
    })).filter((group) => group.items.length > 0);
  }, [visibleItems]);

  const hasActiveFilters = query !== "" || status !== "all" || region !== "all";

  function resetFilters() {
    setQuery("");
    setStatus("all");
    setRegion("all");
  }

  // ---- Backup: export -------------------------------------------------------
  function handleExport() {
    const payload = {
      app: "leonida-tracker",
      version: 1,
      exportedAt: new Date().toISOString(),
      completed: Object.keys(done),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // A temporary <a download> is the simplest way to trigger a file save without a library.
    const link = document.createElement("a");
    link.href = url;
    link.download = `leonida-tracker-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url); // free the memory the blob was using

    setNotice(`Exported ${payload.completed.length} completed entries.`);
  }

  // ---- Backup: import -------------------------------------------------------
  async function handleImport(event) {
    const file = event.target.files?.[0];
    // Clear the input so choosing the same file twice still fires onChange.
    event.target.value = "";
    if (!file) return;

    try {
      const data = JSON.parse(await file.text());
      if (!Array.isArray(data?.completed)) throw new Error("Missing 'completed' list");

      // Only accept IDs that exist in our data, so a bad file can't add junk keys.
      const knownIds = new Set(ITEMS.map((item) => item.id));
      const next = {};
      let skipped = 0;
      for (const id of data.completed) {
        if (knownIds.has(id)) next[id] = true;
        else skipped += 1;
      }

      replaceAll(next);
      const count = Object.keys(next).length;
      setNotice(`Imported ${count} entries${skipped ? `, skipped ${skipped} unknown` : ""}.`);
    } catch {
      setNotice("Import failed: that file isn't a Leonida Tracker backup.");
    }
  }

  const percent = formatPercent(stats.totalDone, stats.total);

  return (
    <div className="space-y-4">
      {/* ================= Progress header ================= */}
      <section aria-labelledby="progress-heading" className="rounded-[2px] border border-line bg-panel">
        <div className="flex flex-wrap items-end justify-between gap-4 p-4">
          <div>
            <h2
              id="progress-heading"
              className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-ash"
            >
              Total completion
            </h2>
            <p className="mt-1 font-mono text-4xl font-medium leading-none tabular-nums">
              {/* "--.-" until localStorage is read, so a returning player never sees a fake 0.0%. */}
              {ready ? percent : "--.-"}
              <span className="ml-0.5 text-xl text-ash">%</span>
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-ash tabular-nums">
              {ready ? stats.totalDone : "--"} / {stats.total} entries logged
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleExport}
              className={`flex h-9 items-center gap-2 rounded-[2px] border border-line px-3 font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-ash transition-colors hover:border-ash/50 hover:text-bone ${FOCUS}`}
            >
              <IconDownload size={16} />
              Export
            </button>
            {/* The real file input is hidden; this button forwards the click to it,
                because native file inputs can't be styled to match the design. */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`flex h-9 items-center gap-2 rounded-[2px] border border-line px-3 font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-ash transition-colors hover:border-ash/50 hover:text-bone ${FOCUS}`}
            >
              <IconUpload size={16} />
              Import
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleImport}
              className="sr-only"
              tabIndex={-1}
              aria-label="Import progress backup file"
            />
          </div>
        </div>

        {/* Thin progress rail. role="progressbar" gives screen readers the same number sighted users see. */}
        <div
          role="progressbar"
          aria-label="Total completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={ready ? Number(percent) : 0}
          className="h-1 bg-line"
        >
          <div className="h-full bg-teal transition-[width] duration-300" style={{ width: `${ready ? percent : 0}%` }} />
        </div>

        {/* Category breakdown. These are real links (not buttons) so Google can
            follow them to each category page, which helps those pages get indexed. */}
        <nav aria-label="Categories">
          {/* gap-px over a bg-line background = perfect 1px dividers between cells, no double borders. */}
          {/* 5 categories in a 2-column grid leaves a hole, so the last cell spans both columns on mobile. */}
          <ul className="grid grid-cols-2 gap-px bg-line md:grid-cols-5 [&>li:last-child:nth-child(odd)]:col-span-2 md:[&>li:last-child:nth-child(odd)]:col-span-1">
            {CATEGORIES.map((cat) => {
              const s = stats.byCategory[cat.slug];
              const isCurrent = cat.slug === categorySlug;
              const isComplete = ready && s.total > 0 && s.done === s.total;
              return (
                <li key={cat.slug} className="bg-panel">
                  <Link
                    href={`/${cat.slug}`}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`flex h-11 items-center justify-between gap-2 border-t-2 px-3 transition-colors ${FOCUS} focus-visible:-outline-offset-2 ${
                      isCurrent ? "border-coral text-bone" : "border-transparent text-ash hover:text-bone"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <CategoryIcon name={cat.icon} size={16} />
                      <span className="truncate font-display text-[13px] font-semibold uppercase tracking-[0.08em]">
                        {cat.short}
                      </span>
                    </span>
                    <span className={`font-mono text-[11px] tabular-nums ${isComplete ? "text-teal" : ""}`}>
                      {ready ? s.done : "-"}/{s.total}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>

      {/* ================= Search + filters ================= */}
      <section aria-label="Search and filters" className="space-y-3">
        <div className="relative">
          <label htmlFor="tracker-search" className="sr-only">
            Search checklist
          </label>
          <IconSearch size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ash" />
          <input
            id="tracker-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, ID, region, or reward"
            autoComplete="off"
            spellCheck={false}
            className="h-11 w-full rounded-[2px] border border-line bg-panel pl-9 pr-10 text-[15px] text-bone placeholder:text-ash/70 focus-visible:border-teal focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className={`absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-[2px] text-ash hover:text-bone ${FOCUS}`}
            >
              <IconClose size={14} />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4">
          <div role="group" aria-label="Filter by status" className="flex gap-1.5">
            {STATUS_FILTERS.map((f) => (
              <FilterPill key={f.id} active={status === f.id} onClick={() => setStatus(f.id)}>
                {f.label}
              </FilterPill>
            ))}
          </div>

          <span className="hidden h-8 w-px bg-line md:block" aria-hidden="true" />

          {/* Scrolls sideways on phones instead of wrapping into a messy 3-line block. */}
          <div
            role="group"
            aria-label="Filter by region"
            className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0"
          >
            <FilterPill active={region === "all"} onClick={() => setRegion("all")}>
              All regions
            </FilterPill>
            {REGIONS.map((r) => (
              <FilterPill
                key={r.id}
                active={region === r.id}
                onClick={() => setRegion(r.id)}
                count={regionCounts[r.id] || 0}
                title={r.blurb}
              >
                {r.name}
              </FilterPill>
            ))}
          </div>
        </div>

        {/* Results count + status messages. aria-live announces imports/exports to screen readers.
            Fixed h-5 so a message appearing doesn't push the list down. */}
        <div className="flex h-5 items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ash tabular-nums">
          <p>
            Showing <span className="text-bone">{visibleItems.length}</span> / {scopeItems.length}
          </p>
          <p aria-live="polite" className="truncate text-teal">
            {notice}
          </p>
        </div>
      </section>

      {/* ================= Checklist ================= */}
      <section aria-label="Checklist" className="overflow-hidden rounded-[2px] border border-line bg-panel">
        {/* Column labels (desktop only). aria-hidden because each row already labels its own data. */}
        <div
          aria-hidden="true"
          className={`hidden h-9 items-center gap-x-3 border-b border-line px-3 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-ash md:grid ${ROW_GRID}`}
        >
          <span />
          <span>ID</span>
          <span>Entry</span>
          <span>Region</span>
          <span>Reward</span>
          <span>Diff.</span>
        </div>

        {groups.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
            <p className="font-display text-lg font-semibold uppercase tracking-[0.08em]">No entries match</p>
            <p className="text-sm text-ash">Try a different search or clear your filters.</p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className={`mt-1 h-9 rounded-[2px] border border-line px-3 font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-ash hover:text-bone ${FOCUS}`}
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          groups.map(({ category, items }) => (
            <div key={category.slug}>
              {/* Category sub-headers only on the home page; a category page already has its own h1. */}
              {!categorySlug && (
                <h3 className="flex h-9 items-center justify-between border-b border-line bg-carbon/50 px-3">
                  <span className="flex items-center gap-2 font-display text-[13px] font-semibold uppercase tracking-[0.12em]">
                    <CategoryIcon name={category.icon} size={15} className="text-ash" />
                    {category.name}
                  </span>
                  <span className="font-mono text-[11px] text-ash tabular-nums">
                    {ready ? stats.byCategory[category.slug].done : "-"}/{stats.byCategory[category.slug].total}
                  </span>
                </h3>
              )}
              <ul>
                {items.map((item) => (
                  <ChecklistRow key={item.id} item={item} checked={Boolean(done[item.id])} onToggle={toggle} />
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function FilterPill({ active, onClick, count, title, children }) {
  return (
    <button
      type="button"
      // aria-pressed tells screen readers this is an on/off toggle and which state it's in.
      aria-pressed={active}
      onClick={onClick}
      title={title}
      className={`flex h-8 shrink-0 items-center gap-2 rounded-[2px] border px-3 font-display text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors ${FOCUS} ${
        active ? "border-coral bg-coral/10 text-bone" : "border-line text-ash hover:border-ash/50 hover:text-bone"
      }`}
    >
      {children}
      {count !== undefined && <span className="font-mono text-[11px] font-normal tabular-nums text-ash">{count}</span>}
    </button>
  );
}

function ChecklistRow({ item, checked, onToggle }) {
  const nameId = `${item.id}-name`;
  const regionName = getRegionName(item.region);

  return (
    <li
      className={`grid grid-cols-[20px_minmax(0,1fr)] items-start gap-x-3 border-b border-line px-3 py-3 transition-colors last:border-b-0 md:items-center md:py-2.5 ${ROW_GRID} ${
        checked ? "bg-carbon/40" : "hover:bg-bone/[0.02]"
      }`}
    >
      <Checkbox checked={checked} onToggle={() => onToggle(item.id)} labelledBy={nameId} />

      {/* Desktop-only columns use `hidden md:block`. On mobile the same info is
          stacked under the name instead, so nothing gets squeezed. */}
      <span className="hidden font-mono text-xs text-ash tabular-nums md:block">{item.id}</span>

      <div className={`min-w-0 transition-opacity ${checked ? "opacity-55" : ""}`}>
        <p className="flex items-baseline gap-2">
          {/* The checkbox points at this id via aria-labelledby, so it's announced by name. */}
          <span
            id={nameId}
            className={`font-medium leading-snug ${checked ? "text-ash line-through decoration-ash/70" : "text-bone"}`}
          >
            {item.name}
          </span>
          {!item.verified && (
            <span
              title="To be confirmed after launch"
              className="shrink-0 rounded-[2px] border border-line px-1 font-mono text-[10px] uppercase leading-4 text-ash"
            >
              TBC
            </span>
          )}
        </p>
        {item.note && <p className="mt-0.5 text-[13px] leading-snug text-ash">{item.note}</p>}

        {/* Mobile metadata tags */}
        <div className="mt-2 flex flex-wrap gap-1.5 md:hidden">
          <Tag mono>{item.id}</Tag>
          <Tag>{regionName}</Tag>
          <Tag>{item.reward}</Tag>
          <Tag>
            <DifficultyMeter level={item.difficulty} />
          </Tag>
        </div>
      </div>

      <span className={`hidden text-[13px] md:block ${checked ? "text-ash/70" : "text-ash"}`}>{regionName}</span>
      <span className={`hidden text-[13px] md:block ${checked ? "text-ash/70" : "text-ash"}`}>{item.reward}</span>
      <span className="hidden md:block">
        <DifficultyMeter level={item.difficulty} />
      </span>
    </li>
  );
}

// Custom square checkbox. A <button role="checkbox"> instead of a styled native
// input because it gives full control over the look while still behaving like a
// checkbox for keyboards (Space/Enter) and screen readers (aria-checked).
function Checkbox({ checked, onToggle, labelledBy }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      onClick={onToggle}
      // The ::after pseudo-element extends the tap target to ~40px on phones
      // without making the visible box any bigger.
      className={`relative mt-0.5 grid h-5 w-5 place-items-center rounded-[2px] border transition-colors after:absolute after:-inset-2.5 after:content-[''] md:mt-0 ${FOCUS} ${
        checked ? "border-teal bg-teal text-carbon" : "border-ash/50 bg-carbon hover:border-bone"
      }`}
    >
      {checked && (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          {/* `check-path` (globals.css) animates the stroke so the tick draws itself in. */}
          <path className="check-path" d="M3 8.5l3.2 3.2L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        </svg>
      )}
    </button>
  );
}

function Tag({ mono = false, children }) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-[2px] border border-line px-1.5 text-[11px] text-ash ${
        mono ? "font-mono tabular-nums" : "font-display font-semibold uppercase tracking-[0.06em]"
      }`}
    >
      {children}
    </span>
  );
}

// Three little bars instead of colored "Easy/Hard" badges: reads faster in a
// dense table and keeps accent colors rare. The sr-only text keeps it accessible.
function DifficultyMeter({ level }) {
  const filled = { Easy: 1, Medium: 2, Hard: 3 }[level] || 0;
  return (
    <span className="inline-flex items-center gap-[3px]" title={level}>
      {[1, 2, 3].map((n) => (
        <span key={n} aria-hidden="true" className={`block h-2.5 w-1.5 ${n <= filled ? "bg-bone/80" : "bg-line"}`} />
      ))}
      <span className="sr-only">Difficulty: {level}</span>
    </span>
  );
}
