import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

/**
 * Example slide: title card with a simple fade/slide-in animation.
 *
 * Each slide is a self-contained component. Use Remotion hooks like
 * useCurrentFrame() to drive per-frame animation — this works both in the
 * live <Player> preview and in a real render.
 */
export const TitleSlide = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 20], [40, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #312e81 0%, #0b0b0f 100%)",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 96, fontWeight: 800, margin: 0 }}>
          Lecture Title
        </h1>
        <p style={{ fontSize: 36, marginTop: 24, color: "#a5b4fc" }}>
          Subtitle / Instructor name / Date
        </p>
      </div>
    </AbsoluteFill>
  );
};
