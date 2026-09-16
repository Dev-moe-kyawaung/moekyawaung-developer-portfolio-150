import { ArrowRight, MapPin } from "lucide-react";
import { profile } from "../data/portfolio";
import { ArchExplorer } from "./ArchExplorer";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* blueprint backdrop */}
      <div className="absolute inset-0 bp-grid opacity-[0.5]" aria-hidden />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(1200px 600px at 75% -10%, rgba(255,122,47,0.10), transparent 60%), radial-gradient(900px 500px at 0% 30%, rgba(79,209,230,0.06), transparent 55%)",
        }}
      />
      {/* fade edges of grid */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, transparent 60%, var(--color-navy-950) 100%), radial-gradient(120% 90% at 50% 0%, transparent 55%, var(--color-navy-950) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
        {/* status line */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-mono text-xs text-slate">
          <span className="flex items-center gap-1.5 text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            {profile.status}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {profile.location}
          </span>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* copy */}
          <div className="fade-up">
            <p className="text-mono text-sm tracking-[0.2em] text-signal uppercase">
              {profile.role}
            </p>
            <h1 className="mt-4 text-display text-4xl font-bold leading-[1.05] text-ink sm:text-5xl md:text-[3.5rem]">
              {profile.name}.
              <span className="mt-3 block bg-gradient-to-r from-ink via-mist to-slate bg-clip-text text-2xl font-medium text-transparent sm:text-3xl md:text-[2rem]">
                {profile.tagline}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
              {profile.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#systems"
                className="group inline-flex items-center gap-2 rounded bg-signal px-5 py-2.5 text-mono text-sm font-medium text-navy-950 transition hover:bg-signal-soft signal-glow"
              >
                View selected systems
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded border border-line-bright px-5 py-2.5 text-mono text-sm text-mist transition hover:border-slate hover:text-ink"
              >
                Contact
              </a>
              <div className="flex items-center gap-1.5">
                <a
                  href={profile.github}
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded border border-line-bright text-slate transition hover:text-ink hover:border-slate"
                >
                  <GithubIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={profile.linkedin}
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded border border-line-bright text-slate transition hover:text-ink hover:border-slate"
                >
                  <LinkedinIcon className="h-[18px] w-[18px]" />
                </a>
              </div>
            </div>
          </div>

          {/* architecture explorer */}
          <div className="fade-up" style={{ animationDelay: "150ms" }}>
            <ArchExplorer />
          </div>
        </div>
      </div>
    </section>
  );
}
