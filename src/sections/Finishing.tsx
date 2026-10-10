import { motion, useTransform } from "framer-motion";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { SplitLines } from "../components/SplitLines";
import { StageLayers } from "../components/StageLayers";
import { finishingHotspots, photos } from "../data/content";
import { useMotionOK } from "../hooks/useMediaQuery";
import { useSectionProgress } from "../hooks/useSectionProgress";

/**
 * Stage 06 — Finishing.
 *
 * Scaffolding comes down, the facade is sealed, the lights come on and the
 * camera moves inside. Markers appear on the finished building the way they
 * would on a handover drawing — tap or hover one to read what was done there.
 */
export function Finishing() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const motionOK = useMotionOK();

  const textFade = useTransform(p, [0, 0.08, 0.86, 1], [0, 1, 1, 0]);
  const glow = useTransform(p, [0.35, 0.62], [0, 0.5]);
  const push = useTransform(p, [0.55, 1], [1, 1.12]);
  // The markers belong to the finished facade, not the scaffolding before it.
  const spots = useTransform(p, [0.3, 0.42, 0.72, 0.82], [0, 1, 1, 0]);

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

        <motion.div className="absolute inset-0" style={motionOK ? { opacity: spots } : undefined}>
          {finishingHotspots.map((h) => (
            <Hotspot key={h.title} {...h} />
          ))}
        </motion.div>

        <div className="frame relative flex h-full flex-col justify-end pb-12 lg:pb-16">
          <motion.div style={motionOK ? { opacity: textFade } : undefined} className="max-w-[46ch]">
            <p className="spec mb-5 flex items-center gap-3 text-[10px]">
              <span className="h-px w-9 bg-copper" />
              06 — Finishing Stage
            </p>
            <SplitLines
              className="signage text-[clamp(1.9rem,5vw,4rem)]"
              lines={["Details", "that matter."]}
            />
            <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.75] text-mute">
              From exterior design to interior finishes, we bring elegance and functionality
              together.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Hotspot({ x, y, title, note }: { x: number; y: number; title: string; note: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        aria-expanded={open}
        className="grid h-9 w-9 place-items-center rounded-full border border-chalk/70 bg-void/50 text-chalk backdrop-blur-sm transition-colors duration-300 hover:border-copper hover:text-copper"
      >
        <Plus className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-45" : ""}`} strokeWidth={1.8} />
        <span className="sr-only">{title}</span>
      </button>

      <motion.span
        className="pointer-events-none absolute top-1/2 left-11 w-[168px] -translate-y-1/2 border border-line bg-charcoal/95 p-3 backdrop-blur-sm"
        initial={false}
        animate={{ opacity: open ? 1 : 0, x: open ? 0 : -6 }}
        transition={{ duration: 0.25 }}
        aria-hidden={!open}
      >
        <span className="block text-[12.5px] font-semibold text-chalk">{title}</span>
        <span className="mt-1 block text-[11.5px] leading-snug text-faint">{note}</span>
      </motion.span>
    </div>
  );
}
