import { Users, Map, Workflow, type LucideIcon } from "lucide-react";
import { leadership } from "../data/portfolio";
import { Section, SectionHeading, Reveal } from "./ui";

const ICONS: Record<string, LucideIcon> = {
  users: Users,
  map: Map,
  workflow: Workflow,
};

export function Leadership() {
  return (
    <Section id="leadership">
      <SectionHeading
        eyebrow="Technical Leadership"
        title="Multiplying teams, not just shipping code"
        intro="Senior impact shows up in other people's work. I invest in mentoring, clear roadmaps, and tooling that makes the reliable path the default one."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {leadership.map((item, i) => {
          const Icon = ICONS[item.icon] ?? Users;
          return (
            <Reveal key={item.title} delay={i * 80}>
              <div className="h-full rounded-lg border border-line-bright bg-navy-900/40 p-6 transition-colors hover:border-signal/30 corner-ticks">
                <div className="flex h-11 w-11 items-center justify-center rounded border border-signal/40 bg-signal/10 text-signal">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-display text-lg font-semibold text-ink">{item.title}</h3>
                <ul className="mt-4 space-y-3">
                  {item.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-mist">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
