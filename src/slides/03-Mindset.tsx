import { SlideLayout } from "../components/SlideLayout";
import type { SlideProps } from "../types";

const MINDSETS = [
  {
    role: "Software Engineer",
    color: "#818cf8",
    points: [
      "Designs systems, architectures, and solutions",
      "Familiar with technologies, frameworks & tools",
      "Debugging and problem-solving skills",
      "Understands code — but doesn't need to write it",
    ],
  },
  {
    role: "Project Manager",
    color: "#34d399",
    points: [
      "Understands the full SDLC",
      "Breaks features into tasks and plans",
      "Manages larger scope and deliverables",
      "1 AI-savvy developer = a full dev team",
    ],
  },
];

// step 0 = intro text, step 1 = first mindset block, step 2 = second mindset block

export const MindsetSlide = ({ step }: SlideProps) => {
  const introVisible = step >= 0;

  return (
    <SlideLayout title="A New Mindset">
      <div
        style={{
          opacity: introVisible ? 1 : 0,
          transform: introVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          marginBottom: 24,
          fontSize: 28,
          color: "#a5b4fc",
        }}
      >
        Stop thinking like a <em>developer</em>. Think like an <strong>engineer</strong> and a <strong>project manager</strong>.
      </div>
      <div style={{ display: "flex", gap: 48 }}>
        {MINDSETS.map((mindset, mi) => {
          const visible = step >= mi + 1;
          return (
            <div
              key={mindset.role}
              style={{
                flex: 1,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 16,
                padding: 32,
                borderTop: `4px solid ${mindset.color}`,
              }}
            >
              <h2 style={{ fontSize: 36, fontWeight: 700, color: mindset.color, marginBottom: 24 }}>
                {mindset.role}
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {mindset.points.map((point) => (
                  <li
                    key={point}
                    style={{
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      fontSize: 26,
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: mindset.color, flexShrink: 0 }}>▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </SlideLayout>
  );
};
