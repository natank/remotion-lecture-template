interface PlayerControlsProps {
  playing: boolean;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentSlideIndex: number;
  totalSlides: number;
  currentSlideTitle: string;
}

/**
 * Transport bar shown below the player: play/pause, prev/next slide, and
 * a label showing which slide is currently active.
 */
export const PlayerControls = ({
  playing,
  onTogglePlay,
  onPrev,
  onNext,
  currentSlideIndex,
  totalSlides,
  currentSlideTitle,
}: PlayerControlsProps) => {
  return (
    <div className="flex items-center gap-4 border-t border-white/10 bg-[#13131a] px-4 py-3">
      <button
        onClick={onPrev}
        className="rounded-md bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/20"
        title="Previous slide (←)"
      >
        ◀ Prev
      </button>
      <button
        onClick={onTogglePlay}
        className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold hover:bg-indigo-400"
        title="Play/Pause (Space)"
      >
        {playing ? "⏸ Pause" : "▶ Play"}
      </button>
      <button
        onClick={onNext}
        className="rounded-md bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/20"
        title="Next slide (→)"
      >
        Next ▶
      </button>

      <div className="ml-4 text-sm text-white/60">
        Slide{" "}
        <span className="font-semibold text-white">
          {currentSlideIndex + 1}
        </span>{" "}
        / {totalSlides} — {currentSlideTitle}
      </div>

      <div className="ml-auto text-xs text-white/30">
        ← / → slides · Space play/pause
      </div>
    </div>
  );
};
