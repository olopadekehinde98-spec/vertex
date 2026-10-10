import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { brand, navLinks } from "../data/content";
import { EASE, goTo } from "../lib/ui";

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-copper" fill="none" aria-hidden>
        <path
          d="M12 2.6 20.5 7v10L12 21.4 3.5 17V7L12 2.6Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path d="M8 9.2 12 16l4-6.8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span className="signage text-[1.1rem] tracking-[0.26em] text-chalk">{brand.name}</span>
    </span>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(navLinks[0].href);

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 60);
    const probe = y + window.innerHeight * 0.4;
    let best = -1;
    let current = navLinks[0].href;
    for (const l of navLinks) {
      const el = document.querySelector<HTMLElement>(l.href);
      if (el && el.offsetTop <= probe && el.offsetTop > best) {
        best = el.offsetTop;
        current = l.href;
      }
    }
    setActive(current);
  });

  useEffect(() => {
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,padding,backdrop-filter] duration-500 ${
          solid ? "border-b border-line bg-void/88 py-2.5 backdrop-blur-xl" : "py-4"
        }`}
      >
        <nav aria-label="Main" className="frame flex items-center justify-between gap-6">
          <a href="#vision" aria-label={`${brand.name} — home`} className="py-1.5">
            <Logo />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => {
              const on = active === l.href;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative block py-2.5 text-[12.5px] transition-colors duration-300 ${
                      on ? "text-chalk" : "text-mute hover:text-chalk"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-copper transition-transform duration-400 ${
                        on ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={() => goTo("showcase")}
              aria-label="Search projects"
              className="hidden h-11 w-11 place-items-center text-mute transition-colors hover:text-chalk sm:grid"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => goTo("contact")}
              className="btn btn-copper hidden py-3 text-[11px] sm:inline-flex"
            >
              Start a Project
              <span aria-hidden>→</span>
            </button>
            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
              className="grid h-11 w-11 shrink-0 place-items-center text-chalk lg:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[80] flex flex-col bg-void lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="frame flex items-center justify-between py-4">
              <Logo />
              <button
                type="button"
                onClick={() => setMenu(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center text-chalk"
                autoFocus
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>
            <ul className="frame flex flex-1 flex-col justify-center">
              {navLinks.map((l, i) => (
                <li key={l.href} className="border-b border-line">
                  <motion.a
                    href={l.href}
                    onClick={() => setMenu(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: EASE }}
                    className="signage flex items-baseline justify-between py-5 text-[2rem]"
                  >
                    {l.label}
                    <span className="spec text-[10px] text-copper">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="frame pb-10">
              <button
                type="button"
                onClick={() => {
                  setMenu(false);
                  goTo("contact");
                }}
                className="btn btn-copper w-full justify-center py-4"
              >
                Start a Project →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
