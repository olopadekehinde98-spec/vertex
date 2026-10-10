import { motion, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { SplitLines } from "../components/SplitLines";
import { StageLayers } from "../components/StageLayers";
import { foundationSteps, photos } from "../data/content";
import { useMotionOK } from "../hooks/useMediaQuery";
import { useSectionProgress } from "../hooks/useSectionProgress";

/**
 * Stage 03 — Foundation.
 *
 * The ground splits and the camera descends: excavation, reinforcement, pour,
 * cure, and back up to grade. A depth readout runs off the same scroll value as
 * the imagery, so the number on screen always matches what is being dug.
 */
export function Foundation() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const motionOK = useMotionOK();
  const [depth, setDepth] = useState(0);
  const [step, setStep] = useState(0);

  // Down to -8.5m by mid-stage, then back to grade as the camera rises.
  useMotionValueEvent(p, "change", (v) => {
    const d = v < 0.75 ? (v / 0.75) * 8.5 : 8.5 * (1 - (v - 0.75) / 0.25);
    setDepth(Math.max(0, d));
    const i = foundationSteps.findIndex((s, idx) => {
      const next = foundationSteps[idx + 1];
      return v >= s.at && (!next || v < next.at);
    });
    setStep(i < 0 ? foundationSteps.length - 1 : i);
  });

  // The ground opening: two soil banks slide apart to let the camera through.
  const topBank = useTransform(p, [0, 0.18], ["0%", "-62%"]);
  const bottomBank = useTransform(p, [0, 0.18], ["0%", "62%"]);
  const bankFade = useTransform(p, [0.1, 0.22], [1, 0]);
  const textFade = useTransform(p, [0, 0.1, 0.84, 1], [0, 1, 1, 0]);
  const gaugeHeight = useTransform(p, [0, 0.75, 1], ["0%", "100%", "0%"]);

  return (
    <section id="foundation" ref={ref} className="relative h-[420vh] bg-void">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <StageLayers
          progress={p}
          layers={[
            photos.sitePrep,
            photos.excavation,
            photos.rebar,
            photos.concrete,
            photos.foundationSite,
          ]}
          zoom={[1.06, 1.12]}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/55" />

        {/* Ground splitting open */}
        {motionOK && (
          <>
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 bg-[#241a12]"
              style={{ y: topBank, opacity: bankFade }}
            >
              <span className="absolute right-0 bottom-0 left-0 h-px bg-copper/60" />
            </motion.div>
            <motion.div
              className="absolute inset-x-0 bottom-0 h-1/2 bg-[#1a1309]"
              style={{ y: bottomBank, opacity: bankFade }}
            >
              <span className="absolute top-0 right-0 left-0 h-px bg-copper/60" />
            </motion.div>
          </>
        )}

        {/* Depth gauge */}
        <div className="absolute top-1/2 right-5 z-10 hidden -translate-y-1/2 flex-col items-end gap-2 md:flex">
          <span className="spec text-[10px]">Depth</span>
          <span className="signage text-[2rem] text-copper tabular-nums">
            −{depth.toFixed(1)}
            <span className="signage text-[1rem] text-mute">m</span>
          </span>
          <span className="mt-2 block h-40 w-px bg-line">
            <motion.span
              className="block w-px bg-copper"
              style={{ height: gaugeHeight }}
            />
          </span>
        </div>

        <div className="frame relative flex h-full flex-col justify-end pb-14 lg:pb-20">
          <motion.div style={motionOK ? { opacity: textFade } : undefined} className="max-w-[52ch]">
            <p className="spec mb-5 flex items-center gap-3 text-[10px]">
              <span className="h-px w-9 bg-copper" />
              03 — Foundation
            </p>
            <SplitLines
              className="signage text-[clamp(2rem,5.5vw,4.25rem)]"
              lines={["A strong foundation", "for what comes next."]}
            />
            <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.75] text-mute">
              Every lasting structure begins beneath the surface. Precision at this stage determines
              everything that follows.
            </p>

            <div className="mt-9 flex items-center gap-4 border-t border-line pt-5">
              <span className="spec text-[10px] text-copper">
                {String(step + 1).padStart(2, "0")}/{String(foundationSteps.length).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[15px] font-semibold text-chalk">
                  {foundationSteps[step].label}
                </span>
                <span className="block text-[12.5px] text-faint">{foundationSteps[step].detail}</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
