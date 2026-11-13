// app/about/page.js
// About page. Explains what the site is, how progress works without accounts,
// and how entries go from "TBC" to verified. AdSense reviewers check for an
// About page that shows a real, original purpose, and players use it to decide
// whether to trust the data, so it states plainly what is and isn't confirmed.
//
// Static server component: no client JavaScript, prerendered at build.

import Link from "next/link";
import InfoPage, { InfoSection } from "@/components/InfoPage";
import JsonLd from "@/components/JsonLd";
import { CATEGORIES, ITEMS, REGIONS } from "@/data/gta6Data";
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const TITLE = "About Leonida Tracker";
const DESCRIPTION =
  "What Leonida Tracker is, how your GTA 6 progress is saved locally without an account, and how checklist entries are verified after launch.";

export const metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: `${TITLE}`, description: DESCRIPTION },
};

export default function AboutPage() {
  const verifiedCount = ITEMS.filter((i) => i.verified).length;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: TITLE,
          url: `${SITE_URL}/about`,
          description: DESCRIPTION,
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL, description: SITE_DESCRIPTION },
        }}
      />

      <InfoPage
        eyebrow="Document / AB"
        title={TITLE}
        intro={`${SITE_NAME} is a free, fast checklist for 100% completion in Grand Theft Auto VI. It tracks story missions, collectibles, stunt jumps, vehicles, and properties across all ${REGIONS.length} regions of Leonida, from Vice City to Mount Kalaga.`}
      >
        <InfoSection index="01" id="what" title="What it is">
          <p>
            Open-world completion lists get long fast. {SITE_NAME} puts every trackable item in one dense, searchable
            table, filterable by region and status, with a single completion percentage at the top. It is built to
            sit on a phone or second monitor while you play.
          </p>
          <p>
            The database currently has <strong>{ITEMS.length} entries</strong> across{" "}
            <strong>{CATEGORIES.length} categories</strong>:{" "}
            {CATEGORIES.map((cat, i) => (
              <span key={cat.slug}>
                <Link href={`/${cat.slug}`}>{cat.name}</Link>
                {i < CATEGORIES.length - 2 ? ", " : i === CATEGORIES.length - 2 ? ", and " : "."}
              </span>
            ))}
          </p>
        </InfoSection>

        <InfoSection index="02" id="progress" title="Your progress, no account needed">
          <p>
            There is nothing to sign up for. Each checkbox you tick is saved in your browser&apos;s local storage on
            your own device, so the tracker loads instantly and works without a login.
          </p>
          <ul>
            <li>
              <strong>Export</strong> saves a small backup file you can keep or move to another device.
            </li>
            <li>
              <strong>Import</strong> restores that file.
            </li>
            <li>
              <strong>Reset</strong> clears everything for a fresh playthrough, after a confirmation step so it
              can&apos;t happen by accident.
            </li>
          </ul>
          <p>
            Every item has a permanent ID (like <code>SM-001</code> or <code>CL-004</code>). When entries are renamed
            or corrected after launch, the IDs never change, so your saved progress carries over through every
            update. The <Link href="/privacy-policy">Privacy Policy</Link> covers exactly what is stored.
          </p>
        </InfoSection>

        <InfoSection index="03" id="verification" title="How entries are verified">
          <p>
            GTA VI releases on November 19, 2026. Until then, only the regions and a handful of locations,
            characters, and activities have been officially revealed by Rockstar Games.
          </p>
          <ul>
            <li>
              Entries built on unconfirmed details carry a <code>TBC</code> tag and are clearly labelled as
              pre-launch placeholders. Right now {verifiedCount === 0 ? "none" : verifiedCount} of {ITEMS.length}{" "}
              are verified.
            </li>
            <li>
              After launch, each entry is checked in-game: its name, region, reward, and location notes are corrected,
              and the <code>TBC</code> tag is removed only once it has been confirmed.
            </li>
            <li>
              Rows with field notes (the expand arrow on the right of a row) get coordinates and walkthrough tips as
              they are verified.
            </li>
          </ul>
          <p>If you spot something wrong after launch, corrections are welcome. See contact below.</p>
        </InfoSection>

        <InfoSection index="04" id="affiliation" title="Not affiliated with Rockstar">
          <p>
            {SITE_NAME} is an unofficial fan project. It is not affiliated with, endorsed by, or sponsored by Rockstar
            Games or Take-Two Interactive. Grand Theft Auto, GTA, and related names are trademarks of their
            respective owners. No game assets are used on this site.
          </p>
        </InfoSection>

        <InfoSection index="05" id="contact" title="Contact">
          {CONTACT_EMAIL ? (
            <p>
              For corrections, feedback, or privacy questions, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          ) : (
            <p>A contact address for corrections and feedback will be listed here shortly.</p>
          )}
        </InfoSection>
      </InfoPage>
    </>
  );
}
