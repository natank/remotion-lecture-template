import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import type { SlideProps } from "../types";

export const TitleSlide = (_props: SlideProps) => {
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
        <p style={{ fontSize: 28, color: "#818cf8", marginBottom: 16, letterSpacing: 4, textTransform: "uppercase" }}>
          Webinar
        </p>
        <h1 style={{ fontSize: 88, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
          AI-Assisted
          <br />
          Software Development
        </h1>
        <p style={{ fontSize: 36, marginTop: 32, color: "#a5b4fc" }}>
          A new mindset for a new era
        </p>
      </div>
    </AbsoluteFill>
  );
};
