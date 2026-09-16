import { Suspense, lazy, useState } from "react";
import { archNodes, archLinks, type ArchNodeId } from "../data/portfolio";
import { useIsMobile, useReducedMotion } from "../hooks/hooks";
import { cn } from "../utils/cn";

const ArchScene = lazy(() => import("./three/ArchScene"));

const COLOR_CLASS: Record<string, string> = {
  signal: "text-signal border-signal/50",
  cyan: "text-cyan border-cyan/50",
  ink: "text-mist border-line-bright",
};
const DOT_CLASS: Record<string, string> = {
  signal: "bg-signal",
  cyan: "bg-cyan",
  ink: "bg-mist",
};

/** 2D isometric SVG fallback for mobile / reduced motion / no-WebGL. */
function StaticMap({
  selected,
  onSelect,
}: {
  selected: ArchNodeId | null;
  onSelect: (id: ArchNodeId) => void;
}) {
  // Project grid [col,row] into a simple isometric SVG coordinate
  const project = (col: number, row: number) => {
    const x = 90 + col * 78 + row * 20;
    const y = 70 + row * 92 - col * 6;
    return { x, y };
  };
  const byId = Object.fromEntries(archNodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 480 320" className="h-full w-full" role="img" aria-label="Cloud architecture diagram">
      {/* links */}
      {archLinks.map(([a, b], i) => {
        const na = byId[a];
        const nb = byId[b];
        const pa = project(na.pos[0], na.pos[1]);
        const pb = project(nb.pos[0], nb.pos[1]);
        const active = selected === a || selected === b;
        return (
          <line
            key={i}
            x1={pa.x}
            y1={pa.y}
            x2={pb.x}
            y2={pb.y}
            stroke={active ? "#ff7a2f" : "#294170"}
            strokeWidth={active ? 2 : 1}
            className={active ? "dash-flow" : ""}
          />
        );
      })}
      {/* nodes */}
      {archNodes.map((n) => {
        const p = project(n.pos[0], n.pos[1]);
        const isSel = selected === n.id;
        const stroke = n.color === "signal" ? "#ff7a2f" : n.color === "cyan" ? "#4fd1e6" : "#9fb2d6";
        return (
          <g
            key={n.id}
            transform={`translate(${p.x},${p.y})`}
            onClick={() => onSelect(n.id)}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={n.label}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(n.id);
              }
            }}
          >
            <rect
              x={-34}
              y={-20}
              width={68}
              height={40}
              rx={6}
              fill={isSel ? "#16233f" : "#0d1830"}
              stroke={stroke}
              strokeWidth={isSel ? 2 : 1.2}
              opacity={isSel ? 1 : 0.85}
            />
            <circle cx={-22} cy={-8} r={3} fill={stroke} />
            <text x={0} y={-2} textAnchor="middle" fill="#eef2fb" fontSize={9} fontFamily="monospace">
              {n.label.split(" ")[0]}
            </text>
            <text x={0} y={10} textAnchor="middle" fill="#7789ab" fontSize={7} fontFamily="monospace">
              {n.label.split(" ").slice(1).join(" ") || "node"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ArchExplorer() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<ArchNodeId | null>("gateway");

  const use3D = !isMobile; // Mobile always gets the static, fast SVG map
  const active = archNodes.find((n) => n.id === selected) ?? null;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
      {/* Visual */}
      <div className="relative min-h-[340px] overflow-hidden rounded-lg border border-line-bright bg-navy-900/50 sm:min-h-[420px] lg:min-h-[480px] corner-ticks">
        <div className="bp-grid-fine absolute inset-0 opacity-40" />
        {/* HUD label */}
        <div className="pointer-events-none absolute left-3 top-3 z-10 text-mono text-[10px] tracking-widest text-slate">
          {use3D ? (reduced ? "STATIC · REDUCED MOTION" : "INTERACTIVE · DRAG-FREE ORBIT") : "MOBILE MAP"}
        </div>
        <div className="pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-1.5 text-mono text-[10px] tracking-widest text-slate">
          <span className="relative flex h-1.5 w-1.5">
            {!reduced && <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-signal" />}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
          LIVE TOPOLOGY
        </div>

        <div className="absolute inset-0">
          {use3D ? (
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center text-mono text-xs text-slate">
                  loading scene…
                </div>
              }
            >
              <ArchScene selected={selected} onSelect={setSelected} reduced={reduced} />
            </Suspense>
          ) : (
            <StaticMap selected={selected} onSelect={setSelected} />
          )}
        </div>

        <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 text-center text-mono text-[10px] text-slate">
          Tap a component to inspect
        </p>
      </div>

      {/* Notes panel + selector */}
      <div className="flex flex-col gap-4">
        {/* chip selector — keyboard accessible */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Architecture components">
          {archNodes.map((n) => (
            <button
              key={n.id}
              role="tab"
              aria-selected={selected === n.id}
              onClick={() => setSelected(n.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-mono text-[11px] transition",
                selected === n.id
                  ? cn("bg-navy-800", COLOR_CLASS[n.color])
                  : "border-line-bright text-slate hover:text-mist hover:border-slate"
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", DOT_CLASS[n.color])} />
              {n.label}
            </button>
          ))}
        </div>

        {/* engineering note */}
        <div className="glass-panel flex-1 rounded-lg p-5 corner-ticks" aria-live="polite">
          {active ? (
            <div key={active.id} className="fade-up">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-mono text-[10px] tracking-widest text-slate uppercase">
                    Component · {active.id}
                  </div>
                  <h3 className="mt-1 text-display text-xl font-semibold text-ink">{active.label}</h3>
                </div>
                <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", DOT_CLASS[active.color])} />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-mist">{active.note}</p>

              <div className="mt-4 rounded border border-line bg-navy-950/50 px-3 py-2">
                <div className="text-mono text-[10px] tracking-widest text-signal uppercase">At scale</div>
                <div className="mt-0.5 text-mono text-sm text-ink">{active.metric}</div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {active.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-line-bright bg-navy-800/60 px-2 py-0.5 text-mono text-[11px] text-mist"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-sm text-slate">
              Select a component to read the engineering notes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
