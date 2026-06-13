import { Series } from "remotion";
import { SLIDES } from "./lecture.config";

interface LectureCompositionProps {
  /** Index of the currently active slide. */
  currentSlideIndex: number;
  /** Animation step within the current slide (0-based). */
  step: number;
}

/**
 * The actual Remotion composition: all configured slides wired into a
 * single <Series>, played back to back in order.
 *
 * step and currentSlideIndex are passed in as inputProps from LecturePlayer
 * to drive click-through bullet animations without advancing the timeline.
 */
export const LectureComposition = ({
  currentSlideIndex = 0,
  step = 0,
}: Partial<LectureCompositionProps>) => {
  return (
    <Series>
      {SLIDES.map((slide, index) => {
        const Component = slide.component;
        const slideStep = index === currentSlideIndex ? step : 0;
        return (
          <Series.Sequence
            key={slide.id}
            durationInFrames={slide.durationInFrames}
          >
            <Component step={slideStep} {...(slide.props ?? {})} />
          </Series.Sequence>
        );
      })}
    </Series>
  );
};
