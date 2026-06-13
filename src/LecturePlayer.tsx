import { useCallback, useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { LectureComposition } from "./LectureComposition";
import {
  SLIDES,
  LECTURE_FPS,
  LECTURE_WIDTH,
  LECTURE_HEIGHT,
  getTotalDurationInFrames,
  getSlideStartFrames,
} from "./lecture.config";
import { SlideMenu } from "./components/SlideMenu";
import { PlayerControls } from "./components/PlayerControls";
import { useLectureUrlState } from "./hooks/useLectureUrlState";

const totalDuration = getTotalDurationInFrames();
const slideStartFrames = getSlideStartFrames();

/** Returns the index of the slide that contains `frame`. */
const slideIndexForFrame = (frame: number): number => {
  let index = 0;
  for (let i = 0; i < slideStartFrames.length; i++) {
    if (frame >= slideStartFrames[i]) {
      index = i;
    } else {
      break;
    }
  }
  return index;
};

/**
 * Top-level lecture player: wraps the Remotion <Player>, adds keyboard
 * navigation, a slide menu, transport controls, and URL-param-based
 * deep-linking (?slide=N).
 *
 * This is the main component you mount in your app — see App.tsx.
 */
export const LecturePlayer = () => {
  const playerRef = useRef<PlayerRef>(null);
  const { initialSlideIndex, setSlideInUrl } = useLectureUrlState(
    SLIDES.length,
  );

  const [currentSlideIndex, setCurrentSlideIndex] =
    useState(initialSlideIndex);
  const [playing, setPlaying] = useState(false);

  // Seek to the initial slide (from ?slide=N) once the player is ready.
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    const startFrame = slideStartFrames[initialSlideIndex] ?? 0;
    if (startFrame > 0) {
      player.seekTo(startFrame);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep currentSlideIndex (and the URL) in sync with playback position.
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onFrameUpdate = () => {
      const frame = player.getCurrentFrame();
      const index = slideIndexForFrame(frame);
      setCurrentSlideIndex((prev) => (prev !== index ? index : prev));
    };

    player.addEventListener("frameupdate", onFrameUpdate);
    player.addEventListener("play", () => setPlaying(true));
    player.addEventListener("pause", () => setPlaying(false));
    player.addEventListener("ended", () => setPlaying(false));

    return () => {
      player.removeEventListener("frameupdate", onFrameUpdate);
    };
  }, []);

  // Reflect the current slide in the URL whenever it changes.
  useEffect(() => {
    setSlideInUrl(currentSlideIndex);
  }, [currentSlideIndex, setSlideInUrl]);

  const goToSlide = useCallback((index: number) => {
    const clamped = Math.min(Math.max(index, 0), SLIDES.length - 1);
    const player = playerRef.current;
    if (!player) return;
    const startFrame = slideStartFrames[clamped] ?? 0;
    player.seekTo(startFrame);
    setCurrentSlideIndex(clamped);
  }, []);

  const goToNextSlide = useCallback(() => {
    goToSlide(currentSlideIndex + 1);
  }, [currentSlideIndex, goToSlide]);

  const goToPrevSlide = useCallback(() => {
    goToSlide(currentSlideIndex - 1);
  }, [currentSlideIndex, goToSlide]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (player.isPlaying()) {
      player.pause();
    } else {
      // If we're at the very end, restart from the beginning of the current
      // slide for a nicer "replay" experience.
      if (player.getCurrentFrame() >= totalDuration - 1) {
        player.seekTo(slideStartFrames[currentSlideIndex] ?? 0);
      }
      player.play();
    }
  }, [currentSlideIndex]);

  // Keyboard navigation: ArrowRight/ArrowLeft change slides, Space
  // play/pauses. Ignored while typing in an input/textarea.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          goToNextSlide();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPrevSlide();
          break;
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToNextSlide, goToPrevSlide, togglePlay]);

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0b0b0f] text-white">
      <SlideMenu
        slides={SLIDES}
        currentSlideIndex={currentSlideIndex}
        onSelect={goToSlide}
      />

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center bg-black p-4">
          <div className="aspect-video w-full max-w-[1280px] shadow-2xl">
            <Player
              ref={playerRef}
              component={LectureComposition}
              durationInFrames={totalDuration}
              fps={LECTURE_FPS}
              compositionWidth={LECTURE_WIDTH}
              compositionHeight={LECTURE_HEIGHT}
              style={{ width: "100%", height: "100%" }}
              controls={false}
              loop={false}
              clickToPlay={false}
              showVolumeControls={false}
              autoPlay={false}
            />
          </div>
        </div>

        <PlayerControls
          playing={playing}
          onTogglePlay={togglePlay}
          onPrev={goToPrevSlide}
          onNext={goToNextSlide}
          currentSlideIndex={currentSlideIndex}
          totalSlides={SLIDES.length}
          currentSlideTitle={currentSlide?.title ?? ""}
        />
      </div>
    </div>
  );
};
