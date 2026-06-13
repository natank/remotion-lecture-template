import { useEffect, useState, useCallback } from "react";

const SLIDE_PARAM = "slide";

/**
 * Reads/writes the `?slide=N` URL param (1-indexed, matching the slide
 * menu's display numbers). Returns the initial slide index (0-indexed,
 * clamped to a valid range by the caller) and a setter that updates the URL
 * via history.replaceState (no page reload, no extra history entries).
 */
export const useLectureUrlState = (slideCount: number) => {
  const getSlideFromUrl = useCallback((): number => {
    if (typeof window === "undefined") return 0;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get(SLIDE_PARAM);
    if (!raw) return 0;
    const parsed = parseInt(raw, 10);
    if (Number.isNaN(parsed)) return 0;
    // URL param is 1-indexed for human-friendliness.
    const zeroIndexed = parsed - 1;
    return Math.min(Math.max(zeroIndexed, 0), Math.max(slideCount - 1, 0));
  }, [slideCount]);

  const [initialSlideIndex] = useState<number>(getSlideFromUrl);

  const setSlideInUrl = useCallback((index: number) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set(SLIDE_PARAM, String(index + 1));
    const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    window.history.replaceState(null, "", newUrl);
  }, []);

  return { initialSlideIndex, setSlideInUrl };
};
