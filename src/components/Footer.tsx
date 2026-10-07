import { AtSign, Globe, MessageCircle } from "lucide-react";
import { brand, contact, navLinks } from "../data/content";
import { Logo } from "./Navbar";

export function Footer() {
  return (
    <footer className="border-t border-line bg-void">
      <div className="frame py-14 lg:pl-28 xl:pl-36 2xl:pl-56">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="min-w-0">
            <Logo />
            <p className="spec mt-4 text-[10px]">{brand.disciplines}</p>
            <p className="mt-5 max-w-[34ch] text-[13px] leading-relaxed text-faint">
              {contact.lines[1]}
            </p>
          </div>

          <nav aria-label="Footer" className="min-w-0">
            <p className="spec mb-4 text-[10px] text-copper">Navigate</p>
            <ul className="grid gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-block py-2 text-[13.5px] text-mute transition-colors hover:text-chalk"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <p className="spec mb-4 text-[10px] text-copper">Contact</p>
            <ul className="grid gap-1 text-[13.5px] text-mute">
              <li className="py-2">{contact.address}</li>
              <li className="py-2">{contact.email}</li>
              <li className="py-2">{contact.phone}</li>
            </ul>
            <ul className="mt-4 flex gap-2">
              {[
                { Icon: Globe, label: "Website" },
                { Icon: AtSign, label: "Email" },
                { Icon: MessageCircle, label: "Message us" },
              ].map(({ Icon, label }) => (
                <li key={label}>
                  <a
                    href="#contact"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center border border-line text-mute transition-colors hover:border-copper hover:text-copper"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="spec text-[10px]">© 2026 {brand.name}</p>
          <p className="spec text-[10px] text-faint">
            Design concept — part of Samuel&apos;s portfolio
          </p>
        </div>
      </div>
    </footer>
  );
}
