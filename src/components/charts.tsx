// Lightweight, dependency-free SVG charts tuned for the blueprint theme.
// Kept intentionally small — no charting lib needed for this scale of data.
import { useId } from "react";

/** Sparkline / area line chart for a series of numbers. */
export function LineChart({
  data,
  min,
  max,
  height = 120,
  className,
  ariaLabel,
}: {
  data: number[];
  min?: number;
  max?: number;
  height?: number;
  className?: string;
  ariaLabel?: string;
}) {
  const gid = useId();
  const w = 100;
  const lo = min ?? Math.min(...data);
  const hi = max ?? Math.max(...data);
  const range = hi - lo || 1;
  const step = w / (data.length - 1);

  const pts = data.map((d, i) => {
    const x = i * step;
    const y = height - ((d - lo) / range) * (height - 10) - 5;
    return [x, y] as const;
  });

  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
  const areaPath = `${linePath} L${w},${height} L0,${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id={`grad-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff7a2f" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ff7a2f" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#grad-${gid})`} />
      <path d={linePath} fill="none" stroke="#ff7a2f" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="1.4" fill="#ff9a5e" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

/** Vertical bar chart. */
export function BarChart({
  data,
  height = 120,
  className,
  ariaLabel,
}: {
  data: number[];
  height?: number;
  className?: string;
  ariaLabel?: string;
}) {
  const w = 100;
  const hi = Math.max(...data) || 1;
  const gap = 2.2;
  const barW = (w - gap * (data.length - 1)) / data.length;

  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      {data.map((d, i) => {
        const h = (d / hi) * (height - 6);
        const x = i * (barW + gap);
        const y = height - h;
        const isLast = i === data.length - 1;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={h}
            rx="0.8"
            fill={isLast ? "#ff7a2f" : "#294170"}
          />
        );
      })}
    </svg>
  );
}

/** Horizontal latency-distribution bars with labels. */
export function DistBars({
  data,
}: {
  data: { p: string; ms: number }[];
}) {
  const hi = Math.max(...data.map((d) => d.ms)) || 1;
  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.p} className="flex items-center gap-3">
          <span className="w-12 shrink-0 text-mono text-[11px] text-slate">{d.p}</span>
          <div className="h-4 flex-1 overflow-hidden rounded-sm bg-navy-800">
            <div
              className="h-full rounded-sm bg-gradient-to-r from-signal-deep to-signal"
              style={{ width: `${(d.ms / hi) * 100}%` }}
            />
          </div>
          <span className="w-14 shrink-0 text-right text-mono text-[11px] text-mist">{d.ms}ms</span>
        </div>
      ))}
    </div>
  );
}
