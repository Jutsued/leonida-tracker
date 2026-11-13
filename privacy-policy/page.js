// app/privacy-policy/page.js
// Privacy policy. Written for how the site actually works today (no accounts,
// progress in localStorage, Vercel hosting) AND for Google AdSense, which
// requires publishers to disclose third-party ad cookies and opt-out links.
// Keeping it accurate matters more than keeping it short: AdSense reviewers and
// privacy laws both care that the policy matches what the site really does.
//
// Static server component: no client JavaScript, prerendered at build.

import Link from "next/link";
import InfoPage, { InfoSection } from "@/components/InfoPage";
import JsonLd from "@/components/JsonLd";
import { CONTACT_EMAIL, POLICY_UPDATED, POLICY_UPDATED_ISO, SITE_NAME, SITE_URL, STORAGE_KEY_LABEL } from "@/lib/site";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Leonida Tracker handles your data: progress stays in your browser's localStorage, no accounts, and how advertising cookies and opt-outs work.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { url: "/privacy-policy", title: `${TITLE} | ${SITE_NAME}`, description: DESCRIPTION },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${TITLE} | ${SITE_NAME}`,
          url: `${SITE_URL}/privacy-policy`,
          dateModified: POLICY_UPDATED_ISO,
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        }}
      />

      <InfoPage
        eyebrow="Document / PP"
        title={TITLE}
        intro={`${SITE_NAME} is built to collect as little as possible. Your checklist lives in your own browser, there are no accounts, and we never ask for your name or email. This page explains exactly what is stored, by whom, and how to control it.`}
        updated={POLICY_UPDATED}
        updatedIso={POLICY_UPDATED_ISO}
      >
        <InfoSection index="01" id="summary" title="Summary">
          <ul>
            <li>Your progress is saved only in your browser&apos;s local storage, on your device.</li>
            <li>We do not run accounts, logins, newsletters, or contact forms, so we hold no personal profile about you.</li>
            <li>Our host processes basic technical data (like IP address) to deliver pages and keep the site secure.</li>
            <li>
              The site may show ads from Google AdSense. Google and its partners may use cookies to serve ads, and you
              can opt out of personalized advertising at any time (see section 05).
            </li>
          </ul>
        </InfoSection>

        <InfoSection index="02" id="local-storage" title="Progress stored in your browser">
          <p>
            When you tick an item, {SITE_NAME} saves the list of completed item IDs (for example{" "}
            <code>SM-001</code>) in your browser&apos;s <strong>localStorage</strong> under the key{" "}
            <code>{STORAGE_KEY_LABEL}</code>. This data never leaves your device and is not sent to our servers.
          </p>
          <p>You stay in control of it:</p>
          <ul>
            <li>
              <strong>Reset</strong> on the tracker clears all saved progress after a confirmation step.
            </li>
            <li>
              <strong>Export</strong> downloads a backup file to your device; <strong>Import</strong> reads one back.
              These files are created and read locally and are never uploaded.
            </li>
            <li>Clearing your browser&apos;s site data for this domain removes everything as well.</li>
          </ul>
          <p>
            Because progress is local, it does not sync between devices or browsers, and private/incognito windows
            discard it when closed.
          </p>
        </InfoSection>

        <InfoSection index="03" id="no-accounts" title="Information we do not collect">
          <p>
            {SITE_NAME} has no user accounts. We do not ask for or store your name, email address, gamertag, payment
            details, or any other information that identifies you. We do not sell personal information.
          </p>
        </InfoSection>

        <InfoSection index="04" id="hosting" title="Hosting and server logs">
          <p>
            The site is hosted by{" "}
            <a href="https://vercel.com/legal/privacy-policy" rel="noopener noreferrer" target="_blank">
              Vercel
            </a>
            . Like any web host, Vercel automatically processes technical request data such as your IP address,
            browser type, the page requested, and the time of the request. This is used to deliver pages, prevent
            abuse, and diagnose errors, and it is handled under Vercel&apos;s own privacy policy.
          </p>
        </InfoSection>

        <InfoSection index="05" id="advertising" title="Advertising and cookies">
          <p>
            To keep the tracker free, {SITE_NAME} may display ads served by <strong>Google AdSense</strong>. When ads
            are shown:
          </p>
          <ul>
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this
              website or other websites.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your
              visits to this site and/or other sites on the Internet.
            </li>
            <li>
              You may opt out of personalized advertising by visiting Google&apos;s{" "}
              <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">
                Ads Settings
              </a>
              .
            </li>
            <li>
              You can also opt out of some third-party vendors&apos; use of cookies for personalized advertising at{" "}
              <a href="https://www.aboutads.info/choices" rel="noopener noreferrer" target="_blank">
                www.aboutads.info
              </a>{" "}
              or the{" "}
              <a href="https://optout.networkadvertising.org" rel="noopener noreferrer" target="_blank">
                Network Advertising Initiative opt-out page
              </a>
              .
            </li>
          </ul>
          <p>
            Other third-party ad networks approved by Google may also serve ads through AdSense. You can read how
            Google uses information from sites that use its services at{" "}
            <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">
              policies.google.com/technologies/partner-sites
            </a>
            .
          </p>
          <p>
            Visitors in the European Economic Area, the United Kingdom, and Switzerland will be asked for consent
            through a Google-certified consent message before any personalized ads or advertising cookies are used.
            Choosing non-personalized ads still allows limited cookies for frequency capping and fraud prevention.
          </p>
          <p>
            Most browsers also let you block or delete cookies in their settings. Blocking cookies does not affect
            your saved checklist progress, which uses local storage rather than cookies.
          </p>
        </InfoSection>

        <InfoSection index="06" id="your-rights" title="Your choices and rights">
          <p>
            Depending on where you live (for example under the GDPR in Europe or the CCPA/CPRA in California), you may
            have the right to access, delete, or object to the processing of personal data, and to opt out of the
            sale or sharing of personal information for targeted advertising. Because we hold no account data, the
            most effective controls are the ad opt-outs in section 05 and clearing your browser data. For anything
            else, contact us using the details below.
          </p>
        </InfoSection>

        <InfoSection index="07" id="children" title="Children">
          <p>
            {SITE_NAME} is a companion tool for a mature-rated game and is not directed at children under 13. We do
            not knowingly collect personal information from children.
          </p>
        </InfoSection>

        <InfoSection index="08" id="changes" title="Changes to this policy">
          <p>
            If how the site handles data changes (for example, when ads go live or a new service is added), this page
            will be updated and the &quot;Last updated&quot; date above will change.
          </p>
        </InfoSection>

        <InfoSection index="09" id="contact" title="Contact">
          {CONTACT_EMAIL ? (
            <p>
              Questions about this policy can be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          ) : (
            <p>
              Questions about this policy can be sent through the contact details on the{" "}
              <Link href="/about">About page</Link>.
            </p>
          )}
        </InfoSection>
      </InfoPage>
    </>
  );
}
