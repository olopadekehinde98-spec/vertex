import { motion, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { SplitLines } from "../components/SplitLines";
import { StageLayers } from "../components/StageLayers";
import { photos, progressSteps } from "../data/content";
import { useMotionOK } from "../hooks/useMediaQuery";
import { useSectionProgress } from "../hooks/useSectionProgress";

/**
 * Stage 05 — Progress.
 *
 * Site activity: cranes, materials, glazing, the exterior closing in and the
 * scaffolding coming down. The activity list is a timeline the scroll moves
 * through, each line lighting as its slice of the stage is reached.
 */
export function Progress() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const motionOK = useMotionOK();
  const textFade = useTransform(p, [0, 0.08, 0.86, 1], [0, 1, 1, 0]);

  return (
    <section id="progress" ref={ref} className="relative h-[460vh] bg-void">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <StageLayers
          progress={p}
          layers={[photos.crane, photos.aerial, photos.scaffold, photos.facadeGlass, photos.workers]}
          zoom={[1.05, 1.11]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/45 to-void/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-transparent to-transparent" />

        <div className="frame relative grid h-full items-end gap-10 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-0">
          <motion.div style={motionOK ? { opacity: textFade } : undefined} className="max-w-[52ch]">
            <p className="spec mb-5 flex items-center gap-3 text-[10px]">
              <span className="h-px w-9 bg-copper" />
              05 — Building Progress
            </p>
            <SplitLines
              className="signage text-[clamp(2rem,5.5vw,4.25rem)]"
              lines={["Progress", "in motion."]}
            />
            <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.75] text-mute">
              Every level takes us closer to the finished structure. Teams, materials and machines
              work together to turn structure into space.
            </p>
          </motion.div>

          <motion.ol
            className="hidden min-w-0 flex-col gap-0 lg:flex"
            style={motionOK ? { opacity: textFade } : undefined}
          >
            {progressSteps.map((s, i) => (
              <Activity key={s.no} progress={p} index={i} count={progressSteps.length} {...s} />
            ))}
          </motion.ol>

          {/* Phones get the same timeline as a compact strip rather than a wall of text. */}
          <motion.ol
            className="flex gap-2 lg:hidden"
            style={motionOK ? { opacity: textFade } : undefined}
            aria-hidden
          >
            {progressSteps.map((s, i) => (
              <Tick key={s.no} progress={p} index={i} count={progressSteps.length} />
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

function Activity({
  progress,
  index,
  count,
  no,
  title,
  note,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
  no: string;
  title: string;
  note: string;
}) {
  const at = (index / count) * 0.88 + 0.04;
  const opacity = useTransform(progress, [at - 0.08, at], [0.3, 1], { clamp: true });
  const lineWidth = useTransform(progress, [at - 0.08, at + 0.04], ["0%", "100%"], { clamp: true });

  return (
    <motion.li style={{ opacity }} className="border-b border-line py-4 last:border-0">
      <div className="flex items-baseline gap-4">
        <span className="spec text-[10px] text-copper">{no}</span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] font-semibold text-chalk">{title}</p>
          <p className="mt-0.5 text-[12.5px] text-faint">{note}</p>
          <span className="mt-2.5 block h-px w-full bg-line">
            <motion.span className="block h-px bg-copper" style={{ width: lineWidth }} />
          </span>
        </div>
      </div>
    </motion.li>
  );
}

function Tick({
  progress,
  index,
  count,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
}) {
  const at = (index / count) * 0.88 + 0.04;
  const fill = useTransform(progress, [at - 0.08, at], ["0%", "100%"], { clamp: true });
  return (
    <span className="h-0.5 flex-1 bg-line">
      <motion.span className="block h-0.5 bg-copper" style={{ width: fill }} />
    </span>
  );
}
