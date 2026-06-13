import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import type { SlideProps } from "../types";

export const DemoSlide = (_props: SlideProps) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 20], [0.9, 1], { extrapolateRight: "clamp" });

  const pulse = interpolate(frame % 60, [0, 30, 60], [1, 1.04, 1]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 96,
            transform: `scale(${pulse})`,
            display: "inline-block",
            marginBottom: 24,
          }}
        >
          💻
        </div>
        <h1 style={{ fontSize: 80, fontWeight: 800, margin: 0, color: "#e0e7ff" }}>
          Live Demo
        </h1>
        <p style={{ fontSize: 32, marginTop: 20, color: "#818cf8" }}>
          Building a software application with AI assistance
        </p>
      </div>
    </AbsoluteFill>
  );
};
