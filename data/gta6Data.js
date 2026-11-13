// data/gta6Data.js
// Single source of truth for the whole app. Every page, the sitemap, and the
// progress math read from here, so adding an item is a one-file change.
//
// IMPORTANT: item IDs (e.g. "SM-001") are the keys saved in localStorage and in
// export files. Never renumber or reuse an ID once it ships, or people lose their
// progress. Add new items with the next free number instead.

// Midnight Eastern on launch day. On Nov 19 New York is on EST (UTC-5), because
// daylight saving ended Nov 1, so the offset is -05:00.
export const RELEASE_DATE_ISO = "2026-11-19T00:00:00-05:00";

// Bump this only if the shape of saved progress changes (not when items are added).
export const DATA_VERSION = 1;

// The six regions Rockstar has officially named. The blurbs paraphrase the
// official descriptions; keep them short since they show up as tooltips/SEO copy.
export const REGIONS = [
  { id: "vice-city", name: "Vice City", short: "VC", blurb: "Leonida's Miami-style metropolis and the heart of the map." },
  { id: "leonida-keys", name: "Leonida Keys", short: "LK", blurb: "Island chain to the south, Leonida's take on the Florida Keys." },
  { id: "grassrivers", name: "Grassrivers", short: "GR", blurb: "Mangrove wetlands full of airboat channels and gators." },
  { id: "port-gellhorn", name: "Port Gellhorn", short: "PG", blurb: "A faded Gulf Coast port town, Leonida's forgotten coast." },
  { id: "ambrosia", name: "Ambrosia", short: "AM", blurb: "Inland industrial town built around a sugar refinery." },
  { id: "mount-kalaga", name: "Mount Kalaga", short: "MK", blurb: "Northern national park for hunting, fishing, and off-road trails." },
];

export const DIFFICULTIES = ["Easy", "Medium", "Hard"];

// Each category gets its own route (/story-missions, /collectibles, ...).
// The seo* fields feed generateMetadata so every page has a unique title and
// description, which is what lets each one rank on its own in Google.
export const CATEGORIES = [
  {
    slug: "story-missions",
    name: "Story Missions",
    short: "Missions",
    prefix: "SM",
    icon: "mission",
    seoTitle: "GTA 6 Story Missions Checklist",
    seoDescription:
      "Track every GTA 6 story mission across Leonida. Free checklist with progress saved in your browser, region filters, and JSON backup.",
  },
  {
    slug: "collectibles",
    name: "Collectibles",
    short: "Collect.",
    prefix: "CL",
    icon: "collectible",
    seoTitle: "GTA 6 Collectibles Locations & Checklist",
    seoDescription:
      "Every GTA 6 collectible by region, from Vice City to Mount Kalaga. Tick them off as you go and keep your progress saved locally.",
  },
  {
    slug: "stunt-jumps",
    name: "Stunt Jumps",
    short: "Jumps",
    prefix: "SJ",
    icon: "jump",
    seoTitle: "GTA 6 Stunt Jumps Checklist",
    seoDescription:
      "All GTA 6 stunt jumps in one checklist, filterable by Leonida region. Track your 100% completion progress for free.",
  },
  {
    slug: "vehicles",
    name: "Vehicles",
    short: "Vehicles",
    prefix: "VH",
    icon: "vehicle",
    seoTitle: "GTA 6 Vehicles List & Tracker",
    seoDescription:
      "GTA 6 vehicle tracker: cars, boats, and off-roaders across Leonida. Mark what you've found and back up your list as JSON.",
  },
  {
    slug: "properties",
    name: "Properties",
    short: "Property",
    prefix: "PR",
    icon: "property",
    seoTitle: "GTA 6 Properties & Safehouses Checklist",
    seoDescription:
      "Track GTA 6 properties and safehouses across Vice City, the Leonida Keys, and beyond. Free 100% completion checklist.",
  },
];

