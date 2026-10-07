import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { Img } from "../components/Img";
import { SplitLines } from "../components/SplitLines";
import { completedProject, photos } from "../data/content";
import { useMotionOK } from "../hooks/useMediaQuery";
import { useSectionProgress } from "../hooks/useSectionProgress";

/**
 * Stage 07 — Completion.
 *
 * The payoff: the same photograph the visitor saw in the hero, revealed from
 * behind a wipe as the camera pulls away. They have just built the building they
 * were looking at when they arrived.
 */
export function Completion() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const motionOK = useMotionOK();

  // Camera pulls back off the finished tower.
  const scale = useTransform(p, [0, 0.6], [1.22, 1]);
  // A horizontal wipe uncovers the building, like a hoarding coming down.
  const reveal = useTransform(p, [0.05, 0.45], ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]);
  const dusk = useTransform(p, [0.3, 0.75], [0.7, 0.15]);
  const factsY = useTransform(p, [0.45, 0.7], [40, 0]);
  const factsFade = useTransform(p, [0.45, 0.65], [0, 1]);

  return (
    <section id="completion" ref={ref} className="relative h-[340vh] bg-void">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={motionOK ? { scale, clipPath: reveal } : undefined}
        >
          <Img photo={photos.tower} sizes="100vw" widths={[828, 1280, 1920]} />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/45" />
        <motion.div
          className="absolute inset-0 bg-void"
          style={{ opacity: motionOK ? dusk : 0.2 }}
          aria-hidden
        />

        <div className="frame relative flex h-full flex-col justify-end pb-14 lg:pb-20 lg:pl-28 xl:pl-36 2xl:pl-56">
          <div className="max-w-[52ch]">
            <p className="spec mb-5 flex items-center gap-3 text-[10px]">
              <span className="h-px w-9 bg-copper" />
              07 — Completion
            </p>
            <SplitLines
              className="signage text-[clamp(2.25rem,6.5vw,5.5rem)]"
              lines={["A vision", <span key="r" className="text-copper">realized.</span>]}
            />
            <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.75] text-mute">
              From concept to a real structure. Built to stand. Designed to inspire.
            </p>
          </div>

          <motion.div
            className="mt-10 border-t border-line pt-6"
            style={motionOK ? { y: factsY, opacity: factsFade } : undefined}
          >
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <h3 className="signage text-[1.5rem] text-chalk">{completedProject.name}</h3>
              <span className="spec text-[10px]">{completedProject.location}</span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {completedProject.facts.map((f) => (
                <div key={f.k} className="min-w-0">
                  <dt className="spec text-[10px]">{f.k}</dt>
                  <dd className="signage mt-1.5 text-[1.3rem] text-chalk">{f.v}</dd>
                </div>
              ))}
            </dl>
            <p className="spec mt-5 text-[10px] text-faint">
              Fictional project — created for this portfolio
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
