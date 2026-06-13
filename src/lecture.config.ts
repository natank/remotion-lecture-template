import type { SlideDefinition } from "./types";
import { TitleSlide } from "./slides/01-Title";
import { AgendaSlide } from "./slides/02-Agenda";
import { MindsetSlide } from "./slides/03-Mindset";
import { SDLCSlide } from "./slides/04-SDLC";
import { DemoSlide } from "./slides/05-Demo";
import { ClosingSlide } from "./slides/06-Closing";

/** Frames per second for the whole lecture. */
export const LECTURE_FPS = 30;

/** Output resolution. */
export const LECTURE_WIDTH = 1920;
export const LECTURE_HEIGHT = 1080;

export const SLIDES: SlideDefinition[] = [
  {
    id: "title",
    title: "Title",
    durationInFrames: 120, // 4s
    component: TitleSlide,
    stepCount: 0,
  },
  {
    id: "agenda",
    title: "Agenda",
    durationInFrames: 180, // 6s
    component: AgendaSlide,
    stepCount: 4, // 4 agenda items
  },
  {
    id: "mindset",
    title: "A New Mindset",
    durationInFrames: 300, // 10s
    component: MindsetSlide,
    stepCount: 3, // intro text + 2 mindset blocks
  },
  {
    id: "sdlc",
    title: "The SDLC",
    durationInFrames: 270, // 9s
    component: SDLCSlide,
    stepCount: 9, // 9 SDLC phases
  },
  {
    id: "demo",
    title: "Live Demo",
    durationInFrames: 150, // 5s
    component: DemoSlide,
    stepCount: 0,
  },
  {
    id: "closing",
    title: "Key Takeaways",
    durationInFrames: 210, // 7s
    component: ClosingSlide,
    stepCount: 6, // header + 5 takeaways
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
