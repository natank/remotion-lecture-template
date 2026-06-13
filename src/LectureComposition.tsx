import { Series } from "remotion";
import { SLIDES } from "./lecture.config";

/**
 * The actual Remotion composition: all configured slides wired into a
 * single <Series>, played back to back in order.
 *
 * This component is what gets fed into <Player /> (see LecturePlayer.tsx).
 * It is intentionally render-agnostic — the same composition could be used
 * with `remotion render` to produce a video file, even though this template
 * focuses on the live in-browser <Player /> experience.
 */
export const LectureComposition = () => {
  return (
    <Series>
      {SLIDES.map((slide) => {
        const Component = slide.component;
        return (
          <Series.Sequence
            key={slide.id}
            durationInFrames={slide.durationInFrames}
          >
            <Component {...(slide.props ?? {})} />
          </Series.Sequence>
        );
      })}
    </Series>
  );
};
