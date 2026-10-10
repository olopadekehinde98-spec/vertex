import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { journey } from "../data/content";
import { useIsDesktop } from "../hooks/useMediaQuery";

/**
 * The scroll journey: ten numbered stops down the left edge, joined by arrows,
 * with the current stage lit. On a phone this becomes a slim progress bar with
 * the stage name, since a ten-item column would eat the screen.
 */
export function JourneyRail() {
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", () => {
    const probe = window.scrollY + window.innerHeight * 0.45;
    let best = -1;
    let current = 0;
    journey.forEach((s, i) => {
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
      <div className="fixed inset-x-0 top-[58px] z-50 xl:hidden">
        <motion.div className="h-[2px] origin-left bg-copper" style={{ scaleX: bar }} aria-hidden />
        <div className="flex items-center gap-2 bg-void/85 px-5 py-2 backdrop-blur-sm">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-copper text-[10px] font-semibold text-white">
            {journey[active].no}
          </span>
          <span className="spec truncate text-[10px] text-chalk">
            {journey[active].label} {journey[active].sub}
          </span>
        </div>
      </div>
    );
  }

  return (
    <nav
      aria-label="Scroll journey"
      className="fixed top-0 bottom-0 left-0 z-50 hidden w-[132px] flex-col justify-center border-r border-line bg-charcoal/92 px-5 backdrop-blur-sm xl:flex"
    >
      <p className="signage mb-6 text-[13px] leading-tight tracking-[0.12em] text-chalk">
        Scroll
        <br />
        Journey
      </p>

      <ol className="flex flex-col">
        {journey.map((s, i) => {
          const on = i === active;
          const done = i < active;
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} className="group flex items-start gap-2.5 py-1.5">
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] font-semibold transition-all duration-400 ${
                    on
                      ? "border-copper bg-copper text-white"
                      : done
                        ? "border-copper/50 bg-copper/15 text-copper"
                        : "border-line-strong text-faint group-hover:border-copper/60 group-hover:text-mute"
                  }`}
                >
                  {s.no}
                </span>
                <span
                  className={`mt-0.5 min-w-0 text-[10px] leading-[1.3] transition-colors duration-400 ${
                    on ? "text-chalk" : "text-faint group-hover:text-mute"
                  }`}
                >
                  {s.label}
                  {s.sub && (
                    <>
                      <br />
                      <span className="text-faint">{s.sub}</span>
                    </>
                  )}
                </span>
              </a>

              {i < journey.length - 1 && (
                <span
                  aria-hidden
                  className={`ml-[11px] block h-3 w-px transition-colors duration-400 ${
                    done ? "bg-copper/50" : "bg-line-strong"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
