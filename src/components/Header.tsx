import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "../data/portfolio";
import { useActiveSection } from "../hooks/hooks";
import { cn } from "../utils/cn";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-line bg-navy-950/80 backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="flex h-8 w-8 items-center justify-center rounded border border-signal/60 bg-signal/10 text-mono text-sm font-bold text-signal">
            {profile.name.split(" ").map((n) => n[0]).join("")}
          </span>
          <span className="hidden text-mono text-sm text-mist sm:inline">{profile.name}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded px-3 py-1.5 text-mono text-[13px] transition-colors",
                  active === id ? "text-signal" : "text-slate hover:text-ink"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded border border-signal/50 bg-signal/10 px-3.5 py-1.5 text-mono text-[13px] text-signal transition hover:bg-signal/20 sm:inline-block"
          >
            Let's talk
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded border border-line-bright text-mist md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-navy-950/95 backdrop-blur md:hidden" aria-label="Mobile">
          <div className="flex flex-col px-5 py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3 text-mono text-sm text-mist last:border-0"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
