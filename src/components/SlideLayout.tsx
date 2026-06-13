import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";

interface SlideLayoutProps {
  title?: string;
  children: ReactNode;
  /** Background color / gradient for the slide. */
  background?: string;
}

/**
 * Shared visual shell for slides. Not required — slides can render anything
 * inside <AbsoluteFill> — but this keeps a consistent look & padding across
 * a deck and is a good starting point to customize per-project.
 */
export const SlideLayout = ({
  title,
  children,
  background = "linear-gradient(135deg, #1e1b4b 0%, #0b0b0f 100%)",
}: SlideLayoutProps) => {
  return (
    <AbsoluteFill
      style={{
        background,
        color: "#fff",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        padding: 80,
        boxSizing: "border-box",
      }}
    >
      {title ? (
        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            marginBottom: 40,
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
      ) : null}
      <div style={{ flex: 1, fontSize: 32, lineHeight: 1.5 }}>{children}</div>
    </AbsoluteFill>
  );
};
