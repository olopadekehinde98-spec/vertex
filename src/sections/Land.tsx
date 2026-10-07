import { motion, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { BuildingFrame } from "../components/BuildingFrame";
import { SplitLines } from "../components/SplitLines";
import { StageLayers } from "../components/StageLayers";
import { landSteps, photos } from "../data/content";
import { useMotionOK } from "../hooks/useMediaQuery";
import { useSectionProgress } from "../hooks/useSectionProgress";

/**
 * Stage 02 — Land & Planning.
 *
 * The site is surveyed and then designed on, directly over the photograph:
 * survey points, boundary, grid, floor plate, and finally the tower rising as a
 * wireframe. Everything is keyed to scroll position, so the drawing builds and
 * un-builds exactly in step with the scrollbar.
 */
export function Land() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const motionOK = useMotionOK();

  const textFade = useTransform(p, [0, 0.12, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="land" ref={ref} className="relative h-[420vh] bg-void">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <StageLayers
          progress={p}
          layers={[photos.emptyLand, photos.survey, photos.sitePrep]}
          zoom={[1.1, 1]}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-void/60" />

        {/* The drawing, laid over the land. */}
        <SurveyOverlay progress={p} />

        <div className="frame relative flex h-full flex-col justify-end pb-14 lg:pb-20 lg:pl-28 xl:pl-36 2xl:pl-56">
          <motion.div style={motionOK ? { opacity: textFade } : undefined} className="max-w-[52ch]">
            <p className="spec mb-5 flex items-center gap-3 text-[10px]">
              <span className="h-px w-9 bg-copper" />
              02 — Land &amp; Planning
            </p>
            <SplitLines
              className="signage text-[clamp(2rem,5.5vw,4.25rem)]"
              lines={["Every great structure", "starts with a vision."]}
            />
            <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.75] text-mute">
              Before concrete, steel and glass, there is an idea. We study the land, understand the
              environment, and create a plan for what comes next.
            </p>

            <ol className="mt-9 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {landSteps.map((s, i) => (
                <Step key={s.no} progress={p} index={i} {...s} />
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Step({
  progress,
  index,
  no,
  title,
  note,
}: {
  progress: MotionValue<number>;
  index: number;
  no: string;
  title: string;
  note: string;
}) {
  const at = 0.12 + index * 0.17;
  const on = useTransform(progress, [at - 0.06, at], [0.25, 1], { clamp: true });
  const barWidth = useTransform(progress, [at - 0.06, at], ["0%", "100%"], { clamp: true });

  return (
    <motion.li style={{ opacity: on }} className="min-w-0">
      <span className="block h-px w-full bg-line">
        <motion.span className="block h-px bg-copper" style={{ width: barWidth }} />
      </span>
      <span className="spec mt-3 block text-[10px] text-copper">{no}</span>
      <span className="mt-1.5 block font-display text-[13.5px] font-semibold text-chalk">{title}</span>
      <span className="mt-1 block text-[12px] leading-snug text-faint">{note}</span>
    </motion.li>
  );
}

/**
 * Survey marks → boundary → grid → floor plate → tower wireframe.
 * Each element owns a slice of the scroll, so the site is drawn progressively.
 */
function SurveyOverlay({ progress }: { progress: MotionValue<number> }) {
  const pointsOpacity = useTransform(progress, [0.06, 0.16, 0.74, 0.84], [0, 1, 1, 0]);
  const boundaryDraw = useTransform(progress, [0.14, 0.3], [0, 1], { clamp: true });
  const boundaryOpacity = useTransform(progress, [0.14, 0.22, 0.78, 0.88], [0, 1, 1, 0]);
  const gridOpacity = useTransform(progress, [0.26, 0.38, 0.72, 0.84], [0, 0.55, 0.55, 0]);
  const planOpacity = useTransform(progress, [0.38, 0.5, 0.82, 0.92], [0, 1, 1, 0]);
  const frameOpacity = useTransform(progress, [0.52, 0.64], [0, 1], { clamp: true });

  const corners = [
    [18, 46],
    [82, 40],
    [88, 86],
    [12, 92],
  ];

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {/* Site boundary */}
        <motion.polygon
          points={corners.map((c) => c.join(",")).join(" ")}
          fill="none"
          stroke="var(--color-copper)"
          strokeWidth="0.25"
          strokeDasharray="1.6 1.2"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: boundaryDraw, opacity: boundaryOpacity }}
        />
        {/* Survey grid inside the plot */}
        <motion.g style={{ opacity: gridOpacity }} stroke="#f4f2ef" strokeWidth="0.12">
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`v${i}`} x1={20 + i * 10} y1="42" x2={16 + i * 10} y2="90" vectorEffect="non-scaling-stroke" />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <line key={`h${i}`} x1={17 - i} y1={48 + i * 11} x2={85 + i} y2={46 + i * 11} vectorEffect="non-scaling-stroke" />
          ))}
        </motion.g>
      </svg>

      {/* Survey point markers */}
      {corners.map(([x, y], i) => (
        <motion.span
          key={i}
          className="absolute flex items-center gap-1.5"
          style={{ left: `${x}%`, top: `${y}%`, opacity: pointsOpacity }}
        >
          <span className="h-2 w-2 rotate-45 border border-copper bg-void/70" />
          <span className="spec hidden text-[8px] text-copper sm:inline">
            P{i + 1}
          </span>
        </motion.span>
      ))}

      {/* Floor plate, drawn flat on the ground in perspective */}
      <motion.div
        className="absolute inset-x-0 bottom-[8%] mx-auto h-[34%] w-[62%] border border-copper/70 lg:inset-x-auto lg:right-[8%] lg:mx-0 lg:w-[42%]"
        style={{
          opacity: planOpacity,
          transform: "perspective(900px) rotateX(68deg)",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 11px, rgba(226,101,42,0.28) 11px 12px), repeating-linear-gradient(90deg, transparent 0 11px, rgba(226,101,42,0.28) 11px 12px)",
        }}
      />

      {/* The tower itself, rising off the plan */}
      <motion.div
        className="absolute inset-x-0 bottom-[14%] mx-auto h-[62%] w-[min(360px,55vw)] lg:inset-x-auto lg:right-[14%] lg:mx-0"
        style={{ opacity: frameOpacity }}
      >
        <BuildingFrame
          progress={progress}
          window={[0.56, 0.9]}
          mode="wireframe"
          className="h-full w-full"
        />
      </motion.div>
    </div>
  );
}
