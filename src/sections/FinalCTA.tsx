import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { Img } from "../components/Img";
import { SplitLines } from "../components/SplitLines";
import { photos } from "../data/content";
import { useMotionOK } from "../hooks/useMediaQuery";
import { useSectionProgress } from "../hooks/useSectionProgress";
import { goTo } from "../lib/ui";

/**
 * Stage 10 — the close. Back to a finished project at golden hour, with the
 * invitation to start one. The image drifts slowly against the scroll so the
 * section settles rather than stopping dead before the footer.
 */
export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref, ["start end", "end start"]);
  const motionOK = useMotionOK();

  const y = useTransform(p, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(p, [0, 1], [1.12, 1.02]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative isolate flex min-h-[86svh] items-center overflow-hidden bg-void py-24"
    >
      <motion.div className="absolute inset-0 -z-20" style={motionOK ? { y, scale } : undefined}>
        <Img photo={photos.cityDusk} sizes="100vw" widths={[828, 1280, 1920]} />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/65 to-void/40" />

      <div className="frame relative">
        <p className="spec mb-5 flex items-center gap-3 text-[10px]">
          <span className="h-px w-9 bg-copper" />
          10 — Start Here
        </p>
        <SplitLines
          className="signage max-w-[14ch] text-[clamp(2.25rem,6.5vw,5.5rem)]"
          lines={["From an idea", <span key="r" className="text-copper">to something real.</span>]}
        />
        <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.75] text-mute">
          We build spaces for people, progress, and a better tomorrow.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#contact" className="btn btn-copper">
            Start Your Project
            <span aria-hidden>→</span>
          </a>
          <button type="button" onClick={() => goTo("projects")} className="btn btn-ghost">
            Explore Our Work
          </button>
        </div>
      </div>
    </section>
  );
}
