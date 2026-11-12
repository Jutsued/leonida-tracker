// components/CountdownBar.js
// Thin telemetry strip pinned above the header. Ticks every second until launch,
// then flips to a LIVE indicator.
"use client";

import { useEffect, useState } from "react";
import { RELEASE_DATE_ISO } from "@/data/gta6Data";

const TARGET_MS = Date.parse(RELEASE_DATE_ISO);

function pad(value, length = 2) {
  return String(value).padStart(length, "0");
}

function splitTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

// One "02D" style block. The number gets tabular-nums so every digit is the
// same width and the bar never shifts as seconds tick over.
function Unit({ value, label }) {
  return (
    <span>
      <span className="text-bone">{value}</span>
      <span className="text-ash">{label}</span>
    </span>
  );
}

export default function CountdownBar() {
  // `null` on the server and on the very first client render, so both match
  // (no hydration error). The real time fills in right after mount.
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const isLive = now !== null && now >= TARGET_MS;
  const t = now === null ? null : splitTime(TARGET_MS - now);

  return (
    <div className="border-b border-line bg-panel">
      {/* Fixed h-9 height: the bar is the same size before mount, while ticking, and when LIVE. Zero layout shift. */}
      <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-between gap-3 px-4 font-mono text-[11px] uppercase tracking-[0.12em] tabular-nums sm:text-xs">
        <p className="truncate text-ash">
          <span className="hidden sm:inline">GTA VI // </span>
          PS5 · XBOX SERIES X|S
          <span className="hidden md:inline">
            {" // "}
            <time dateTime={RELEASE_DATE_ISO}>NOV 19 2026 · 00:00 ET</time>
          </span>
        </p>

        {isLive ? (
          <p className="flex shrink-0 items-center gap-2 text-coral">
            <span className="live-dot block h-1.5 w-1.5 bg-coral" aria-hidden="true" />
            LIVE <span className="hidden sm:inline text-ash">· OUT NOW</span>
          </p>
        ) : (
          // role="timer" is announced once by screen readers but not on every
          // tick (its live region defaults to off), so the countdown isn't spammy.
          <p role="timer" aria-label="Time until GTA 6 launches" className="flex shrink-0 items-center gap-2">
            <span className="hidden text-ash sm:inline">T-MINUS</span>
            <span className="flex gap-1.5">
              <Unit value={t ? pad(t.days) : "--"} label="D" />
              <Unit value={t ? pad(t.hours) : "--"} label="H" />
              <Unit value={t ? pad(t.minutes) : "--"} label="M" />
              <Unit value={t ? pad(t.seconds) : "--"} label="S" />
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
