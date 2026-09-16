import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { caseStudies } from "../data/portfolio";
import { Section, SectionHeading, Reveal, Tag } from "./ui";
import { cn } from "../utils/cn";

export function FeaturedWork() {
  const [openId, setOpenId] = useState<string | null>(caseStudies[0].id);

  return (
    <Section id="systems">
      <SectionHeading
        eyebrow="Selected Systems"
        title="Three systems, three hard problems"
        intro="High-scale, reliability, and platform work — with the constraints, the trade-offs, and the numbers that came out the other side."
      />

      <div className="mt-12 space-y-4">
        {caseStudies.map((cs, i) => {
          const open = openId === cs.id;
          return (
            <Reveal key={cs.id} delay={i * 80}>
              <article
                className={cn(
                  "overflow-hidden rounded-lg border transition-colors",
                  open ? "border-signal/40 bg-navy-900/60" : "border-line-bright bg-navy-900/30"
                )}
              >
                <button
                  onClick={() => setOpenId(open ? null : cs.id)}
                  aria-expanded={open}
                  aria-controls={`panel-${cs.id}`}
                  className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
                >
                  <span className="mt-1 hidden text-mono text-sm text-signal sm:block">
                    0{i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-display text-xl font-semibold text-ink sm:text-2xl">
                        {cs.title}
                      </h3>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-mono text-xs text-slate">
                      <span className="text-cyan">{cs.domain}</span>
                      <span className="text-faint">·</span>
                      <span>{cs.timeframe}</span>
                      <span className="text-faint">·</span>
                      <span>{cs.role}</span>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">{cs.summary}</p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "mt-1 h-5 w-5 shrink-0 text-slate transition-transform",
                      open && "rotate-180 text-signal"
                    )}
                  />
                </button>

                {open && (
                  <div id={`panel-${cs.id}`} className="fade-up border-t border-line px-5 pb-6 pt-5 sm:px-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div>
                        <h4 className="text-mono text-[10px] tracking-widest text-signal uppercase">
                          Problem
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-mist">{cs.problem}</p>

                        <h4 className="mt-5 text-mono text-[10px] tracking-widest text-signal uppercase">
                          Approach
                        </h4>
                        <ul className="mt-2 space-y-2">
                          {cs.approach.map((a) => (
                            <li key={a} className="flex gap-2.5 text-sm leading-relaxed text-mist">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-mono text-[10px] tracking-widest text-signal uppercase">
                          Outcomes
                        </h4>
                        <div className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded border border-line bg-line">
                          {cs.outcomes.map((o) => (
                            <div key={o.label} className="bg-navy-950 px-4 py-3.5">
                              <div className="text-display text-lg font-bold text-signal">{o.value}</div>
                              <div className="mt-0.5 text-xs text-slate">{o.label}</div>
                            </div>
                          ))}
                        </div>

                        <h4 className="mt-5 text-mono text-[10px] tracking-widest text-signal uppercase">
                          Stack
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {cs.stack.map((s) => (
                            <Tag key={s}>{s}</Tag>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
