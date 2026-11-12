// app/layout.js
// The shell every page shares: fonts, countdown, header, the two-column grid with
// the desktop ad rail, footer, and the mobile sticky ad bar.
// Pages only render what goes in the main column.

import Link from "next/link";
import { Barlow_Condensed, DM_Sans, JetBrains_Mono } from "next/font/google";
import CountdownBar from "@/components/CountdownBar";
import AdSlot from "@/components/AdSlot";
import { IconMark } from "@/components/Icons";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// next/font downloads the fonts at build time and serves them from our own domain.
// No request to Google at runtime, and Next reserves the right space for the text
// before the font loads, so headings don't jump. `variable` exposes each font as a
// CSS variable that globals.css maps to font-display / font-sans / font-mono.
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Default SEO for the whole site. Each route overrides title/description/OG.
// `template` means a page that sets title "GTA 6 Vehicles List & Tracker" ends up
// as "GTA 6 Vehicles List & Tracker | Leonida Tracker" automatically.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: GTA 6 100% Completion Checklist`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: `${SITE_NAME}: GTA 6 100% Completion Checklist`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
  },
};

// Colors the mobile browser's address bar to match the page instead of white.
export const viewport = {
  themeColor: "#0C0D10",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${barlow.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      {/* pb-[60px] on mobile reserves room for the fixed ad bar so it never covers the last row. */}
      <body className="min-h-dvh bg-carbon pb-[60px] font-sans text-[15px] text-bone antialiased lg:pb-0">
        {/* Keyboard users can jump past the header straight to the checklist. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-[2px] focus:bg-teal focus:px-3 focus:py-2 focus:font-display focus:text-sm focus:font-semibold focus:uppercase focus:tracking-wider focus:text-carbon"
        >
          Skip to checklist
        </a>

        <CountdownBar />

        <header className="border-b border-line">
          <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-4 px-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
            >
              <IconMark size={22} className="text-teal" />
              <span className="font-display text-xl font-bold uppercase leading-none tracking-[0.06em]">
                Leonida<span className="text-ash"> Tracker</span>
              </span>
            </Link>
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-ash sm:block">
              Unofficial · Field Log v0.1
            </p>
          </div>
        </header>

        {/* Two columns on desktop: content + fixed 300px ad rail. One column on mobile. */}
        <div className="mx-auto max-w-[1280px] px-4 py-5 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6">
          <main id="main" className="min-w-0">
            {children}
          </main>

          <aside className="hidden lg:block">
            {/* Sticky so the slot stays in view while scrolling a long checklist. */}
            <div className="sticky top-5">
              <AdSlot width={300} height={600} />
            </div>
          </aside>
        </div>

        <footer className="border-t border-line">
          <div className="mx-auto max-w-[1280px] px-4 py-6 text-xs leading-relaxed text-ash">
            <p>
              {SITE_NAME} is an unofficial fan project and is not affiliated with or endorsed by Rockstar
              Games or Take-Two Interactive. Grand Theft Auto and related names are trademarks of their
              respective owners.
            </p>
            <p className="mt-2">Your progress is stored only in this browser. Use Export to back it up.</p>
          </div>
        </footer>

        {/* Mobile sticky ad bar. Fixed 60px tall, so nothing reflows when an ad loads. */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex h-[60px] items-center justify-center border-t border-line bg-carbon lg:hidden">
          <AdSlot width={320} height={50} />
        </div>
      </body>
    </html>
  );
}
