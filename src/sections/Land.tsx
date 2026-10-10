import { motion, useTransform, type MotionValue } from "framer-motion";
import { Box, CheckSquare, ClipboardList, Crosshair } from "lucide-react";
import { useRef } from "react";
import { BuildingFrame } from "../components/BuildingFrame";
import { SplitLines } from "../components/SplitLines";
import { StageLayers } from "../components/StageLayers";
import { photos, planningSteps } from "../data/content";
import { useMotionOK } from "../hooks/useMediaQuery";
import { useSectionProgress } from "../hooks/useSectionProgress";

const ICONS = {
  survey: Crosshair,
  plan: ClipboardList,
  model: Box,
  check: CheckSquare,
} as const;

/**
 * Stage 02 — Land & Planning.
 *
 * The site is surveyed and then designed on, directly over the photograph:
 * survey points, boundary, grid, floor plate, and the tower rising as a
 * wireframe. The planning panel on the right ticks through as the scroll moves,
 * so the drawing and the checklist advance together.
 */
export function Land() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const motionOK = useMotionOK();
  const textFade = useTransform(p, [0, 0.1, 0.84, 1], [0, 1, 1, 0]);

  return (
    <section id="land" ref={ref} className="relative h-[420vh] bg-void">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <StageLayers
          progress={p}
          layers={[photos.emptyLand, photos.survey, photos.sitePrep]}
          zoom={[1.1, 1]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-void/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-transparent to-void/60" />

        <SurveyOverlay progress={p} />

        <div className="frame relative flex h-full flex-col justify-end gap-8 pb-12 lg:flex-row lg:items-center lg:justify-between lg:pb-0">
          <motion.div style={motionOK ? { opacity: textFade } : undefined} className="max-w-[44ch]">
            <p className="spec mb-5 flex items-center gap-3 text-[10px]">
              <span className="h-px w-9 bg-copper" />
              02 — Land &amp; Planning
            </p>
            <SplitLines
              className="signage text-[clamp(1.9rem,5vw,4rem)]"
              lines={["From a vision", "on land."]}
            />
            <p className="mt-6 max-w-[42ch] text-[15px] leading-[1.75] text-mute">
              Every great structure begins with a vision. Before concrete, steel and glass, we study
              the land, understand the environment, and create a plan for what comes next.
            </p>
          </motion.div>

          {/* The planning panel — each step lights as its slice of the scroll arrives. */}
          <motion.ol
            style={motionOK ? { opacity: textFade } : undefined}
            className="w-full shrink-0 border border-line bg-charcoal/85 backdrop-blur-sm lg:w-[268px]"
          >
            {planningSteps.map((s, i) => (
              <PlanStep key={s.title} progress={p} index={i} count={planningSteps.length} {...s} />
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

function PlanStep({
  progress,
  index,
  count,
  icon,
  title,
  note,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
  icon: keyof typeof ICONS;
  title: string;
  note: string;
}) {
  const Icon = ICONS[icon];
  const at = 0.12 + (index / count) * 0.68;
  const on = useTransform(progress, [at - 0.07, at], [0.3, 1], { clamp: true });
  const tick = useTransform(progress, [at - 0.07, at], [0, 1], { clamp: true });

  return (
    <motion.li
      style={{ opacity: on }}
      className="flex items-start gap-3 border-b border-line px-4 py-3.5 last:border-0"
    >
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center border border-line-strong text-copper">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold text-chalk">{title}</span>
        <span className="mt-0.5 block text-[11.5px] leading-snug text-faint">{note}</span>
        <span className="mt-2 block h-px w-full bg-line">
          <motion.span className="block h-px bg-copper" style={{ scaleX: tick, originX: 0 }} />
        </span>
      </span>
    </motion.li>
  );
}

/** Survey marks → boundary → grid → floor plate → tower wireframe. */
function SurveyOverlay({ progress }: { progress: MotionValue<number> }) {
  const points = useTransform(progress, [0.06, 0.16, 0.74, 0.84], [0, 1, 1, 0]);
  const boundaryDraw = useTransform(progress, [0.14, 0.3], [0, 1], { clamp: true });
  const boundary = useTransform(progress, [0.14, 0.22, 0.78, 0.88], [0, 1, 1, 0]);
  const grid = useTransform(progress, [0.26, 0.38, 0.72, 0.84], [0, 0.5, 0.5, 0]);
  const plan = useTransform(progress, [0.38, 0.5, 0.86, 0.95], [0, 1, 1, 0]);
  const frame = useTransform(progress, [0.52, 0.64], [0, 1], { clamp: true });

  const corners = [
    [18, 46],
    [82, 40],
    [88, 86],
    [12, 92],
  ];

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <motion.polygon
          points={corners.map((c) => c.join(",")).join(" ")}
          fill="none"
          stroke="var(--color-copper)"
          strokeWidth="0.25"
          strokeDasharray="1.6 1.2"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: boundaryDraw, opacity: boundary }}
        />
        <motion.g style={{ opacity: grid }} stroke="#f4f2ef" strokeWidth="0.12">
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`v${i}`} x1={20 + i * 10} y1="42" x2={16 + i * 10} y2="90" vectorEffect="non-scaling-stroke" />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <line key={`h${i}`} x1={17 - i} y1={48 + i * 11} x2={85 + i} y2={46 + i * 11} vectorEffect="non-scaling-stroke" />
          ))}
        </motion.g>
      </svg>

      {corners.map(([x, y], i) => (
        <motion.span
          key={i}
          className="absolute flex items-center gap-1.5"
          style={{ left: `${x}%`, top: `${y}%`, opacity: points }}
        >
          <span className="h-2 w-2 rotate-45 border border-copper bg-void/70" />
          <span className="spec hidden text-[10px] text-copper sm:inline">P{i + 1}</span>
        </motion.span>
      ))}

      <motion.div
        className="absolute inset-x-0 bottom-[10%] mx-auto h-[30%] w-[60%] border border-copper/70 lg:left-[8%] lg:w-[42%]"
        style={{
          opacity: plan,
          transform: "perspective(900px) rotateX(68deg)",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 11px, rgba(226,101,42,0.26) 11px 12px), repeating-linear-gradient(90deg, transparent 0 11px, rgba(226,101,42,0.26) 11px 12px)",
        }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-[16%] mx-auto h-[58%] w-[min(320px,52vw)] lg:left-[12%] lg:mx-0"
        style={{ opacity: frame }}
      >
        <BuildingFrame progress={progress} window={[0.56, 0.92]} mode="wireframe" className="h-full w-full" />
      </motion.div>
    </div>
  );
}
