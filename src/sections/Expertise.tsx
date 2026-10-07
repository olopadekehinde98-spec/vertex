import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { SplitLines } from "../components/SplitLines";
import { services } from "../data/content";
import { EASE } from "../lib/ui";

/**
 * Stage 08 — Expertise.
 *
 * A full-bleed explorer rather than a grid of identical cards: picking a
 * discipline changes the photograph behind the whole section along with the
 * heading and detail, so the services are shown rather than listed.
 */
export function Expertise() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="expertise" className="relative isolate overflow-hidden bg-void py-24 lg:py-32">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Img photo={current.photo} sizes="100vw" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-void/80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-void via-void/70 to-void/40" />

      <div className="frame lg:pl-28 xl:pl-36 2xl:pl-56">
        <Reveal>
          <p className="spec mb-5 flex items-center gap-3 text-[10px]">
            <span className="h-px w-9 bg-copper" />
            08 — Our Expertise
          </p>
        </Reveal>
        <SplitLines
          className="signage max-w-[18ch] text-[clamp(2rem,5vw,4rem)]"
          lines={["Our expertise", "builds possibilities."]}
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.75] text-mute">
            A full range of construction and engineering services, delivered by one team from first
            survey to handover.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* The selector */}
          <ul className="min-w-0">
            {services.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.key} className="border-b border-line first:border-t">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="group flex w-full items-center justify-between gap-5 py-5 text-left"
                  >
                    <span className="flex min-w-0 items-baseline gap-4">
                      <span className={`spec text-[10px] ${on ? "text-copper" : "text-faint"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`signage truncate text-[clamp(1.4rem,3.2vw,2.1rem)] transition-colors duration-400 ${
                          on ? "text-chalk" : "text-faint group-hover:text-mute"
                        }`}
                      >
                        {s.title}
                      </span>
                    </span>
                    <span
                      className={`h-px shrink-0 bg-copper transition-all duration-500 ${
                        on ? "w-10 opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* The detail panel */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-line">
                  <Img photo={current.photo} sizes="(min-width: 1024px) 45vw, 92vw" widths={[640, 1024]} />
                  <span className="absolute top-4 left-4 bg-void/80 px-3 py-1.5">
                    <span className="spec text-[10px] text-copper">{current.title}</span>
                  </span>
                </div>
                <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.75] text-mute">
                  {current.blurb}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {current.items.map((item) => (
                    <li
                      key={item}
                      className="spec border border-line-strong px-3 py-2 text-[10px] text-mute"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
