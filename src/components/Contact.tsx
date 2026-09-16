import { Mail, ArrowUpRight } from "lucide-react";
import { profile } from "../data/portfolio";
import { Section, Eyebrow } from "./ui";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Contact() {
  return (
    <Section id="contact" className="pb-16">
      <div className="relative overflow-hidden rounded-xl border border-line-bright bg-navy-900/50 p-8 sm:p-12 corner-ticks">
        <div className="absolute inset-0 bp-grid-fine opacity-30" aria-hidden />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(600px 300px at 80% 0%, rgba(255,122,47,0.12), transparent 60%)",
          }}
        />
        <div className="relative">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Have a hard reliability or scaling problem?
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-mist">
            {profile.status}. If you're wrestling with high-scale systems, platform strategy, or
            an org that needs its reliability culture leveled up — let's talk.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded bg-signal px-5 py-3 text-mono text-sm font-medium text-navy-950 transition hover:bg-signal-soft signal-glow"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center gap-2 rounded border border-line-bright px-5 py-3 text-mono text-sm text-mist transition hover:border-slate hover:text-ink"
            >
              Résumé
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2">
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

      <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-8 text-mono text-xs text-slate sm:flex-row">
        <span>
          © {new Date().getFullYear()} {profile.name}. Built with React Three Fiber & Tailwind.
        </span>
        <span className="text-faint">All metrics are labeled samples · designed as a blueprint.</span>
      </footer>
    </Section>
  );
}
