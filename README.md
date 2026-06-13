# remotion-lecture-template

A reusable React + Remotion Player template for building and presenting
lecture slide decks live in the browser — no video rendering required.

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL. You'll see the player, a slide menu on the
left, and transport controls below the player.

## Creating a new lecture from this template

This is a template repo, not a library — to start a new lecture:

1. Copy this whole folder (or use it as a GitHub template / `degit`).
2. Rename the project in `package.json` if you like.
3. Edit `src/lecture.config.ts` to register your slides.
4. Replace/add components in `src/slides/`.

## Project structure

```
src/
  slides/                 # One file per slide, each a standalone React component
    01-Title.tsx
    02-Agenda.tsx
    03-Concept.tsx
    04-Closing.tsx
  components/
    SlideLayout.tsx       # Optional shared layout/shell for slide content
    SlideMenu.tsx          # Left-hand slide index / jump menu
    PlayerControls.tsx    # Play/pause + prev/next transport bar
  hooks/
    useLectureUrlState.ts # Reads/writes ?slide=N URL param
  lecture.config.ts        # <-- Central registry: slides, order, durations, FPS
  LectureComposition.tsx   # Wires SLIDES into a Remotion <Series>
  LecturePlayer.tsx         # Top-level player: <Player>, keyboard nav, menu, controls
  App.tsx
  main.tsx
```

## Adding, removing, and reordering slides

All of this happens in **`src/lecture.config.ts`**:

```ts
export const SLIDES: SlideDefinition[] = [
  { id: "title",   title: "Title",       durationInFrames: 90,  component: TitleSlide },
  { id: "agenda",  title: "Agenda",       durationInFrames: 150, component: AgendaSlide },
  { id: "concept", title: "Core Concept", durationInFrames: 240, component: ConceptSlide },
  { id: "closing", title: "Closing",      durationInFrames: 90,  component: ClosingSlide },
];
```

- **Add a slide**: create `src/slides/05-MySlide.tsx` exporting a component,
  import it at the top of `lecture.config.ts`, and add an entry to `SLIDES`.
- **Remove a slide**: delete its entry from `SLIDES` (and the file, if no
  longer needed).
- **Reorder slides**: reorder the array. Order in `SLIDES` = order of
  playback, the slide menu, and `?slide=N` numbering.
- **Change a slide's length**: edit `durationInFrames` (at `LECTURE_FPS`,
  i.e. `durationInFrames / 30` seconds).

Nothing else needs to change — `LectureComposition`, the slide menu, the
URL param logic, and the player all read from `SLIDES` directly.

## Editing individual slides

Each slide in `src/slides/` is a normal React component. You have full
access to Remotion's animation primitives:

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const MySlide = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity, justifyContent: "center", alignItems: "center" }}>
      <h1>My new slide</h1>
    </AbsoluteFill>
  );
};
```

Use `SlideLayout` (in `src/components/SlideLayout.tsx`) for a consistent
title + content shell, or build your own layout from scratch — slides only
need to render *something* inside the 1920×1080 frame.

## Playing the full lecture or jumping to a slide

- **Play/pause**: click the Play button or press `Space`.
- **Next / previous slide**: click Prev/Next or press `→` / `←`. This seeks
  the player to the start frame of the adjacent slide.
- **Jump to any slide**: click it in the left-hand slide menu.
- **Deep link to a slide**: open the app with `?slide=3` in the URL to start
  on slide 3 (1-indexed). The URL updates automatically as you navigate, so
  you can copy/share/bookmark a link to a specific slide.

## Configuration

All set in `src/lecture.config.ts`:

| Constant         | Default | Meaning                        |
|------------------|---------|---------------------------------|
| `LECTURE_FPS`     | `30`    | Frames per second               |
| `LECTURE_WIDTH`   | `1920`  | Composition width in pixels     |
| `LECTURE_HEIGHT`  | `1080`  | Composition height in pixels    |

## Tailwind CSS

Tailwind is set up for the presenter UI (slide menu, controls) via
`tailwind.config.js` / `postcss.config.js` / `src/index.css`. Slide content
itself uses inline styles (so it behaves identically if you ever add
`remotion render` for video export), but feel free to use Tailwind classes
inside slides too if you don't need that portability.

## Rendering to video (optional)

This template is focused on the live browser player and intentionally does
not include `remotion render` scripts or a `Root.tsx`/`remotion.config.ts`
setup. If you later want to render `LectureComposition` to an MP4, you can
register it as a Remotion composition using the standard Remotion CLI setup
— `LECTURE_FPS`, `LECTURE_WIDTH`, `LECTURE_HEIGHT`, and
`getTotalDurationInFrames()` from `lecture.config.ts` give you everything
needed for the `<Composition>` props.
