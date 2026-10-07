import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * The tower, drawn as vector geometry so it can genuinely assemble.
 *
 * Floors are stacked from the ground up and each one's opacity and vertical
 * offset come from the stage's scroll position, which is what makes "the
 * building is halfway built because you are halfway down the section" literally
 * true rather than a sequence of pictures.
 */

const FLOORS = 18;
const W = 300;
const H = 520;
const BASE_Y = H - 40;
const FLOOR_H = (H - 110) / FLOORS;

type Props = {
  progress: MotionValue<number>;
  /** Scroll window over which the frame builds. */
  window?: [number, number];
  mode?: "wireframe" | "structure";
  className?: string;
};

export function BuildingFrame({
  progress,
  window: win = [0, 1],
  mode = "structure",
  className = "",
}: Props) {
  const build = useTransform(progress, win, [0, 1], { clamp: true });
  const stroke = mode === "wireframe" ? "var(--color-copper)" : "#f4f2ef";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMax meet"
    >
      {/* Ground line — always present, the datum everything is measured from. */}
      <line x1="6" y1={BASE_Y} x2={W - 6} y2={BASE_Y} stroke="var(--color-copper)" strokeWidth="1.5" />

      {Array.from({ length: FLOORS }, (_, i) => (
        <Floor key={i} index={i} build={build} stroke={stroke} mode={mode} />
      ))}

      <Crown build={build} stroke={stroke} />
    </svg>
  );
}

function Floor({
  index,
  build,
  stroke,
  mode,
}: {
  index: number;
  build: MotionValue<number>;
  stroke: string;
  mode: "wireframe" | "structure";
}) {
  const share = 1 / FLOORS;
  const start = index * share;
  // Each floor fades in over its own slice of the scroll, slightly overlapping.
  const opacity = useTransform(build, [start, start + share * 0.9], [0, 1], { clamp: true });
  const y = useTransform(build, [start, start + share * 0.9], [14, 0], { clamp: true });

  // The tower tapers: upper floors are narrower.
  const inset = 36 + index * 1.6;
  const left = inset;
  const right = W - inset;
  const top = BASE_Y - (index + 1) * FLOOR_H;
  const bottom = BASE_Y - index * FLOOR_H;

  return (
    <motion.g style={{ opacity, y }}>
      {/* Slab */}
      <line x1={left} y1={top} x2={right} y2={top} stroke={stroke} strokeWidth="1.4" />
      {/* Columns */}
      <line x1={left} y1={top} x2={left} y2={bottom} stroke={stroke} strokeWidth="1.1" opacity="0.85" />
      <line x1={right} y1={top} x2={right} y2={bottom} stroke={stroke} strokeWidth="1.1" opacity="0.85" />
      <line
        x1={(left + right) / 2}
        y1={top}
        x2={(left + right) / 2}
        y2={bottom}
        stroke={stroke}
        strokeWidth="0.8"
        opacity="0.45"
      />
      {mode === "structure" && (
        <rect
          x={left}
          y={top}
          width={right - left}
          height={FLOOR_H}
          fill="#f4f2ef"
          opacity="0.05"
        />
      )}
    </motion.g>
  );
}

function Crown({ build, stroke }: { build: MotionValue<number>; stroke: string }) {
  const opacity = useTransform(build, [0.93, 1], [0, 1], { clamp: true });
  const top = BASE_Y - FLOORS * FLOOR_H;
  const inset = 36 + FLOORS * 1.6;

  return (
    <motion.g style={{ opacity }}>
      <line x1={inset - 6} y1={top} x2={W - inset + 6} y2={top} stroke={stroke} strokeWidth="2" />
      <line x1={W / 2} y1={top} x2={W / 2} y2={top - 34} stroke="var(--color-copper)" strokeWidth="1.4" />
      <circle cx={W / 2} cy={top - 38} r="3" fill="var(--color-copper)" />
    </motion.g>
  );
}
