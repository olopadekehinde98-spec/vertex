/**
 * Unsplash CDN helpers. Widths are capped and quality held at 50 — this page
 * holds roughly twenty full-bleed photographs at once, so unbounded sizes would
 * cost tens of megabytes on a phone.
 */

const BASE = "https://images.unsplash.com/photo-";

export type Photo = { id: string; alt: string };

export function img(id: string, w = 1280, ratio?: number): string {
  const h = ratio ? `&h=${Math.round(w * ratio)}&fit=crop` : "";
  return `${BASE}${id}?auto=format&q=50&w=${Math.min(w, 1920)}${h}`;
}

export function srcSet(id: string, widths: number[], ratio?: number): string {
  return widths.map((w) => `${img(id, w, ratio)} ${w}w`).join(", ");
}

/** A 24px blurred version, inlined behind the real photo while it loads. */
export function preview(id: string): string {
  return `${BASE}${id}?auto=format&q=25&w=32&blur=120`;
}
