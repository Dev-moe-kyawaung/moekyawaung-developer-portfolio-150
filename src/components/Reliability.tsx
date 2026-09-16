import { slos, uptimeTrend, deployFreq, latencyDist, incidents } from "../data/portfolio";
import { Section, SectionHeading, Reveal } from "./ui";
import { LineChart, BarChart, DistBars } from "./charts";
import { cn } from "../utils/cn";

function SloRow({ s }: { s: (typeof slos)[number] }) {
  const met = s.actual >= s.target;
  // scale within a tight window so 99.x differences are visible
  const floor = 99.0;
  const pct = Math.max(0, Math.min(100, ((s.actual - floor) / (100 - floor)) * 100));
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-3">
      <div className="flex items-center gap-2">
        <span className={cn("h-1.5 w-1.5 rounded-full", met ? "bg-cyan" : "bg-signal")} />
        <span className="text-sm text-ink">{s.name}</span>
      </div>
      <div className="text-mono text-xs text-slate">
        target {s.target}% · p99 {s.latencyP99}
      </div>
      <div className="col-span-2 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy-800">
          <div
            className={cn("h-full rounded-full", met ? "bg-cyan" : "bg-signal")}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className={cn("w-16 text-right text-mono text-sm", met ? "text-cyan" : "text-signal")}>
          {s.actual}%
        </span>
      </div>
    </div>
  );
}

export function Reliability() {
  return (
    <Section id="reliability">
      <SectionHeading
        eyebrow="Reliability Dashboard"
        title="Reliability, quantified"
        intro="How I think about production health — SLOs over vanity uptime, burn-rate over thresholds, and every incident turned into a durable fix. Sample data shown."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {/* SLO panel */}
        <Reveal className="lg:col-span-2">
          <div className="h-full rounded-lg border border-line-bright bg-navy-900/40 p-5 corner-ticks">
            <div className="flex items-center justify-between">
              <h3 className="text-mono text-xs tracking-widest text-slate uppercase">
                Service SLOs · trailing 30d
              </h3>
              <span className="text-mono text-[10px] text-faint">sample</span>
            </div>
            <div className="mt-2 divide-y divide-line">
              {slos.map((s) => (
                <SloRow key={s.name} s={s} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Uptime trend */}
        <Reveal delay={80}>
          <div className="flex h-full flex-col rounded-lg border border-line-bright bg-navy-900/40 p-5 corner-ticks">
            <h3 className="text-mono text-xs tracking-widest text-slate uppercase">
              Uptime · 12 months
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-display text-3xl font-bold text-cyan">99.98%</span>
              <span className="text-mono text-xs text-slate">avg</span>
            </div>
            <div className="mt-auto pt-4">
              <LineChart
                data={uptimeTrend}
                min={99.85}
                max={100}
                height={90}
                className="h-[90px] w-full"
                ariaLabel="Uptime trend over 12 months, averaging 99.98 percent"
              />
              <div className="mt-1 flex justify-between text-mono text-[10px] text-faint">
                <span>Jan</span>
                <span>Dec</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Deploy frequency */}
        <Reveal delay={40}>
          <div className="flex h-full flex-col rounded-lg border border-line-bright bg-navy-900/40 p-5 corner-ticks">
            <h3 className="text-mono text-xs tracking-widest text-slate uppercase">
              Deploys / week
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-display text-3xl font-bold text-signal">380</span>
              <span className="text-mono text-xs text-cyan">↑ from 12/wk</span>
            </div>
            <div className="mt-auto pt-4">
              <BarChart
                data={deployFreq}
                height={90}
                className="h-[90px] w-full"
                ariaLabel="Weekly deployment frequency trending up to 380 per week"
              />
              <div className="mt-1 flex justify-between text-mono text-[10px] text-faint">
                <span>12 wks ago</span>
                <span>now</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Latency distribution */}
        <Reveal delay={80}>
          <div className="h-full rounded-lg border border-line-bright bg-navy-900/40 p-5 corner-ticks">
            <h3 className="text-mono text-xs tracking-widest text-slate uppercase">
              Latency distribution · Payments API
            </h3>
            <div className="mt-4">
              <DistBars data={latencyDist} />
            </div>
          </div>
        </Reveal>

        {/* MTTR / DORA stat */}
        <Reveal delay={120}>
          <div className="grid h-full grid-rows-2 gap-4">
            <div className="rounded-lg border border-line-bright bg-navy-900/40 p-5">
              <div className="text-mono text-xs tracking-widest text-slate uppercase">MTTR</div>
              <div className="mt-1 text-display text-3xl font-bold text-cyan">11 min</div>
              <div className="mt-1 text-xs text-slate">median, tier-1 incidents</div>
            </div>
            <div className="rounded-lg border border-line-bright bg-navy-900/40 p-5">
              <div className="text-mono text-xs tracking-widest text-slate uppercase">
                Change fail rate
              </div>
              <div className="mt-1 text-display text-3xl font-bold text-signal">3.1%</div>
              <div className="mt-1 text-xs text-slate">elite DORA band</div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Incident learnings */}
      <Reveal delay={60}>
        <div className="mt-4 rounded-lg border border-line-bright bg-navy-900/40 p-5 sm:p-6 corner-ticks">
          <h3 className="text-mono text-xs tracking-widest text-slate uppercase">
            Incident learnings · blameless
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {incidents.map((inc) => (
              <div key={inc.title} className="rounded border border-line bg-navy-950/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-mono text-[11px] text-slate">{inc.date}</span>
                  <span className="rounded border border-signal/40 bg-signal/10 px-1.5 py-0.5 text-mono text-[10px] text-signal">
                    {inc.severity}
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-ink">{inc.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-mist">{inc.learning}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
