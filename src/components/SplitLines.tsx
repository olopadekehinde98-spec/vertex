import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "../lib/ui";

type Props = {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  stagger?: number;
  /** `true` plays on mount (hero), otherwise it plays when scrolled into view. */
  play?: boolean;
};

/**
 * Headings reveal a line at a time from behind a mask, like signage being
 * uncovered. Each line is clipped by its own overflow-hidden wrapper.
 */
export function SplitLines({
  lines,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 0.1,
  play = false,
}: Props) {
  const anim = play
    ? { animate: "shown" as const }
    : { whileInView: "shown" as const, viewport: { once: true, margin: "0px 0px -15% 0px" } };

  return (
    <Tag className={className}>
      <motion.span className="block" initial="hidden" {...anim}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block"
              variants={{
                hidden: { y: "105%" },
                shown: { y: 0 },
              }}
              transition={{ delay: delay + i * stagger, duration: 0.95, ease: EASE }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
