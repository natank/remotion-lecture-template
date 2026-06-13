import type { SlideDefinition } from "./types";
import { TitleSlide } from "./slides/01-Title";
import { AgendaSlide } from "./slides/02-Agenda";
import { ConceptSlide } from "./slides/03-Concept";
import { ClosingSlide } from "./slides/04-Closing";

/**
 * ============================================================
 *  LECTURE CONFIG
 * ============================================================
 *
 * This is the single place you edit to build a lecture:
 *
 *  1. Create a new component in src/slides/ (copy an existing one).
 *  2. Import it above.
 *  3. Add an entry to SLIDES below with a unique `id`, a `title`
 *     (shown in the slide menu), and `durationInFrames` (at LECTURE_FPS).
 *
 * Reordering this array reorders the lecture. Removing an entry removes
 * the slide from playback. Nothing else needs to change.
 */

/** Frames per second for the whole lecture. */
export const LECTURE_FPS = 30;

/** Output resolution. */
export const LECTURE_WIDTH = 1920;
export const LECTURE_HEIGHT = 1080;

export const SLIDES: SlideDefinition[] = [
  {
    id: "title",
    title: "Title",
    durationInFrames: 90, // 3s
    component: TitleSlide,
  },
  {
    id: "agenda",
    title: "Agenda",
    durationInFrames: 150, // 5s
    component: AgendaSlide,
  },
  {
    id: "concept",
    title: "Core Concept",
    durationInFrames: 240, // 8s
    component: ConceptSlide,
  },
  {
    id: "closing",
    title: "Closing",
    durationInFrames: 90, // 3s
    component: ClosingSlide,
  },
];

/** Total duration of the lecture in frames. */
export const getTotalDurationInFrames = (slides: SlideDefinition[] = SLIDES) =>
  slides.reduce((sum, s) => sum + s.durationInFrames, 0);

/** Frame offset (start frame) of each slide within the full lecture timeline. */
export const getSlideStartFrames = (
  slides: SlideDefinition[] = SLIDES,
): number[] => {
  const starts: number[] = [];
  let acc = 0;
  for (const slide of slides) {
    starts.push(acc);
    acc += slide.durationInFrames;
  }
  return starts;
};
