import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** Desktop, precise pointer, motion allowed — the full cinematic tier. */
export function useImmersive(): boolean {
  const desktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  return desktop && !useReducedMotion();
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

/** Motion allowed at all. Scroll-linked styles must check this by hand. */
export function useMotionOK(): boolean {
  return !useReducedMotion();
}
