import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { stages } from "../data/content";
import { useIsDesktop } from "../hooks/useMediaQuery";

/**
 * The stage indicator. On desktop it is a fixed vertical rail down the left
 * edge; on a phone that would eat the screen, so it collapses to a thin top bar
 * with the current stage name — the same information, in the space available.
 */
export function ScrollRail() {
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [active, setActive] = useState(0);

  // Pick the last stage whose top has passed the probe line.
  useMotionValueEvent(scrollYProgress, "change", () => {
    const probe = window.scrollY + window.innerHeight * 0.45;
    let best = -1;
    let current = 0;
    stages.forEach((s, i) => {
      const el = document.getElementById(s.id);
      if (el && el.offsetTop <= probe && el.offsetTop > best) {
        best = el.offsetTop;
        current = i;
      }
    });
    setActive(current);
  });

  if (!desktop) {
    return (
      <div className="fixed inset-x-0 top-[60px] z-50 lg:hidden" aria-hidden>
        <motion.div className="h-px origin-left bg-copper" style={{ scaleX: bar }} />
        <div className="frame flex items-center gap-2 py-2">
          <span className="spec text-[10px] text-copper">{stages[active].no}</span>
          <span className="spec text-[10px] text-mute">{stages[active].label}</span>
        </div>
      </div>
    );
  }

  return (
    <nav
      aria-label="Construction stages"
      // Anchored to the frame gutter once the layout stops filling the window.
      style={{ left: "max(1.5rem, calc(50vw - 45rem))" }}
      className="fixed top-1/2 z-50 hidden -translate-y-1/2 lg:block"
    >
      <ol className="flex flex-col gap-2.5">
        {stages.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} className="group flex items-center gap-3 py-2.5">
                <span
                  className={`h-px transition-all duration-500 ${
                    on ? "w-7 bg-copper" : "w-3.5 bg-line-strong group-hover:w-5"
                  }`}
                />
                <span
                  className={`spec text-[10px] whitespace-nowrap transition-colors duration-500 ${
                    on ? "text-chalk" : "text-faint group-hover:text-mute"
                  }`}
                >
                  <span className={on ? "text-copper" : ""}>{s.no}</span>
                  {/* Labels only where the layout has room for them beside the content. */}
                  <span className="hidden 2xl:inline"> {s.label}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
