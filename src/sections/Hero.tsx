import { motion, useTransform } from "framer-motion";
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
 * The finished building, shown first. As the visitor starts to scroll, the
 * camera pulls back and drops away from it: the frame scales down and lifts
 * while the image darkens, so the hand-off into the empty land reads as
 * travelling backwards through time rather than one section fading into another.
 */
export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const motionOK = useMotionOK();
  const p = useSectionProgress(ref, ["start start", "end start"]);

  // Camera pulling away from the completed tower.
  const scale = useTransform(p, [0, 1], [1, 0.82]);
  const y = useTransform(p, [0, 1], ["0%", "12%"]);
  const dim = useTransform(p, [0, 0.75], [0, 0.85]);
  const contentFade = useTransform(p, [0, 0.4], [1, 0]);

  const delay = ready ? 0 : 0.2;

  return (
    <section
      id="vision"
      ref={ref}
      className="relative isolate flex h-[100svh] min-h-[640px] flex-col justify-end overflow-hidden bg-void"
    >
      <motion.div
        className="absolute inset-0 -z-20"
        style={motionOK ? { scale, y } : undefined}
      >
        <Img photo={photos.tower} priority sizes="100vw" widths={[828, 1280, 1920]} />
      </motion.div>

      {/* Grading: keep the sky, sink the base so type always has a ground. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/55 to-void/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-void/90 via-void/30 to-transparent" />
      <motion.div
        className="absolute inset-0 -z-10 bg-void"
        style={motionOK ? { opacity: dim } : { opacity: 0 }}
      />

      <motion.div
        className="frame relative flex flex-1 flex-col justify-end pt-28 pb-10 lg:pl-28 xl:pl-36 2xl:pl-56"
        style={motionOK ? { opacity: contentFade } : undefined}
      >
        <div className="flex flex-1 flex-col justify-center">
          <motion.p
            className="spec mb-6 flex items-center gap-3 text-[10px]"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.1, duration: 0.8 }}
          >
            <span className="h-px w-9 bg-copper" />
            {hero.eyebrow}
          </motion.p>

          {ready && (
            <SplitLines
              as="h1"
              play
              delay={delay + 0.25}
              stagger={0.12}
              className="signage max-w-[14ch] text-[clamp(2.75rem,8.5vw,7.5rem)]"
              lines={[
                hero.lines[0],
                <span key="l2">
                  what comes <span className="text-copper">next.</span>
                </span>,
              ]}
            />
          )}

          <motion.p
            className="mt-7 max-w-[46ch] text-[15px] leading-[1.75] text-mute"
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay + 0.85, duration: 0.9, ease: EASE }}
          >
            {hero.body}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay + 1.05, duration: 0.9, ease: EASE }}
          >
            <button type="button" onClick={() => goTo("land")} className="btn btn-copper">
              Explore the Process
              <span aria-hidden>→</span>
            </button>
            <button type="button" onClick={() => goTo("completion")} className="btn btn-ghost">
              <span aria-hidden>▶</span>
              Watch the Story
            </button>
          </motion.div>
        </div>

        {/* Figures. Labelled as demonstration data, because they are. */}
        <motion.div
          className="mt-10 border-t border-line pt-6"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: delay + 1.3, duration: 0.9 }}
        >
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:ml-auto lg:max-w-xl">
            {hero.stats.map((s) => (
              <div key={s.label} className="min-w-0">
                <dt className="signage text-[1.75rem] text-chalk sm:text-[2rem]">{s.value}</dt>
                <dd className="spec mt-1 text-[10px]">{s.label}</dd>
              </div>
            ))}
          </dl>
          <p className="spec mt-5 text-[10px] text-faint">{hero.statsNote}</p>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => goTo("land")}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 py-2"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: delay + 1.5, duration: 0.8 }}
        style={motionOK ? { opacity: contentFade } : undefined}
      >
        <span className="spec text-[10px]">Scroll</span>
        <motion.span
          className="block h-8 w-px bg-gradient-to-b from-copper to-transparent"
          animate={motionOK ? { scaleY: [0.4, 1, 0.4] } : {}}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
      </motion.button>
    </section>
  );
}
