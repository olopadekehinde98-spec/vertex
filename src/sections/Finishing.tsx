import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitLines } from "../components/SplitLines";
import { StageLayers } from "../components/StageLayers";
import { finishingSteps, photos } from "../data/content";
import { useMotionOK } from "../hooks/useMediaQuery";
import { useSectionProgress } from "../hooks/useSectionProgress";

/**
 * Stage 06 — Finishing.
 *
 * Scaffolding comes down, the facade is sealed and cleaned, the lights come on,
 * and the camera moves inside. The warm interior glow ramps with scroll, so the
 * building lighting up is driven by the same value as the imagery.
 */
export function Finishing() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const motionOK = useMotionOK();

  const textFade = useTransform(p, [0, 0.08, 0.86, 1], [0, 1, 1, 0]);
  // Lights coming on: a warm wash that arrives as the facade is completed.
  const glow = useTransform(p, [0.35, 0.62], [0, 0.5]);
  // Moving indoors — the frame pushes in as the camera crosses the threshold.
  const push = useTransform(p, [0.55, 1], [1, 1.12]);

  return (
    <section id="finishing" ref={ref} className="relative h-[460vh] bg-void">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0" style={motionOK ? { scale: push } : undefined}>
          <StageLayers
            progress={p}
            layers={[photos.scaffold, photos.facadeGlass, photos.facade, photos.lobby, photos.interior]}
            zoom={[1.04, 1]}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-void/50" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(226,140,60,0.55),transparent_62%)] mix-blend-screen"
          style={{ opacity: motionOK ? glow : 0 }}
          aria-hidden
        />

        <div className="frame relative flex h-full flex-col justify-end pb-14 lg:pb-20 lg:pl-28 xl:pl-36 2xl:pl-56">
          <motion.div style={motionOK ? { opacity: textFade } : undefined} className="max-w-[52ch]">
            <p className="spec mb-5 flex items-center gap-3 text-[10px]">
              <span className="h-px w-9 bg-copper" />
              06 — Finishing
            </p>
            <SplitLines
              className="signage text-[clamp(2rem,5.5vw,4.25rem)]"
              lines={["Details", "that matter."]}
            />
            <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.75] text-mute">
              From exterior design to interior finishes, we bring engineering and elegance together.
            </p>

            <ul className="mt-9 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {finishingSteps.map((s, i) => (
                <li key={s.title} className="min-w-0 border-t border-line pt-3">
                  <span className="spec block text-[10px] text-copper">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1.5 block font-display text-[13.5px] font-semibold text-chalk">
                    {s.title}
                  </span>
                  <span className="mt-1 block text-[12px] leading-snug text-faint">{s.note}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
