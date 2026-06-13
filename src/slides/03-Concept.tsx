import { SlideLayout } from "../components/SlideLayout";

/**
 * Example slide: plain content slide. Copy this file as a starting point
 * for new "explain a concept" slides — static content, no animation.
 */
export const ConceptSlide = () => {
  return (
    <SlideLayout title="Core Concept">
      <p>
        Replace this with your explanation. You can use any HTML/CSS here —
        text, images, code blocks, diagrams, etc.
      </p>
      <ul>
        <li>Point one</li>
        <li>Point two</li>
        <li>Point three</li>
      </ul>
    </SlideLayout>
  );
};
