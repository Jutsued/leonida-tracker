// components/AdSlot.js
// Reserved ad space. The width and height are fixed *before* any ad script exists,
// so when an ad network fills it later, nothing on the page moves (zero CLS).
// Swap the inner label for the ad network's tag when you're approved.

export default function AdSlot({ width, height, className = "" }) {
  return (
    <div
      role="complementary"
      aria-label="Advertisement"
      // Inline style instead of Tailwind classes because the size comes from props,
      // and Tailwind can't generate classes for values it only sees at runtime.
      style={{ width, height, minHeight: height }}
      className={`flex max-w-full items-center justify-center rounded-[2px] border border-line bg-panel ${className}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ash/60 tabular-nums">
        Ad · {width}×{height}
      </span>
    </div>
  );
}
