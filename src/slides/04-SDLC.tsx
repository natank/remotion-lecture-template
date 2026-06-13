import { SlideLayout } from "../components/SlideLayout";
import type { SlideProps } from "../types";

const PHASES = [
  { num: 1, name: "Idea" },
  { num: 2, name: "Specification" },
  { num: 3, name: "Design" },
  { num: 4, name: "Implementation Planning" },
  { num: 5, name: "Implementation" },
  { num: 6, name: "Verification" },
  { num: 7, name: "Validation" },
  { num: 8, name: "Deployment" },
  { num: 9, name: "Maintenance" },
];

export const SDLCSlide = ({ step }: SlideProps) => {
  return (
    <SlideLayout title="The Software Development Life Cycle">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {PHASES.map((phase, i) => {
          const visible = i <= step;
          const hue = 240 + i * 12;
          const color = `hsl(${hue}, 70%, 70%)`;

          return (
            <div
              key={phase.num}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.85)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 12,
                padding: "18px 24px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                borderLeft: `4px solid ${color}`,
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color,
                  minWidth: 32,
                }}
              >
                {phase.num}
              </span>
              <span style={{ fontSize: 26, fontWeight: 500 }}>{phase.name}</span>
            </div>
          );
        })}
      </div>
    </SlideLayout>
  );
};
