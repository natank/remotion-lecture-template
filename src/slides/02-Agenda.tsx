import { SlideLayout } from "../components/SlideLayout";
import type { SlideProps } from "../types";

const AGENDA_ITEMS = [
  "The new reality for developers",
  "A new mindset: Engineer & Project Manager",
  "The Software Development Life Cycle (SDLC)",
  "Live demo: building with AI",
];

export const AgendaSlide = ({ step }: SlideProps) => {
  return (
    <SlideLayout title="Agenda">
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {AGENDA_ITEMS.map((item, i) => {
          const visible = i <= step;
          return (
            <li
              key={item}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-30px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
                padding: "18px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span
                style={{
                  color: "#818cf8",
                  fontWeight: 700,
                  fontSize: 28,
                  minWidth: 40,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {item}
            </li>
          );
        })}
      </ul>
    </SlideLayout>
  );
};
