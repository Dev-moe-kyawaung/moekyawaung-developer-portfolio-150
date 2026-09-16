import { metrics } from "../data/portfolio";
import { Reveal } from "./ui";

export function ImpactStrip() {
  return (
    <div className="border-y border-line bg-navy-900/40">
      <div className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-mono text-[10px] tracking-[0.25em] text-slate uppercase">
            Impact · sample metrics
          </span>
          <span className="text-mono text-[10px] tracking-[0.25em] text-faint uppercase">
            representative of prior roles
          </span>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 60}>
              <div className="flex h-full flex-col bg-navy-950 px-4 py-5">
                <div className="text-display text-2xl font-bold text-signal sm:text-[1.75rem]">
                  {m.value}
                </div>
                <div className="mt-1.5 text-xs leading-snug text-mist">{m.label}</div>
                <div className="mt-auto pt-2 text-mono text-[10px] text-faint">{m.note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
