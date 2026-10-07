import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { brand, navLinks } from "../data/content";
import { EASE, goTo } from "../lib/ui";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-copper" fill="none" aria-hidden>
        <path d="M3 4h18L12 21 3 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8.5 4 12 10.5 15.5 4" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      </svg>
      <span className="signage text-[1.15rem] tracking-[0.3em] text-chalk">{brand.name}</span>
      {!compact && (
        <span className="spec hidden text-[10px] tracking-[0.3em] md:inline">Engineering</span>
      )}
    </span>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 60));

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
        className={`fixed inset-x-0 top-0 z-[60] border-b transition-[background-color,border-color,padding,backdrop-filter] duration-500 ${
          solid
            ? "border-line bg-void/85 py-3 backdrop-blur-xl"
            : "border-transparent py-5"
        }`}
      >
        <nav aria-label="Main" className="frame flex items-center justify-between gap-6">
          <a href="#vision" aria-label={`${brand.name} — home`} className="py-1.5">
            <Logo />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="spec py-2.5 text-[11px] text-mute transition-colors duration-300 hover:text-chalk"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => goTo("contact")}
              aria-label="Search the site"
              className="hidden h-11 w-11 place-items-center text-mute transition-colors hover:text-chalk sm:grid"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => goTo("contact")}
              className="btn btn-copper hidden py-3 sm:inline-flex"
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
            <div className="frame flex items-center justify-between py-5">
              <Logo compact />
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
