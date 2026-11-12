// lib/ogImage.js
// Shared template for the social preview images (the card that shows up when a
// link is pasted into Discord, Reddit, X, iMessage...). The home page and every
// category page call renderOgImage() with their own text, so all cards match.
//
// These images are drawn by next/og (a library called Satori), not by a browser.
// That means a few rules differ from normal React/CSS:
// - Inline `style={{}}` only. Tailwind classes do nothing here.
// - Any <div> with more than one child must have display: "flex".
// - Fonts must be passed in as file data (see loadFonts below).

import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CATEGORIES, ITEMS, REGIONS } from "@/data/gta6Data";

// 1200x630 is the size Facebook, X, Discord, and LinkedIn all expect.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Same palette as globals.css. Duplicated on purpose: Satori can't read CSS variables.
const C = {
  carbon: "#0C0D10",
  panel: "#14161B",
  line: "#262932",
  bone: "#F3F2EE",
  ash: "#8E93A2",
  coral: "#E85D4A",
  teal: "#2DD4BF",
};

// Fonts live in /assets/fonts as .woff files (Satori can't read .woff2).
// They're read from disk instead of downloaded from Google, so the build
// never depends on Google Fonts being reachable.
//
// Why readFileSync and not the async readFile? This project has Cache Components
// on, and in that mode an *async* file read marks the route as "dynamic", so the
// image would be redrawn on every request. A sync read lets Next build each
// image once at deploy time and serve it as a static PNG.
function loadFonts() {
  const dir = join(process.cwd(), "assets/fonts");
  return [
    { name: "Barlow Condensed", data: readFileSync(join(dir, "BarlowCondensed-Bold.woff")), weight: 700, style: "normal" },
    { name: "Barlow Condensed", data: readFileSync(join(dir, "BarlowCondensed-Medium.woff")), weight: 500, style: "normal" },
    { name: "JetBrains Mono", data: readFileSync(join(dir, "JetBrainsMono-Medium.woff")), weight: 500, style: "normal" },
  ];
}

// The same survey-grid crosshair as the header logo (components/Icons.js).
function Mark() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.5">
      <rect x="3.5" y="3.5" width="17" height="17" />
      <path d="M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

/**
 * @param {object} opts
 * @param {string} opts.eyebrow   Small coral label above the title, e.g. "CATEGORY / SM"
 * @param {string[]} opts.titleLines  One string per line. Keep each short; the font is huge.
 * @param {string} opts.stats     Mono line under the title, e.g. "8 ENTRIES · 6 REGIONS"
 */
export async function renderOgImage({ eyebrow, titleLines, stats }) {
  const fonts = loadFonts();
  const mono = { fontFamily: "JetBrains Mono", fontWeight: 500 };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: C.carbon,
          padding: 32,
        }}
      >
        {/* Inner frame: the 1px hairline border the site uses on every panel. */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: `1px solid ${C.line}`,
            background: C.panel,
            padding: "36px 48px 0 48px",
          }}
        >
          {/* Top row: brand left, launch telemetry right */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Mark />
              <div
                style={{
                  display: "flex",
                  fontFamily: "Barlow Condensed",
                  fontWeight: 700,
                  fontSize: 38,
                  letterSpacing: 2,
                  color: C.bone,
                }}
              >
                LEONIDA
                <span style={{ color: C.ash, marginLeft: 10 }}>TRACKER</span>
              </div>
            </div>
            <div style={{ ...mono, fontSize: 20, letterSpacing: 2, color: C.ash }}>GTA VI // NOV 19 2026</div>
          </div>

          {/* Title block */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ ...mono, fontSize: 22, letterSpacing: 3, color: C.coral, marginBottom: 14 }}>{eyebrow}</div>
            {titleLines.map((line) => (
              <div
                key={line}
                style={{
                  fontFamily: "Barlow Condensed",
                  fontWeight: 700,
                  fontSize: 112,
                  lineHeight: 0.95,
                  letterSpacing: 1,
                  color: C.bone,
                }}
              >
                {line}
              </div>
            ))}
            <div style={{ ...mono, fontSize: 22, letterSpacing: 2, color: C.ash, marginTop: 22 }}>{stats}</div>
          </div>

          {/* Bottom strip: the six regions as table cells, like the site's filter row. */}
          <div style={{ display: "flex", flexDirection: "column", marginLeft: -48, marginRight: -48 }}>
            <div style={{ display: "flex", borderTop: `1px solid ${C.line}` }}>
              {REGIONS.map((r, i) => (
                <div
                  key={r.id}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 64,
                    borderLeft: i === 0 ? "none" : `1px solid ${C.line}`,
                    fontFamily: "Barlow Condensed",
                    fontWeight: 500,
                    fontSize: 22,
                    letterSpacing: 2,
                    color: C.ash,
                  }}
                >
                  {r.name.toUpperCase()}
                </div>
              ))}
            </div>
            {/* Thin teal "progress" rail along the bottom edge, same as the tracker header. */}
            <div style={{ display: "flex", height: 5, background: C.line }}>
              <div style={{ width: "34%", height: 5, background: C.teal }} />
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
}

// Handy totals for the home card.
export const TOTALS = {
  entries: ITEMS.length,
  regions: REGIONS.length,
  categories: CATEGORIES.length,
};
