import { motion, useTransform, type MotionValue } from "framer-motion";
import { Img } from "./Img";
import { useMotionOK } from "../hooks/useMediaQuery";
import type { Photo } from "../lib/image";

type Props = {
  progress: MotionValue<number>;
  layers: Photo[];
  /** Slow push-in across the stage, so a held frame still has camera movement. */
  zoom?: [number, number];
  priority?: boolean;
  className?: string;
};

/**
 * The engine of the whole site: a stack of photographs whose opacity is derived
 * from the stage's scroll position.
 *
 * This is not a sequence of fades playing on a timer. Layer n is fully opaque at
 * scroll position n/(count-1) and crossfades to its neighbours in between, so
 * stopping halfway through a stage leaves the construction genuinely halfway,
 * and scrolling back up runs the build in reverse.
 */
export function StageLayers({
  progress,
  layers,
  zoom = [1.08, 1],
  priority = false,
  className = "",
}: Props) {
  const motionOK = useMotionOK();
  const last = Math.max(layers.length - 1, 1);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-void ${className}`}>
      {layers.map((photo, i) => (
        <Layer
          key={photo.id + i}
          photo={photo}
          progress={progress}
          index={i}
          last={last}
          zoom={motionOK ? zoom : undefined}
          priority={priority && i === 0}
        />
      ))}
    </div>
  );
}

function Layer({
  photo,
  progress,
  index,
  last,
  zoom,
  priority,
}: {
  photo: Photo;
  progress: MotionValue<number>;
  index: number;
  last: number;
  zoom?: [number, number];
  priority: boolean;
}) {
  const centre = index / last;
  const step = 1 / last;

  // First and last layers hold at the ends; the rest peak at their own centre.
  const range =
    index === 0
      ? [0, step]
      : index === last
        ? [1 - step, 1]
        : [centre - step, centre, centre + step];
  const output = index === 0 ? [1, 0] : index === last ? [0, 1] : [0, 1, 0];

  const opacity = useTransform(progress, range, output);
  const scale = useTransform(progress, [0, 1], zoom ?? [1, 1]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity, scale }}>
      <Img photo={photo} priority={priority} sizes="100vw" />
    </motion.div>
  );
}
