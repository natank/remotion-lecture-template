import { useCurrentFrame, interpolate } from "remotion";
import { SlideLayout } from "../components/SlideLayout";

const AGENDA_ITEMS = [
  "Introduction & motivation",
  "Core concepts",
  "Live demo",
  "Q&A and wrap-up",
];

/**
 * Example slide: agenda list with items staggering in one at a time.
 */
export const AgendaSlide = () => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout title="Agenda">
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {AGENDA_ITEMS.map((item, i) => {
          const delay = i * 10;
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });
          const translateX = interpolate(
            frame,
            [delay, delay + 15],
            [-30, 0],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
          );

          return (
            <li
              key={item}
              style={{
                opacity,
                transform: `translateX(${translateX}px)`,
                padding: "16px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span style={{ color: "#818cf8", marginRight: 16 }}>
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
