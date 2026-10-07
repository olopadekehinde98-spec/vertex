import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { brand } from "../data/content";
import { useMotionOK } from "../hooks/useMediaQuery";

/**
 * The title card. The page opens black, the mark draws itself, then the curtain
 * lifts to reveal the finished tower — so the first thing the visitor sees is
 * the end of the story they are about to scroll backwards through.
 *
 * Skipped entirely for reduced-motion visitors, who get the hero immediately.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const motionOK = useMotionOK();
  const [show, setShow] = useState(motionOK);

  useEffect(() => {
    if (!motionOK) {
      onDone();
      return;
    }
    // Scroll position is restored by the browser before this runs; the intro
    // only makes sense from the top.
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      onDone();
    }, 2200);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [motionOK, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-intro
          className="fixed inset-0 z-[100] grid place-items-center bg-void"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.svg
              viewBox="0 0 24 24"
              className="h-10 w-10 text-copper"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              aria-hidden
            >
              <motion.path
                d="M3 4h18L12 21 3 4Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
            </motion.svg>

            <motion.span
              className="signage text-[1.4rem] tracking-[0.5em] text-chalk"
              initial={{ opacity: 0, letterSpacing: "0.9em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {brand.name}
            </motion.span>

            <motion.span
              className="spec text-[10px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              {brand.disciplines}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
