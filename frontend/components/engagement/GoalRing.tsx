"use client";

/**
 * GoalRing — a small SVG progress ring for the daily goal.
 * Pure presentation: pass a real fraction; it never rounds up to done.
 */

export default function GoalRing({
  value,
  max,
  size = 72,
  stroke = 7,
  label,
  sub,
  done,
}: {
  value: number;
  max: number;
  size?: number;
  stroke?: number;
  label?: React.ReactNode;
  sub?: React.ReactNode;
  done?: boolean;
}) {
  const safeMax = Math.max(1, max || 1);
  const safeValue = Math.max(0, value || 0);
  const fraction = Math.min(1, safeValue / safeMax);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = fraction * c;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={done ? "#6ee7b7" : "#fbbf24"}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          className="transition-[stroke-dasharray] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none">
        {label ?? (
          <>
            <span className="font-display text-sm font-bold text-white sm:text-base">
              {safeValue}
              <span className="text-[10px] font-semibold text-surface-600">/{safeMax}</span>
            </span>
            {sub ? <span className="mt-0.5 text-[9px] uppercase tracking-wider text-surface-600">{sub}</span> : null}
          </>
        )}
      </div>
    </div>
  );
}
