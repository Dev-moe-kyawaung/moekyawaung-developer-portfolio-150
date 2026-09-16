import { Star, ArrowUpRight } from "lucide-react";
import { openSource, writing } from "../data/portfolio";
import { Section, SectionHeading, Reveal } from "./ui";
import { GithubIcon } from "./icons";

export function Writing() {
  return (
    <Section id="writing">
      <SectionHeading
        eyebrow="Open Source & Writing"
        title="Building and teaching in the open"
        intro="Tools I've extracted from real production work, and writing that turns hard-won lessons into things other engineers can use."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Open source */}
        <div>
          <h3 className="text-mono text-xs tracking-widest text-slate uppercase">Open source</h3>
          <div className="mt-4 space-y-3">
            {openSource.map((repo, i) => (
              <Reveal key={repo.name} delay={i * 60}>
                <a
                  href={repo.href}
                  className="group flex items-start gap-4 rounded-lg border border-line-bright bg-navy-900/40 p-4 transition-colors hover:border-signal/40"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded border border-line bg-navy-800 text-mist">
                    <GithubIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-mono text-sm font-medium text-ink group-hover:text-signal">
                        {repo.name}
                      </span>
                      <span className="flex items-center gap-1 text-mono text-xs text-slate">
                        <Star className="h-3 w-3" /> {repo.stars}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-mist">{repo.desc}</p>
                    <span className="mt-2 inline-block text-mono text-[11px] text-cyan">{repo.lang}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Writing */}
        <div>
          <h3 className="text-mono text-xs tracking-widest text-slate uppercase">Writing & talks</h3>
          <div className="mt-4 divide-y divide-line rounded-lg border border-line-bright bg-navy-900/40">
            {writing.map((w, i) => (
              <Reveal key={w.title} delay={i * 60}>
                <a
                  href={w.href}
                  className="group flex items-start gap-3 p-4 transition-colors hover:bg-navy-800/40"
                >
                  <span className="mt-0.5 text-mono text-xs text-slate">{w.year}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-snug text-ink group-hover:text-signal">
                      {w.title}
                    </p>
                    <p className="mt-1 text-mono text-xs text-slate">{w.outlet}</p>
                  </div>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-slate transition group-hover:text-signal group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
