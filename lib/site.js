// lib/site.js
// Site-wide constants used by metadata, the sitemap, and robots.txt.
// Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://leonidatracker.com) so
// Open Graph and canonical URLs point at the real domain instead of localhost.

export const SITE_NAME = "Leonida Tracker";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const SITE_DESCRIPTION =
  "Free GTA 6 100% completion checklist and database. Track story missions, collectibles, stunt jumps, vehicles, and properties across Leonida. Progress saves in your browser.";
