import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { BuildingFrame } from "../components/BuildingFrame";
import { SplitLines } from "../components/SplitLines";
import { StageLayers } from "../components/StageLayers";
import { explodedParts, photos, structureSteps } from "../data/content";
import { useMotionOK } from "../hooks/useMediaQuery";
import { useSectionProgress } from "../hooks/useSectionProgress";

/**
 * Stage 04 — Structure.
 *
 * The tower grows floor by floor as the visitor scrolls, the camera climbs with
 * it, and a percentage readout tracks the same value. Scroll up and the frame
 * comes back down — the geometry is derived from scroll position, never played.
 */
export function Structure() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const motionOK = useMotionOK();
  const [pct, setPct] = useState(0);
  const [stage, setStage] = useState(structureSteps[0].label);

  // The build occupies the first 70% of the stage; the rest is the exploded view.
  useMotionValueEvent(p, "change", (v) => {
    const t = Math.min(v / 0.7, 1);
    setPct(Math.round(t * 100));
    const match = [...structureSteps].reverse().find((s) => t >= s.at);
    setStage(match?.label ?? structureSteps[0].label);
  });

  // Camera rises with the frame, then pulls back for the exploded view.
  const cameraY = useTransform(p, [0, 0.7, 1], ["6%", "-6%", "0%"]);
  const frameScale = useTransform(p, [0, 0.7, 0.85], [1.05, 1, 0.82]);
  const frameFade = useTransform(p, [0.86, 0.95], [1, 0]);
  const textFade = useTransform(p, [0, 0.08, 0.62, 0.72], [0, 1, 1, 0]);
  const explodeIn = useTransform(p, [0.72, 0.8], [0, 1], { clamp: true });

  return (
    <section id="structure" ref={ref} className="relative h-[520vh] bg-void">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <StageLayers
          progress={p}
          layers={[photos.foundationSite, photos.frame, photos.crane, photos.cranes]}
          zoom={[1.04, 1.1]}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/45" />

        {/* The frame itself, rising */}
        <motion.div
          className="absolute inset-0 grid place-items-center"
          style={motionOK ? { y: cameraY, scale: frameScale, opacity: frameFade } : undefined}
        >
          <BuildingFrame
            progress={p}
            window={[0.04, 0.68]}
            className="h-[64vh] w-[min(420px,62vw)] drop-shadow-[0_0_40px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        {/* Live completion readout */}
        <motion.div
          className="absolute top-1/2 right-5 z-10 hidden -translate-y-1/2 flex-col items-end md:flex"
          style={motionOK ? { opacity: textFade } : undefined}
        >
          <span className="spec text-[10px]">Structure</span>
          <span className="signage text-[2.75rem] text-chalk tabular-nums">{pct}%</span>
          <span className="spec mt-1 max-w-[12ch] text-right text-[10px] text-copper">{stage}</span>
        </motion.div>

        <div className="frame relative flex h-full flex-col justify-end pb-14 lg:pb-20">
          <motion.div style={motionOK ? { opacity: textFade } : undefined} className="max-w-[52ch]">
            <p className="spec mb-5 flex items-center gap-3 text-[10px]">
              <span className="h-px w-9 bg-copper" />
              04 — Structure
            </p>
            <SplitLines
              className="signage text-[clamp(2rem,5.5vw,4.25rem)]"
              lines={["Bringing", "the structure", "to life."]}
            />
            <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.75] text-mute">
              Steel, concrete and engineering come together to create the framework of the building.
            </p>
            <p className="spec mt-6 text-[10px] text-copper md:hidden">
              Structure {pct}% · {stage}
            </p>
          </motion.div>
        </div>

        {/* The building taken apart, then put back together */}
        <ExplodedView progress={p} fade={explodeIn} />
      </div>
    </section>
  );
}

/**
 * The building taken apart, then put back together — the architectural
 * presentation moment. Each layer is a slab skewed into a shallow plan view, and
 * its offset is a function of scroll, so the stack opens on the way down and
 * closes again on the way back up.
 */
function ExplodedView({
  progress,
  fade,
}: {
  progress: MotionValue<number>;
  fade: MotionValue<number>;
}) {
  const spread = useTransform(progress, [0.72, 0.88, 0.97], [0, 1, 0]);
  const motionOK = useMotionOK();

  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-center bg-void/[0.97]"
      style={{ opacity: fade, pointerEvents: "none" }}
    >
      <div className="frame w-full">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <p className="spec mb-5 flex items-center gap-3 text-[10px]">
              <span className="h-px w-9 bg-copper" />
              Structural breakdown
            </p>
            <h3 className="signage text-[clamp(1.75rem,4.5vw,3.5rem)]">
              Every element
              <br />
              has a <span className="text-copper">purpose.</span>
            </h3>
            <p className="mt-6 max-w-[38ch] text-[14.5px] leading-[1.75] text-mute">
              Six layers, one load path. Each is engineered for what sits above it and for what it
              carries down to the ground.
            </p>
          </div>

          <ul className="relative mx-auto flex w-full max-w-[460px] flex-col items-center">
            {explodedParts.map((part, i) => (
              <Part
                key={part.name}
                {...part}
                index={i}
                count={explodedParts.length}
                spread={spread}
                motionOK={motionOK}
              />
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function Part({
  name,
  note,
  index,
  count,
  spread,
  motionOK,
}: {
  name: string;
  note: string;
  index: number;
  count: number;
  spread: MotionValue<number>;
  motionOK: boolean;
}) {
  // The stack opens from the middle: upper layers lift, lower ones settle.
  const direction = index - (count - 1) / 2;
  const y = useTransform(spread, [0, 1], [0, direction * -22]);
  const labelOpacity = useTransform(spread, [0.3, 0.75], [0, 1]);

  // The tower tapers, so the roof slab is the narrowest and the raft the widest.
  const width = 52 + index * 8;

  return (
    <motion.li className="flex w-full items-center gap-4 py-3" style={motionOK ? { y } : undefined}>
      <span className="flex flex-1 justify-end">
        <span
          className="relative block h-9 border border-line-strong bg-gradient-to-r from-steel to-concrete"
          style={{ width: `${width}%`, transform: "skewY(-6deg)" }}
        >
          <span className="absolute inset-x-0 top-0 h-px bg-copper/80" />
          <span className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-line-strong" />
        </span>
      </span>

      <motion.span
        className="flex w-[46%] shrink-0 items-center gap-2.5"
        style={motionOK ? { opacity: labelOpacity } : undefined}
      >
        <span className="hidden h-px w-5 shrink-0 bg-copper/70 sm:block" />
        <span className="min-w-0">
          <span className="block font-display text-[13px] font-semibold text-chalk">{name}</span>
          <span className="block text-[11.5px] leading-tight text-faint">{note}</span>
        </span>
      </motion.span>
    </motion.li>
  );
}
