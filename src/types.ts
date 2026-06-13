import type { ComponentType } from "react";

/**
 * Metadata + component registration for a single slide.
 *
 * `durationInFrames` is the length of the slide at the project FPS (30fps
 * by default — see lecture.config.ts -> LECTURE_FPS).
 */
export interface SlideDefinition {
  /** Unique identifier, used for URL params, keys, and the slide menu. */
  id: string;
  /** Human-readable title shown in the slide index/menu. */
  title: string;
  /** Length of this slide in frames at LECTURE_FPS. */
  durationInFrames: number;
  /** The React component that renders this slide's content. */
  component: ComponentType<Record<string, unknown>>;
  /** Optional props passed to the slide component. */
  props?: Record<string, unknown>;
}
