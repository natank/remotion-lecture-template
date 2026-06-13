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
 * Arrow keys step through per-slide animations first; only when past the
 * last (or before the first) step do they advance to the next/prev slide.
 */
export const LecturePlayer = () => {
  const playerRef = useRef<PlayerRef>(null);
  const { initialSlideIndex, setSlideInUrl } = useLectureUrlState(
    SLIDES.length,
  );

  const [currentSlideIndex, setCurrentSlideIndex] =
    useState(initialSlideIndex);
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);

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
      setCurrentSlideIndex((prev) => {
        if (prev !== index) {
          setStep(0);
          return index;
        }
        return prev;
      });
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
    setStep(0);
  }, []);

  /** Advance one animation step, or move to the next slide if at the last step. */
  const stepForward = useCallback(() => {
    const slideStepCount = SLIDES[currentSlideIndex]?.stepCount ?? 0;
    if (slideStepCount === 0 || step >= slideStepCount - 1) {
      // No more steps — go to next slide if possible
      if (currentSlideIndex < SLIDES.length - 1) {
        goToSlide(currentSlideIndex + 1);
      }
      // Already on last slide at last step: do nothing
    } else {
      setStep((s) => s + 1);
    }
  }, [currentSlideIndex, step, goToSlide]);

  /** Go back one animation step, or move to the previous slide if at step 0. */
  const stepBack = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      // At first step — go to previous slide if possible
      if (currentSlideIndex > 0) {
        const prevIndex = currentSlideIndex - 1;
        const prevStepCount = SLIDES[prevIndex]?.stepCount ?? 0;
        const player = playerRef.current;
        if (!player) return;
        player.seekTo(slideStartFrames[prevIndex] ?? 0);
        setCurrentSlideIndex(prevIndex);
        // Land on the last step of the previous slide
        setStep(prevStepCount > 0 ? prevStepCount - 1 : 0);
      }
      // Already on first slide at step 0: do nothing
    }
  }, [currentSlideIndex, step]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (player.isPlaying()) {
      player.pause();
    } else {
      if (player.getCurrentFrame() >= totalDuration - 1) {
        player.seekTo(slideStartFrames[currentSlideIndex] ?? 0);
      }
      player.play();
    }
  }, [currentSlideIndex]);

  // Keyboard navigation: ArrowRight advances steps/slides, ArrowLeft goes back.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          stepForward();
          break;
        case "ArrowLeft":
          e.preventDefault();
          stepBack();
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
  }, [stepForward, stepBack, togglePlay]);

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
              inputProps={{ currentSlideIndex, step }}
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
          onPrev={stepBack}
          onNext={stepForward}
          currentSlideIndex={currentSlideIndex}
          totalSlides={SLIDES.length}
          currentSlideTitle={currentSlide?.title ?? ""}
        />
      </div>
    </div>
  );
};
