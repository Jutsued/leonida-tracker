// components/InfoPage.js
// Shared shell for text pages (/about, /privacy-policy). Same flat panel,
// hairline borders, and type scale as the tracker, so these pages feel like part
// of the dossier rather than a bolted-on legal template.
// Server component: plain HTML, zero client JavaScript.

export default function InfoPage({ eyebrow, title, intro, updated, updatedIso, children }) {
  return (
    <article className="rounded-[2px] border border-line bg-panel">
      <header className="border-b border-line px-5 py-6 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-coral">{eyebrow}</p>
        <h1 className="mt-2 font-display text-[30px] font-bold uppercase leading-none tracking-[0.03em] sm:text-[38px]">
          {title}
        </h1>
        {intro && <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed text-ash">{intro}</p>}
        {updated && (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ash tabular-nums">
            Last updated <time dateTime={updatedIso}>{updated}</time>
          </p>
        )}
      </header>
      {/* divide-y gives each numbered section the same 1px rule the checklist rows use. */}
      <div className="divide-y divide-line">{children}</div>
    </article>
  );
}

// One numbered section. The mono index ("01") on the left mirrors the item IDs
// in the tracker and makes long policies easy to scan.
export function InfoSection({ index, title, id, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="grid gap-x-6 gap-y-2 px-5 py-6 sm:grid-cols-[56px_minmax(0,1fr)] sm:px-8">
      <p className="font-mono text-xs text-ash tabular-nums" aria-hidden="true">
        {index}
      </p>
      <div className="min-w-0">
        <h2
          id={`${id}-title`}
          className="font-display text-lg font-semibold uppercase tracking-[0.08em] text-bone"
        >
          {title}
        </h2>
        {/* Arbitrary child selectors style plain <p>, <ul>, <a>, <code> inside, so the
            page files can stay simple markup without classes on every tag. */}
        <div className="mt-2 max-w-[68ch] space-y-3 text-[15px] leading-relaxed text-ash [&_a]:text-teal [&_a]:underline [&_a]:decoration-teal/40 [&_a]:underline-offset-2 [&_a:hover]:decoration-teal [&_code]:rounded-[2px] [&_code]:border [&_code]:border-line [&_code]:bg-carbon [&_code]:px-1 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-bone [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-bone [&_ul]:list-[square] [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:marker:text-line">
          {children}
        </div>
      </div>
    </section>
  );
}
