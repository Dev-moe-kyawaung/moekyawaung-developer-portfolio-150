import { adrs, type ADR } from "../data/portfolio";
import { Section, SectionHeading, Reveal } from "./ui";
import { cn } from "../utils/cn";

const STATUS_STYLE: Record<ADR["status"], string> = {
  Adopted: "text-cyan border-cyan/40 bg-cyan/10",
  Trial: "text-signal border-signal/40 bg-signal/10",
  Superseded: "text-slate border-line-bright bg-navy-800/60",
};

export function Decisions() {
  return (
    <Section id="decisions">
      <SectionHeading
        eyebrow="Architecture Decisions"
        title="The trade-offs, written down"
        intro="Good architecture is a chain of honest trade-offs. These ADR-style cards capture the context, the call, and what I gave up to make it."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {adrs.map((adr, i) => (
          <Reveal key={adr.id} delay={i * 70}>
            <div className="group h-full rounded-lg border border-line-bright bg-navy-900/40 p-5 transition-colors hover:border-signal/40 corner-ticks">
              <div className="flex items-center justify-between gap-3">
                <span className="text-mono text-xs text-slate">{adr.number}</span>
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-mono text-[10px] tracking-wide uppercase",
                    STATUS_STYLE[adr.status]
                  )}
                >
                  {adr.status}
                </span>
              </div>

              <h3 className="mt-3 text-display text-lg font-semibold leading-snug text-ink">
                {adr.title}
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <span className="text-mono text-[10px] tracking-widest text-slate uppercase">
                    Context
                  </span>
                  <p className="mt-1 leading-relaxed text-mist">{adr.context}</p>
                </div>
                <div>
                  <span className="text-mono text-[10px] tracking-widest text-cyan uppercase">
                    Decision
                  </span>
                  <p className="mt-1 leading-relaxed text-mist">{adr.decision}</p>
                </div>
                <div className="rounded border border-line bg-navy-950/60 p-3">
                  <span className="text-mono text-[10px] tracking-widest text-signal uppercase">
                    Trade-off
                  </span>
                  <p className="mt-1 leading-relaxed text-mist">{adr.tradeoff}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
