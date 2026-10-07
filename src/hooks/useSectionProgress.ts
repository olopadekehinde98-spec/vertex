import { useScroll, useTransform, type MotionValue } from "framer-motion";
import type { RefObject } from "react";

type ScrollOptions = NonNullable<Parameters<typeof useScroll>[0]>;
type Offset = ScrollOptions["offset"];

/**
 * Scroll progress for a pinned stage, 0 → 1.
 *
 * The identity `useTransform` is load-bearing, not decorative. Without it Framer
 * hands scroll-linked values to the browser's native ScrollTimeline, and with
 * multi-stop ranges the value desyncs from the actual scroll position — a stage
 * reports 8% when the user is halfway down it. Every scroll-driven value on this
 * site runs through here so the construction always matches the scrollbar.
 */
export function useSectionProgress(
  target: RefObject<HTMLElement | null>,
  offset: Offset = ["start start", "end end"]
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target, offset });
  return useTransform(scrollYProgress, (v) => v);
}
