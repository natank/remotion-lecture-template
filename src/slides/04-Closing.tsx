import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

/**
 * Example slide: closing / thank-you card.
 */
export const ClosingSlide = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 20], [0.9, 1], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0b0b0f 0%, #312e81 100%)",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <div style={{ opacity, transform: `scale(${scale})`, textAlign: "center" }}>
        <h1 style={{ fontSize: 80, fontWeight: 800, margin: 0 }}>
          Thank You
        </h1>
        <p style={{ fontSize: 32, marginTop: 16, color: "#a5b4fc" }}>
          Questions? Contact info / links here.
        </p>
      </div>
    </AbsoluteFill>
  );
};
