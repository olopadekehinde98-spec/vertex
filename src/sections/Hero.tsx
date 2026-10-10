import { motion, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useRef } from "react";
import { Img } from "../components/Img";
import { SplitLines } from "../components/SplitLines";
import { hero, photos } from "../data/content";
import { useMotionOK } from "../hooks/useMediaQuery";
import { useSectionProgress } from "../hooks/useSectionProgress";
import { EASE, goTo } from "../lib/ui";

/**
 * Stage 01 — Vision.
 *
 * The finished building, shown first. As the visitor starts to scroll the camera
 * pulls back and drops away from it, so the hand-off into the empty land reads as
 * travelling backwards through time rather than one section fading into another.
 */
export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const motionOK = useMotionOK();
  const p = useSectionProgress(ref, ["start start", "end start"]);

  const scale = useTransform(p, [0, 1], [1, 0.82]);
  const y = useTransform(p, [0, 1], ["0%", "12%"]);
  const dim = useTransform(p, [0, 0.75], [0, 0.85]);
  const fade = useTransform(p, [0, 0.45], [1, 0]);

  return (
    <section
      id="vision"
      ref={ref}
      className="relative isolate flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-void"
    >
      <motion.div className="absolute inset-0 -z-20" style={motionOK ? { scale, y } : undefined}>
        <Img photo={photos.tower} priority sizes="100vw" widths={[828, 1280, 1920]} />
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/55 to-void/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-void/92 via-void/35 to-transparent" />
      <motion.div
        className="absolute inset-0 -z-10 bg-void"
        style={motionOK ? { opacity: dim } : { opacity: 0 }}
        aria-hidden
      />

      <motion.div
        className="frame relative flex flex-1 items-center pt-24"
        style={motionOK ? { opacity: fade } : undefined}
      >
        <div className="max-w-[46rem]">
          <motion.p
            className="spec mb-6 flex items-center gap-3 text-[10px]"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <span className="h-px w-9 bg-copper" />
            {hero.eyebrow}
          </motion.p>

          {ready && (
            <SplitLines
              as="h1"
              play
              delay={0.25}
              stagger={0.12}
              className="signage text-[clamp(2.6rem,7.5vw,6.5rem)]"
              lines={[
                hero.lines[0],
                <span key="l2">
                  what comes <span className="text-copper">next.</span>
                </span>,
              ]}
            />
          )}

          <motion.p
            className="mt-7 max-w-[44ch] text-[15px] leading-[1.75] text-mute"
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.9, ease: EASE }}
          >
            {hero.body}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-5"
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
          >
            <button type="button" onClick={() => goTo("showcase")} className="btn btn-copper">
              {hero.primary}
              <span aria-hidden>→</span>
            </button>
            <button
              type="button"
              onClick={() => goTo("land")}
              className="group flex items-center gap-3 py-2.5 text-[13px] text-chalk"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-copper group-hover:text-copper">
                <Play className="h-4 w-4 translate-x-[1px]" fill="currentColor" strokeWidth={0} />
              </span>
              {hero.secondary}
            </button>
          </motion.div>
        </div>

        {/* Figures, stacked down the right edge. Labelled as demonstration data. */}
        <motion.dl
          className="absolute top-1/2 right-5 hidden -translate-y-1/2 flex-col gap-7 border-l border-line pl-5 lg:flex xl:right-10"
          initial={{ opacity: 0, x: 20 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 1.25, duration: 0.9, ease: EASE }}
        >
          {hero.stats.map((s) => (
            <div key={s.label} className="min-w-0">
              <dt className="signage text-[1.9rem] leading-none text-chalk">{s.value}</dt>
              <dd className="spec mt-1.5 text-[10px]">{s.label}</dd>
            </div>
          ))}
          <p className="spec max-w-[14ch] text-[10px] leading-snug text-faint">{hero.statsNote}</p>
        </motion.dl>
      </motion.div>

      {/* Phones get the same figures as a strip, rather than losing them. */}
      <motion.div
        className="frame relative pb-6 lg:hidden"
        style={motionOK ? { opacity: fade } : undefined}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.25, duration: 0.8 }}
      >
        <dl className="grid grid-cols-4 gap-3 border-t border-line pt-4">
          {hero.stats.map((s) => (
            <div key={s.label} className="min-w-0">
              <dt className="signage text-[1.15rem] leading-none text-chalk">{s.value}</dt>
              <dd className="spec mt-1 text-[10px] leading-tight">{s.label}</dd>
            </div>
          ))}
        </dl>
        <p className="spec mt-3 text-[10px] text-faint">{hero.statsNote}</p>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => goTo("land")}
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 py-2 lg:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={motionOK ? { opacity: fade } : undefined}
      >
        <span className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-copper">
          <span aria-hidden>↓</span>
        </span>
        <span className="spec text-[10px]">Scroll</span>
      </motion.button>
    </section>
  );
}
