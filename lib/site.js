// lib/site.js
// Site-wide constants used by metadata, the sitemap, robots.txt, structured data,
// and the About / Privacy pages. Change a value here and every page picks it up.
//
// NEXT_PUBLIC_SITE_URL is set in Vercel to https://www.leonidatracker.app so
// canonical, Open Graph, and sitemap URLs point at the real domain. The fallback
// only matters when running locally.

export const SITE_NAME = "Leonida Tracker";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const SITE_DESCRIPTION =
  "Free GTA 6 100% completion checklist and database. Track story missions, collectibles, stunt jumps, vehicles, and properties across Leonida. Progress saves in your browser.";

// Public contact address shown on /about and /privacy-policy as a mailto: link.
// AdSense reviewers look for a way to reach the site owner. Mail for this domain
// is handled by Zoho Mail (MX/SPF/DKIM records live in Vercel DNS), so this
// inbox receives mail. If it's ever set back to "", the pages hide the email line.
export const CONTACT_EMAIL = "contact@leonidatracker.app";

// "Last updated" date printed on the legal pages. Update it whenever the
// wording of the privacy policy changes (it's a disclosure, so the date matters).
export const POLICY_UPDATED = "November 12, 2026";
export const POLICY_UPDATED_ISO = "2026-11-12";

// Must match the key in lib/useProgress.js. Quoted on the privacy page so the
// disclosure names the exact thing stored in the visitor's browser.
export const STORAGE_KEY_LABEL = "leonida-tracker:v1";

// Static pages that aren't categories. sitemap.js reads this list, so adding a
// page here is all it takes to get it into /sitemap.xml.
export const STATIC_PAGES = [
  { path: "/about", changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
];