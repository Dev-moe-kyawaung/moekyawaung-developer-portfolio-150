import { ReactNode } from "react";
import { cn } from "../utils/cn";
import { useInView } from "../hooks/hooks";

/** Section wrapper with consistent spacing + scroll anchor. */
export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28", className)}
    >
      {children}
    </section>
  );
}

/** Small mono label with a signal tick — the blueprint "callout" style. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 text-mono text-xs tracking-[0.25em] text-signal uppercase", className)}>
      <span className="inline-block h-px w-6 bg-signal" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("max-w-2xl", className)}>
      <Eyebrow className={inView ? "fade-up" : "opacity-0"}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-4 text-display text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl md:text-[2.75rem]",
          inView ? "fade-up" : "opacity-0"
        )}
        style={{ animationDelay: "80ms" }}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn("mt-5 text-base leading-relaxed text-mist sm:text-lg", inView ? "fade-up" : "opacity-0")}
          style={{ animationDelay: "160ms" }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/** Reveal-on-scroll wrapper using CSS fade-up. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(inView ? "fade-up" : "opacity-0", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded border border-line-bright bg-navy-800/60 px-2 py-0.5 text-mono text-[11px] text-mist">
      {children}
    </span>
  );
}

/** Blueprint panel with corner ticks. */
export function Panel({
  children,
  className,
  ticks = true,
}: {
  children: ReactNode;
  className?: string;
  ticks?: boolean;
}) {
  return (
    <div className={cn("glass-panel rounded-lg", ticks && "corner-ticks", className)}>{children}</div>
  );
}