// Starter checklist.
//
// The game isn't out yet, so mission names, rewards, and exact locations are
// unknown. Anything built on official reveals (regions, named characters,
// landmarks) is used as an anchor, but every entry stays `verified: false`
// until it can be confirmed in-game. The UI shows a "TBC" tag for those so
// visitors never mistake a placeholder for a real guide entry.
//
// `guide` (optional): longer location / walkthrough notes. Rows that have a
// guide get an expand button in the checklist; rows without one stay compact.
// Leave it out until there's something genuinely useful to say, then fill it in
// after launch. Adding or editing a guide never affects saved progress, because
// progress is keyed by `id` only.
export const ITEMS = [
  // ---- Story Missions ------------------------------------------------------
  {
    id: "SM-001",
    category: "story-missions",
    name: "Convenience store holdup",
    region: "vice-city",
    reward: "Story progress",
    difficulty: "Easy",
    note: "Jason and Lucia's robbery from the end of Trailer 1. Mission name TBC.",
    verified: false,
    guide:
      "Trailer 1 ends with Jason and Lucia robbing a convenience store, which makes this a likely early-story beat. On launch day this note will list the mission's real name, the trigger point on the map, and any choices that change the outcome.",
  },
  {
    id: "SM-002",
    category: "story-missions",
    name: "Contact: Brian Heder",
    region: "leonida-keys",
    reward: "Story progress",
    difficulty: "Medium",
    note: "Placeholder slot for Brian's jobs in the Keys.",
    verified: false,
  },
  {
    id: "SM-003",
    category: "story-missions",
    name: "Contact: Cal Hampton",
    region: "leonida-keys",
    reward: "Story progress",
    difficulty: "Easy",
    note: "Placeholder slot for Jason's friend Cal.",
    verified: false,
  },
  {
    id: "SM-004",
    category: "story-missions",
    name: "Contact: Boobie Ike",
    region: "vice-city",
    reward: "Story progress",
    difficulty: "Medium",
    note: "Placeholder slot for Boobie Ike's storyline.",
    verified: false,
  },
  {
    id: "SM-005",
    category: "story-missions",
    name: "Contact: Dre'Quan Priest",
    region: "vice-city",
    reward: "Story progress",
    difficulty: "Medium",
    note: "Placeholder slot for Dre'Quan's storyline.",
    verified: false,
  },
  {
    id: "SM-006",
    category: "story-missions",
    name: "Contact: Real Dimez",
    region: "vice-city",
    reward: "Story progress",
    difficulty: "Easy",
    note: "Placeholder slot for the Real Dimez duo.",
    verified: false,
  },
  {
    id: "SM-007",
    category: "story-missions",
    name: "Contact: Raul Bautista",
    region: "vice-city",
    reward: "Story progress",
    difficulty: "Hard",
    note: "Placeholder slot for Raul's heist work. Region TBC.",
    verified: false,
  },
  {
    id: "SM-008",
    category: "story-missions",
    name: "Allied Crystal refinery job",
    region: "ambrosia",
    reward: "Story progress",
    difficulty: "Hard",
    note: "Ambrosia's sugar refinery is an official landmark. Mission link TBC.",
    verified: false,
    guide:
      "Rockstar's own regional overview puts the Allied Crystal sugar refinery at the center of Ambrosia. Large industrial landmarks like this usually host at least one story job. Expect the trigger to be marked once the region opens up.",
  },

  // ---- Collectibles --------------------------------------------------------
  {
    id: "CL-001",
    category: "collectibles",
    name: "Hidden collectible: beachfront",
    region: "vice-city",
    reward: "Completion %",
    difficulty: "Easy",
    note: "Placeholder. Collectible type unknown until launch.",
    verified: false,
  },
  {
    id: "CL-002",
    category: "collectibles",
    name: "Hidden collectible: downtown rooftop",
    region: "vice-city",
    reward: "Completion %",
    difficulty: "Medium",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "CL-003",
    category: "collectibles",
    name: "Hidden collectible: overseas highway",
    region: "leonida-keys",
    reward: "Completion %",
    difficulty: "Medium",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "CL-004",
    category: "collectibles",
    name: "Hidden collectible: airboat channel",
    region: "grassrivers",
    reward: "Completion %",
    difficulty: "Hard",
    note: "Placeholder. Expect water access only.",
    verified: false,
    guide:
      "Grassrivers is Leonida's mangrove wetland. Most of it is reachable only by water, so bring an airboat or small boat before you start searching. Exact coordinates will be added after launch.",
  },
  {
    id: "CL-005",
    category: "collectibles",
    name: "Hidden collectible: dockyards",
    region: "port-gellhorn",
    reward: "Completion %",
    difficulty: "Easy",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "CL-006",
    category: "collectibles",
    name: "Hidden collectible: refinery yard",
    region: "ambrosia",
    reward: "Completion %",
    difficulty: "Medium",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "CL-007",
    category: "collectibles",
    name: "Hidden collectible: summit trail",
    region: "mount-kalaga",
    reward: "Completion %",
    difficulty: "Hard",
    note: "Placeholder. Off-road vehicle likely needed.",
    verified: false,
    guide:
      "Mount Kalaga is the northern national park, built around hunting, fishing, and off-road trails. Higher trail sections will likely need an off-road vehicle. Coordinates will be added after launch.",
  },
  {
    id: "CL-008",
    category: "collectibles",
    name: "Hidden collectible: fishing pier",
    region: "mount-kalaga",
    reward: "Completion %",
    difficulty: "Easy",
    note: "Placeholder.",
    verified: false,
  },

  // ---- Stunt Jumps ---------------------------------------------------------
  {
    id: "SJ-001",
    category: "stunt-jumps",
    name: "Stunt jump: causeway ramp",
    region: "vice-city",
    reward: "Completion %",
    difficulty: "Medium",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "SJ-002",
    category: "stunt-jumps",
    name: "Stunt jump: parking garage gap",
    region: "vice-city",
    reward: "Completion %",
    difficulty: "Hard",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "SJ-003",
    category: "stunt-jumps",
    name: "Stunt jump: island bridge",
    region: "leonida-keys",
    reward: "Completion %",
    difficulty: "Medium",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "SJ-004",
    category: "stunt-jumps",
    name: "Stunt jump: levee launch",
    region: "grassrivers",
    reward: "Completion %",
    difficulty: "Easy",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "SJ-005",
    category: "stunt-jumps",
    name: "Stunt jump: container stack",
    region: "port-gellhorn",
    reward: "Completion %",
    difficulty: "Hard",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "SJ-006",
    category: "stunt-jumps",
    name: "Base jump: ridge line",
    region: "mount-kalaga",
    reward: "Completion %",
    difficulty: "Medium",
    note: "Base jumping is a confirmed activity. Exact spots TBC.",
    verified: false,
    guide:
      "Base jumping is a confirmed activity in GTA 6. The ridge lines around Mount Kalaga are the most likely launch points. Look for marked jump spots once you reach the park.",
  },

  // ---- Vehicles ------------------------------------------------------------
  {
    id: "VH-001",
    category: "vehicles",
    name: "Airboat",
    region: "grassrivers",
    reward: "Garage slot",
    difficulty: "Easy",
    note: "Placeholder. Model name TBC.",
    verified: false,
    guide:
      "Airboats are the natural way across the Grassrivers wetlands. Check the boat ramps along the wetland edges first. The model name and a guaranteed spawn point will be confirmed after launch.",
  },
  {
    id: "VH-002",
    category: "vehicles",
    name: "Offshore speedboat",
    region: "leonida-keys",
    reward: "Garage slot",
    difficulty: "Medium",
    note: "Placeholder. Model name TBC.",
    verified: false,
  },
  {
    id: "VH-003",
    category: "vehicles",
    name: "Lifted off-road pickup",
    region: "mount-kalaga",
    reward: "Garage slot",
    difficulty: "Easy",
    note: "Placeholder. Suited to the park's off-road trails.",
    verified: false,
    guide:
      "Off-road pickups suit Mount Kalaga's trail network. Ranger stations and trailheads are the first places worth checking. The model name and spawn point will be confirmed after launch.",
  },
  {
    id: "VH-004",
    category: "vehicles",
    name: "Classic convertible",
    region: "vice-city",
    reward: "Garage slot",
    difficulty: "Medium",
    note: "Placeholder. Model name TBC.",
    verified: false,
  },
  {
    id: "VH-005",
    category: "vehicles",
    name: "Sport motorcycle",
    region: "vice-city",
    reward: "Garage slot",
    difficulty: "Medium",
    note: "Placeholder. Model name TBC.",
    verified: false,
  },
  {
    id: "VH-006",
    category: "vehicles",
    name: "Leonida police cruiser",
    region: "port-gellhorn",
    reward: "Garage slot",
    difficulty: "Hard",
    note: "Placeholder. Whether it can be stored is TBC.",
    verified: false,
  },

  // ---- Properties ----------------------------------------------------------
  {
    id: "PR-001",
    category: "properties",
    name: "Safehouse: Vice City apartment",
    region: "vice-city",
    reward: "Save point",
    difficulty: "Easy",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "PR-002",
    category: "properties",
    name: "Safehouse: Keys stilt house",
    region: "leonida-keys",
    reward: "Save point",
    difficulty: "Easy",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "PR-003",
    category: "properties",
    name: "Business: waterfront bar",
    region: "vice-city",
    reward: "Income TBC",
    difficulty: "Medium",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "PR-004",
    category: "properties",
    name: "Business: boat storage",
    region: "port-gellhorn",
    reward: "Income TBC",
    difficulty: "Medium",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "PR-005",
    category: "properties",
    name: "Safehouse: trailer lot",
    region: "ambrosia",
    reward: "Save point",
    difficulty: "Easy",
    note: "Placeholder.",
    verified: false,
  },
  {
    id: "PR-006",
    category: "properties",
    name: "Hunting cabin",
    region: "mount-kalaga",
    reward: "Save point",
    difficulty: "Medium",
    note: "Placeholder.",
    verified: false,
    guide:
      "Mount Kalaga's hunting and fishing focus makes a cabin a likely property type, but this is unconfirmed. If it turns out to be a safehouse, expect it to unlock a fast-travel or save point in the north.",
  },
];

// ---- Small lookup helpers --------------------------------------------------
// Built once at import time so lookups are O(1) instead of .find() in every row.
const regionById = Object.fromEntries(REGIONS.map((r) => [r.id, r]));
const categoryBySlug = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));

export function getRegion(id) {
  return regionById[id] || null;
}

export function getRegionName(id) {
  return regionById[id]?.name || "Unknown";
}

export function getCategory(slug) {
  return categoryBySlug[slug] || null;
}

export function getItemsByCategory(slug) {
  return ITEMS.filter((item) => item.category === slug);
}
