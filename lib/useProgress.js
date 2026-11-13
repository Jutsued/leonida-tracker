// lib/useProgress.js
// Custom hook that owns the user's checklist progress and keeps it in localStorage.
// Only client components can use it (it touches `window`).
//
// Why a plain object ({ "SM-001": true }) instead of an array of IDs?
// Checking `done[id]` is instant, and the object is still easy to JSON.stringify.

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "leonida-tracker:v1";

function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // Guard against corrupted or hand-edited data so one bad value can't crash the page.
    return parsed && typeof parsed.done === "object" && parsed.done !== null ? parsed.done : {};
  } catch {
    // Private browsing, storage disabled, or invalid JSON: start fresh instead of crashing.
    return {};
  }
}

export function useProgress() {
  const [done, setDone] = useState({});
  // `ready` stays false until we've read localStorage. Two reasons:
  // 1. The server can't see localStorage, so the first render must match the
  //    server's empty state, or React throws a hydration mismatch.
  // 2. Without it, the save effect below would run first and overwrite the
  //    user's real progress with the empty {}.
  const [ready, setReady] = useState(false);

  // Load once on mount.
  // The lint rule below normally warns against setState inside an effect, but this
  // is the intended case: localStorage only exists in the browser, so the saved
  // value can only be read *after* the first (server-matching) render. Reading it
  // during render instead would cause a hydration mismatch error.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDone(readStorage());
    setReady(true);
  }, []);

  // Save whenever progress changes (after the initial load).
  // No timestamp goes in here on purpose: if the saved string is identical,
  // the browser doesn't fire a "storage" event, so two open tabs can't ping-pong.
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, done }));
    } catch {
      // Storage full or blocked. Progress still works for this session.
    }
  }, [done, ready]);

  // Keep multiple open tabs in sync: a checkbox ticked in one tab shows up in the other.
  useEffect(() => {
    function handleStorage(event) {
      if (event.key === STORAGE_KEY) setDone(readStorage());
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // useCallback keeps the function identity stable so rows don't re-render needlessly.
  const toggle = useCallback((id) => {
    setDone((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }, []);

  const replaceAll = useCallback((nextDone) => {
    setDone(nextDone);
  }, []);

  // Clears every checkbox (for a new playthrough). Setting state to {} is enough:
  // the save effect above then writes the empty object to localStorage, and the
  // "storage" event clears any other open tabs too. The confirmation step lives
  // in the UI (Tracker.js), so this function itself stays simple.
  const reset = useCallback(() => {
    setDone({});
  }, []);

  return { done, ready, toggle, replaceAll, reset };
}
