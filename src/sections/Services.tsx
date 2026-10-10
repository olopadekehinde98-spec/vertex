import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { SplitLines } from "../components/SplitLines";
import { services } from "../data/content";
import { EASE } from "../lib/ui";

/**
 * Stage 08 — Our Expertise.
 *
 * Five disciplines as a row of photographic cards. Choosing one changes the
 * photograph behind the whole section along with the detail beneath it, so the
 * services are shown rather than listed. The cards are a horizontal rail on a
 * phone, which keeps all five reachable with a thumb.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="services" className="relative isolate overflow-hidden bg-void py-20 lg:py-28">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Img photo={current.photo} sizes="100vw" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-void/82" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/70 to-void/50" />

      <div className="frame">
        <Reveal>
          <p className="spec mb-5 flex items-center gap-3 text-[10px]">
            <span className="h-px w-9 bg-copper" />
            08 — Our Services
          </p>
        </Reveal>
        <SplitLines
          className="signage max-w-[20ch] text-[clamp(1.9rem,4.6vw,3.6rem)]"
          lines={["Our expertise", "builds possibilities."]}
        />
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.75] text-mute">
            A full range of construction and engineering services, delivered with excellence by one
            team from first survey to handover.
          </p>
        </Reveal>

        <ul className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {services.map((s, i) => {
            const on = i === active;
            return (
              <li key={s.key} className="w-[62vw] min-w-0 shrink-0 snap-start sm:w-[38vw] lg:w-auto">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-pressed={on}
                  className={`group relative block aspect-[3/4] w-full overflow-hidden border text-left transition-colors duration-500 ${
                    on ? "border-copper" : "border-line hover:border-line-strong"
                  }`}
                >
                  <Img
                    photo={s.photo}
                    sizes="(min-width: 1024px) 18vw, 62vw"
                    widths={[400, 640]}
                    className={`transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      on ? "scale-[1.06]" : "group-hover:scale-[1.04]"
                    }`}
                  />
                  <span
                    className={`absolute inset-0 transition-colors duration-500 ${
                      on ? "bg-void/35" : "bg-void/65"
                    }`}
                  />
                  <span className="absolute inset-x-0 bottom-0 p-4">
                    <span className="spec block text-[10px] text-copper">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="signage mt-2 block text-[1.05rem] leading-tight text-chalk">
                      {s.title}
                    </span>
                    {s.sub && (
                      <span className="mt-1 block text-[11.5px] leading-tight text-mute">{s.sub}</span>
                    )}
                    <span
                      className={`mt-3 block h-px origin-left bg-copper transition-transform duration-500 ${
                        on ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Detail for the selected discipline. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-8 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between"
          >
            <p className="max-w-[52ch] text-[14.5px] leading-[1.75] text-mute">{current.blurb}</p>
            <ul className="flex flex-wrap gap-2">
              {current.items.map((item) => (
                <li key={item} className="spec border border-line-strong px-3 py-2 text-[10px] text-mute">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
