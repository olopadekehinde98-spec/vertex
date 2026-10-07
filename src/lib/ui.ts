/** Shared easing and scroll helpers. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Clamp a number into a range — used by the drag comparison slider. */
export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
