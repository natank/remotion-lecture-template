import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import type { SlideProps } from "../types";

const TAKEAWAYS = [
  "AI-assisted development is here and it's real",
  "Think like an engineer — design systems, not just code",
  "Think like a PM — manage scope, tasks, and delivery",
  "Master the SDLC to leverage AI at every phase",
  "AI is a tool. You are the one who operates it.",
];

// step 0 = header, steps 1–5 = takeaways one by one

export const ClosingSlide = ({ step }: SlideProps) => {
  const frame = useCurrentFrame();
  const headerVisible = step >= 0;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0b0b0f 0%, #312e81 100%)",
        color: "#fff",
        padding: 80,
        boxSizing: "border-box",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          marginBottom: 40,
        }}
      >
        <h1 style={{ fontSize: 64, fontWeight: 800, margin: 0 }}>Key Takeaways</h1>
        <div style={{ width: 80, height: 4, background: "#818cf8", marginTop: 16, borderRadius: 2 }} />
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {TAKEAWAYS.map((item, i) => {
          const visible = i + 1 <= step;
          return (
            <li
              key={item}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-30px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                fontSize: 30,
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
              }}
            >
              <span style={{ color: "#818cf8", fontWeight: 700, flexShrink: 0, fontSize: 22, marginTop: 4 }}>
                ✓
              </span>
              {item}
            </li>
          );
        })}
      </ul>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 80,
          textAlign: "right",
          opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          color: "#a5b4fc",
          fontSize: 26,
        }}
      >
        Thank you — Questions?
      </div>
    </AbsoluteFill>
  );
};
