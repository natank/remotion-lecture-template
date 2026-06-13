import type { SlideDefinition } from "../types";

interface SlideMenuProps {
  slides: SlideDefinition[];
  currentSlideIndex: number;
  onSelect: (index: number) => void;
}

/**
 * Sidebar list of all slides. Click any item to jump directly to that
 * slide (sets the player's frame to the slide's start frame).
 */
export const SlideMenu = ({
  slides,
  currentSlideIndex,
  onSelect,
}: SlideMenuProps) => {
  return (
    <nav className="flex w-64 flex-col gap-1 overflow-y-auto border-r border-white/10 bg-[#13131a] p-3">
      <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/40">
        Slides
      </h2>
      {slides.map((slide, index) => {
        const isActive = index === currentSlideIndex;
        return (
          <button
            key={slide.id}
            onClick={() => onSelect(index)}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
              isActive
                ? "bg-indigo-500/20 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "bg-white/10 text-white/50"
              }`}
            >
              {index + 1}
            </span>
            <span className="truncate">{slide.title}</span>
          </button>
        );
      })}
    </nav>
  );
};
