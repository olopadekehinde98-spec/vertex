import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { SplitLines } from "../components/SplitLines";
import { projectFilters, projects, type Project } from "../data/content";
import { clamp, EASE } from "../lib/ui";

/**
 * Stage 09 — Project Showcase.
 *
 * One project at a time: its facts on the left, and on the right the same site
 * dragged from bare ground, through construction, to the finished building.
 * Filters narrow the set; the dots and arrows move through it.
 */
export function Showcase() {
  const [filter, setFilter] = useState(0);
  const [index, setIndex] = useState(0);

  const list = projectFilters[filter] === "All"
    ? projects
    : projects.filter((p) => p.kind === projectFilters[filter]);

  // Changing the filter can leave the index past the end of the new list.
  useEffect(() => setIndex(0), [filter]);
  const current: Project | undefined = list[index];

  const step = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + list.length) % Math.max(list.length, 1));

  return (
    <section id="showcase" className="relative bg-charcoal py-20 lg:py-28">
      <div className="frame">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <Reveal>
              <p className="spec mb-5 flex items-center gap-3 text-[10px]">
                <span className="h-px w-9 bg-copper" />
                09 — Project Showcase
              </p>
            </Reveal>
            <SplitLines
              className="signage text-[clamp(1.9rem,4.6vw,3.6rem)]"
              lines={["Projects", "built to last."]}
            />
          </div>

          <Reveal delay={0.08}>
            <ul className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              {projectFilters.map((f, i) => (
                <li key={f} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setFilter(i)}
                    aria-pressed={filter === i}
                    className={`spec border px-3.5 py-2.5 text-[10px] transition-colors duration-300 ${
                      filter === i
                        ? "border-copper bg-copper text-white"
                        : "border-line text-mute hover:border-line-strong hover:text-chalk"
                    }`}
                  >
                    {f}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {!current ? (
          <p className="mt-12 text-[14.5px] text-mute">No projects in this category yet.</p>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name + filter}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="min-w-0"
              >
                <h3 className="signage text-[clamp(1.5rem,3vw,2.3rem)] text-chalk">{current.name}</h3>
                <p className="spec mt-3 text-[10px]">{current.place}</p>

                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5">
                  {[
                    { k: "Type", v: current.kind },
                    { k: "Area", v: current.area },
                    { k: "Status", v: current.status },
                    { k: "Completed", v: current.year },
                  ].map((f) => (
                    <div key={f.k} className="min-w-0 border-t border-line pt-3">
                      <dt className="spec text-[10px]">{f.k}</dt>
                      <dd className="mt-1.5 text-[14.5px] font-semibold text-chalk">{f.v}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-7 max-w-[38ch] text-[14px] leading-[1.75] text-mute">
                  Drag across the image to move the same site from bare ground, through
                  construction, to the completed building.
                </p>

                <div className="mt-7 flex items-center gap-3">
                  <button type="button" className="btn btn-copper py-3">
                    View Project
                    <span aria-hidden>→</span>
                  </button>
                  <span className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous project"
                      className="grid h-11 w-11 place-items-center border border-line text-mute transition-colors hover:border-copper hover:text-copper"
                    >
                      <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next project"
                      className="grid h-11 w-11 place-items-center border border-line text-mute transition-colors hover:border-copper hover:text-copper"
                    >
                      <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                    </button>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="min-w-0">
              <TriCompare key={current.name} project={current} />

              <ol className="mt-5 flex items-center justify-center gap-2" aria-label="Project">
                {list.map((p, i) => (
                  <li key={p.name}>
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Show ${p.name}`}
                      aria-current={i === index}
                      className="grid h-8 w-8 place-items-center"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-400 ${
                          i === index ? "w-6 bg-copper" : "w-1.5 bg-line-strong"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        <p className="spec mt-10 text-[10px] text-faint">
          Fictional projects created for this portfolio
        </p>
      </div>
    </section>
  );
}

/**
 * Before / during / after on one track: 0 is bare land, 0.5 mid-construction, 1
 * the finished building. Pointer drag, tapping a label and the arrow keys all
 * move the same value, so it works with a mouse, a thumb or a keyboard.
 */
function TriCompare({ project }: { project: Project }) {
  const [value, setValue] = useState(0.5);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setValue(clamp((clientX - rect.left) / rect.width));
  }, []);

  const states = [
    { label: "Before", photo: project.before },
    { label: "During", photo: project.during },
    { label: "After", photo: project.after },
  ];
  const active = value < 0.25 ? 0 : value < 0.75 ? 1 : 2;

  return (
    <figure className="min-w-0">
      <div
        ref={ref}
        role="slider"
        tabIndex={0}
        aria-label={`${project.name}: drag from empty land to the completed building`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        aria-valuetext={states[active].label}
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
        <div className="absolute inset-0">
          <Img photo={states[0].photo} sizes="(min-width: 1024px) 55vw, 92vw" widths={[640, 1024, 1440]} />
        </div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - clamp(value * 2) * 100}% 0 0)` }}>
          <Img photo={states[1].photo} sizes="(min-width: 1024px) 55vw, 92vw" widths={[640, 1024, 1440]} />
        </div>
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - clamp((value - 0.5) * 2) * 100}% 0 0)` }}
        >
          <Img photo={states[2].photo} sizes="(min-width: 1024px) 55vw, 92vw" widths={[640, 1024, 1440]} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />

        <div className="absolute inset-y-0 w-px bg-copper" style={{ left: `${value * 100}%` }} aria-hidden>
          <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-copper bg-void/85 text-copper">
            <span className="text-[13px]">↔</span>
          </span>
        </div>

        <span className="absolute top-4 left-4 bg-void/80 px-3 py-1.5">
          <span className="spec text-[10px] text-copper">{states[active].label}</span>
        </span>
      </div>

      <figcaption className="mt-3 flex items-center gap-2">
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
