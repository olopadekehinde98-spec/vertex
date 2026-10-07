import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { SplitLines } from "../components/SplitLines";
import { completedProject, photos, projects } from "../data/content";
import { clamp } from "../lib/ui";
import type { Photo } from "../lib/image";

/**
 * Stage 09 — Projects.
 *
 * The featured project is shown as a single draggable transformation from empty
 * land through construction to completion, then a gallery of other work laid out
 * editorially — deliberately not a grid of identical cards.
 */
export function Projects() {
  return (
    <section id="projects" className="relative bg-charcoal py-24 lg:py-32">
      <div className="frame lg:pl-28 xl:pl-36 2xl:pl-56">
        <Reveal>
          <p className="spec mb-5 flex items-center gap-3 text-[10px]">
            <span className="h-px w-9 bg-copper" />
            09 — Project Showcase
          </p>
        </Reveal>
        <SplitLines
          className="signage max-w-[16ch] text-[clamp(2rem,5vw,4rem)]"
          lines={["Projects", "built to last."]}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <Reveal className="min-w-0">
            <h3 className="signage text-[clamp(1.6rem,3vw,2.4rem)] text-chalk">
              {completedProject.name}
            </h3>
            <p className="spec mt-3 text-[10px]">{completedProject.location}</p>
            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5">
              {completedProject.facts.map((f) => (
                <div key={f.k} className="min-w-0 border-t border-line pt-3">
                  <dt className="spec text-[10px]">{f.k}</dt>
                  <dd className="mt-1.5 font-display text-[15px] font-semibold text-chalk">{f.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 max-w-[40ch] text-[14.5px] leading-[1.75] text-mute">
              Drag across the image to move the same site from bare ground, through construction, to
              the completed building.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <TriCompare
              states={[
                { label: "Before", caption: "Empty land", photo: photos.emptyLand },
                { label: "During", caption: "Construction", photo: photos.scaffold },
                { label: "After", caption: "Completed", photo: photos.tower },
              ]}
            />
          </Reveal>
        </div>

        {/* Gallery — each project gets its own composition. */}
        <ul className="mt-20 grid gap-5 md:grid-cols-6">
          {projects.map((project, i) => {
            // Alternating wide / tall so the grid never reads as repeated cards.
            const span =
              i === 0
                ? "md:col-span-4 aspect-[16/10]"
                : i === 1
                  ? "md:col-span-2 aspect-[3/4]"
                  : i === 2
                    ? "md:col-span-2 aspect-[3/4]"
                    : "md:col-span-4 aspect-[16/10]";
            return (
              <li key={project.name} className={`group relative min-w-0 overflow-hidden border border-line ${span}`}>
                <Img
                  photo={project.photo}
                  sizes="(min-width: 768px) 50vw, 92vw"
                  widths={[640, 1024, 1440]}
                  className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <p className="spec text-[10px] text-copper">{project.kind}</p>
                    <h4 className="signage mt-2 text-[1.15rem] text-chalk">{project.name}</h4>
                    <p className="mt-1.5 text-[12.5px] text-mute">{project.stat}</p>
                  </div>
                  <p className="spec shrink-0 text-[10px]">
                    {project.place} · {project.year}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="spec mt-6 text-[10px] text-faint">
          Fictional projects created for this portfolio
        </p>
      </div>
    </section>
  );
}

type State = { label: string; caption: string; photo: Photo };

/**
 * A three-state transformation on one track: 0 is bare land, 0.5 is mid
 * construction, 1 is the finished building. Pointer drag, click-to-position and
 * arrow keys all move the same value, so it works with a mouse, a thumb or a
 * keyboard.
 */
function TriCompare({ states }: { states: State[] }) {
  const [value, setValue] = useState(0.5);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setValue(clamp((clientX - rect.left) / rect.width));
  }, []);

  const active = value < 0.25 ? 0 : value < 0.75 ? 1 : 2;

  return (
    <figure className="min-w-0">
      <div
        ref={ref}
        role="slider"
        tabIndex={0}
        aria-label="Project transformation: drag from empty land to the completed building"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        aria-valuetext={states[active].caption}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setValue((v) => clamp(v - 0.05));
          if (e.key === "ArrowRight") setValue((v) => clamp(v + 0.05));
          if (e.key === "Home") setValue(0);
          if (e.key === "End") setValue(1);
        }}
        className="relative aspect-[16/10] w-full cursor-ew-resize touch-none overflow-hidden border border-line select-none"
      >
        {/* Land is the base; construction and completion are wiped over it. */}
        <div className="absolute inset-0">
          <Img photo={states[0].photo} sizes="(min-width: 1024px) 55vw, 92vw" widths={[640, 1024, 1440]} />
        </div>
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - clamp(value * 2) * 100}% 0 0)` }}
        >
          <Img photo={states[1].photo} sizes="(min-width: 1024px) 55vw, 92vw" widths={[640, 1024, 1440]} />
        </div>
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - clamp((value - 0.5) * 2) * 100}% 0 0)` }}
        >
          <Img photo={states[2].photo} sizes="(min-width: 1024px) 55vw, 92vw" widths={[640, 1024, 1440]} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />

        {/* Handle */}
        <motion.div
          className="absolute inset-y-0 w-px bg-copper"
          style={{ left: `${value * 100}%` }}
          aria-hidden
        >
          <span className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-copper bg-void/85">
            <span className="spec text-[10px] text-copper">↔</span>
          </span>
        </motion.div>

        <span className="absolute bottom-4 left-4 bg-void/80 px-3 py-1.5">
          <span className="spec text-[10px] text-copper">{states[active].caption}</span>
        </span>
      </div>

      <figcaption className="mt-4 flex items-center justify-between gap-3">
        {states.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setValue(i === 0 ? 0 : i === 1 ? 0.5 : 1)}
            className={`spec flex-1 border-t py-3 text-[10px] transition-colors ${
              active === i ? "border-copper text-chalk" : "border-line text-faint hover:text-mute"
            }`}
          >
            {s.label}
          </button>
        ))}
      </figcaption>
    </figure>
  );
}
